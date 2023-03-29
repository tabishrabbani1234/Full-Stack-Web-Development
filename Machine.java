package com.morphleLabs.machine.domain;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Entity
public class Machine {
    public int row_pos;
    public int col_pos;
    public static List<String> eventList = new ArrayList<String>();
    public static long eventTime = 0;
    public static String state = "Idle";
    public Machine(){
        this.row_pos = MachineConstants.midRowIndex;
        this.col_pos = MachineConstants.midColIndex;
        state = MachineConstants.focus;
    }

    public final void updateEventList(String event, long timeStamp){
        if(timeStamp < eventTime){
            eventList.add(event);
        } else{
            this.updateMachineState(timeStamp);
            this.updateMachinePosition();
            this.updateTimeStamp(timeStamp);
            eventList.clear();
        }
    }
    public final void updateMachinePosition(){
        for(int i=0;i<eventList.size();i++){
            if(eventList.get(i).equals(MachineConstants.leftArrow)){
                this.col_pos -= 1;
            } else if(eventList.get(i).equals(MachineConstants.rightArrow)){
                this.col_pos += 1;
            } else if(eventList.get(i).equals(MachineConstants.upArrow)){
                this.row_pos -= 1;
            } else if(eventList.get(i).equals(MachineConstants.downArrow)){
                this.row_pos += 1;
            }
        }
    }
    public final void updateTimeStamp(long timeStamp){
        if(state.equals(MachineConstants.focus)){
            eventTime = timeStamp + 3000;
        } else if(state.equals(MachineConstants.capture)){
            eventTime = timeStamp + 2000;
        }
    }
    public final void updateMachineState(long timeStamp){
        if(eventList.size() == 0){
            if(timeStamp == eventTime && state.equals(MachineConstants.focus)){
                state = MachineConstants.capture;
            } else if(state.equals(MachineConstants.capture)){
                state = MachineConstants.idle;
            } else {
                state = MachineConstants.focus;
            }
        } else {
            state = MachineConstants.focus;
        }
    }
    public final HttpServletResponse responseBuilder(HttpServletResponse response) {
       response.setHeader("machineState" , state);
       response.setHeader("eventTime" , eventTime);
       response.setHeader("rowIndex" , this.row_pos);
       response.setHeader("colIndex" , this.col_pos);
       return response;
    }
}
