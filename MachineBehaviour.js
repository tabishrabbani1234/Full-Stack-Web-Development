<script>
var eventType = "Initialized";
var machineState;
var eventTimeStamp;

//Created machine class. It can be used to scale the code to multiple machines with few changes.
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

//Created event handler function to update eventType on key press from user
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
//Update machine state based on backend response
function responseHandlerFunction(var timeStamp, var state, var x_pos, var y_pos){
     if(timeStamp !== machine.machineStateTimeStamp){
         removeGridElementStyle();
         machine.updateMachine(timeStamp,x_pos,y_pos);
         addGridElementStyle();
         machineState = state;
         setMachineRequestcall(machine.timeStamp);
     }
}

//When backend returns the next time, it should be called. Setting up timeout to call backend again
function setMachineRequestcall(var time){
   var currentTime = new Date();
   var timeInMilliSeconds = time - currentTime.getMilliseconds();
   window.setTimeout(requestHandlerFunction, timeInMilliSeconds);
}

//Add css property to current machine position
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

//When machine current position changes, update the last grid css property
function removeGridElementStyle() {
    var count = (machine.row_Index * 60) + machine.col_Index ;
    var cell = ("div").concat(count.toString());
    var div = document.getElementById(cell);
    div.style.background = "white";
    div.style.border-style = "none";
}

//Dynamically create grid of 20*60 and initialize the machine.
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

//Send request with event type and event timestamp
function requestHandlerFunction(){
      const xhr = new XMLHttpRequest();
      var url = ("https://localhost:8080/container/").concat(toString((machine.rowIndex - 1)*60 + machine.colIndex);
      xhr.open("POST", url, true);
      xhr.setRequestHeader('timeStamp', machine.timeStamp);
      xhr.setRequestHeader('eventType', eventType);
      xhr.send();
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
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
