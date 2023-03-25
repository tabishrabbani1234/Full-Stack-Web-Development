package com.morphleLabs.machine.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.morphleLabs.machine.domain.Machine;

@Controller
public class MachineController {
    Machine machine;
    public static boolean initialized = false;
    @RequestMapping("/")
    public String helloMessage(HttpServletRequest request, HttpServletResponse response) {
        long timeStamp = request.getHeader("timeStamp");
        String event = request.getHeader("event");
        if(!initialized){
            machine = new Machine();
            initialized = true;
        }
        machine.updateEventList(event,timeStamp);
        return machine.responseBuilder(response);
    }
}
