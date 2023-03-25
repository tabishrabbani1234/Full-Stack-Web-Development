<script>
var eventType = "Initialized";
var machineState;
var eventTimeStamp;
class Machine {
   var timeStamp;
   var row_Index;
   var col_Index;
   var machineStateTimeStamp;
   Machine(){
      timeStamp = 0;
      row_Index = 10;
      col_Index = 30;
   }
   updateMachine(time, row, col){
      this.timeStamp = time;
      this.row_Index = row;
      this.col_Index = col;
   }
}
Machine machine;
function createEventHandlerContainer(event){
     if (event.defaultPrevented) {
       return ;
     }
     eventTimeStamp = event.timeStamp;
     switch (event.key) {
       case "ArrowDown":
         eventType = "Move Down";
         break;
       case "ArrowUp":
         eventType = "Move Up";
         break;
       case "ArrowLeft":
         eventType = "Move Left";
         break;
       case "ArrowRight":
         eventType = "Move Right";
         break;
       default:
         alert("Wrong button entered");
         return;
     }
     event.preventDefault();
     removeGridElementStyle();
     addGridElementStyle();
     requestHandlerFunction();
}

function responseHandlerFunction(var timeStamp, var state, var x_pos, var y_pos){
     if(timeStamp !== machine.machineStateTimeStamp){
         removeGridElementStyle();
         machine.updateMachine(timeStamp,x_pos,y_pos);
         addGridElementStyle();
         machineState = state;
         setMachineRequestcall(machine.timeStamp);
     }
}

function setMachineRequestcall(var time){
   var currentTime = new Date();
   var timeInMilliSeconds = time - currentTime.getMilliseconds();
   window.setTimeout(requestHandlerFunction, timeInMilliSeconds);
}

function addGridElementStyle() {
    var count = (machine.row_Index * 60) + machine.col_Index ;
    var cell = ("div").concat(count.toString());
    var div = document.getElementById(cell);
    div.focus();
    div.style.background = "green";
    if(machineState == "Focusing"){
       div.style.border-style = "dashed";
    } else if(machineState == "Capturing"){
       div.style.border-style = "solid";
    } else {
       div.style.border-style = "none";
    }
}

function removeGridElementStyle() {
    var count = (machine.row_Index * 60) + machine.col_Index ;
    var cell = ("div").concat(count.toString());
    var div = document.getElementById(cell);
    div.style.background = "white";
    div.style.border-style = "none";
}

function createGrid(){
   for(var i = 0; i < 20; i++) {
      var row = document.createElement("div");
       for(var j = 0; j< 60; j++) {
           count = i*60 + j + 1;
           var cell = ("div").concat(count.toString());
           var div = document.createElement(cell);
           div.setAttribute("type", "text");
           div.setAttribute("method", "post");
           div.style.width = "15px";
           div.style.height = "25px";
           div.style.background = "white";
           div.addEventListener("keydown", createEventHandlerContainer, true);
           div.style.display = "inline-block";
           row.appendChild(div);
       }
       document.getElementById("container").appendChild(row);
     }
     var elem = document.getElementById('button');
     elem.parentNode.removeChild(elem);
     elem = document.getElementById('Machine Header');
     elem.parentNode.removeChild(elem);
     machine = new Machine();
     addGridElementStyle();
     requestHandlerFunction()
}

function requestHandlerFunction(){
      const xhr = new XMLHttpRequest();
      var url = ("https://localhost:8080/container/").concat(toString((machine.rowIndex - 1)*60 + machine.colIndex);
      xhr.open("POST", url, true);
      xhr.setRequestHeader('state',machine.state);
      xhr.setRequestHeader('timeStamp', machine.timeStamp);
      xhr.setRequestHeader('eventType', eventType);
      xhr.send();
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const data = xhr.response;
          const timeStamp = xhr.getResponseHeader("eventTime");
          const state = xhr.getResponseHeader("machineState");
          const x_pos = xhr.getResponseHeader("rowIndex");
          const y_pos = xhr.getResponseHeader("colIndex");
          responseHandlerFunction(timeStamp, state, x_pos, y_pos);
        } else {
          console.log(`Error: ${xhr.status}`);
        }
      };
}

</script>
