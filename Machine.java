package com.morphleLabs.machine.domain;

import java.util.ArrayList;
import java.util.List;
import com.morphleLabs.machine.domain.MachineConstants as machineConstants;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Entity
public class Machine {
    int row_pos;
    int col_pos;
    public static List<String> eventList = new ArrayList<String>();;
    public static long eventTime = 0;
    public static String state = "idle";
    Machine(){
        this.row_pos = machineConstants.midRowIndex;
        this.col_pos = machineConstants.midColIndex;
        state = machineConstants.focus;
    }

    public static void updateEventList(String event, long timeStamp){
        if(timeStamp < eventTime){
            eventList.add(event);
        } else{
            this.updateMachineState();
            this.updateMachinePosition();
            this.updateTimeStamp(timeStamp);
            eventList.clear();
        }
    }
    public final updateMachinePosition(){
        for(int i=0;i<eventList.size();i++){
            if(eventList[i] == machineConstants.leftArrow){
                this.col_pos -= 1;
            } else if(eventList[i] == machineConstants.rightArrow){
                this.col_pos += 1;
            } else if(eventList[i] == machineConstants.upArrow){
                this.row_pos -= 1;
            } else if(eventList[i] == machineConstants.upArrow){
                this.row_pos += 1;
            }
        }
    }
    public static void updateTimeStamp(long timeStamp){
        if(state == machineConstants.focus){
            eventTime = timeStamp + 3000;
        } else if(state == machineConstants.capture){
            eventTime = timeStamp + 2000;
        }
    }
    public static void updateMachineState(long timeStamp){
        if(eventList.size() == 0){
            if(timeStamp == this.eventTime && state = machineConstants.focus){
                state = machineConstant.capture;
            } else if(state == machineConstants.capture){
                state = machineConstants.idle;
            } else {
                state = machineConstants.focus;
            }
        }
    }
    public final HttpServletResponse responseBuilder() {
       response.setHeader("machineState" , state);
       response.setHeader("eventTime" , eventTime);
       response.setHeader("rowIndex" , this.row_pos);
       response.setHeader("colIndex" , this.col_pos);
       return response;
    }
}
