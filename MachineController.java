package com.morphleLabs.machine.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.morphleLabs.machine.domain.Machine;

@Controller
public class MachineController {
    Machine machine;
    public static boolean initialized = false;
    @RequestMapping("/")
    @ResponseBody
    public HttpServletResponse helloMessage(HttpServletRequest request, HttpServletResponse response) {
        long timeStamp = request.getHeader("timeStamp");
        String event = request.getHeader("eventType");
        if(!initialized){
            machine = new Machine();
            initialized = true;
        }
        machine.updateEventList(event,timeStamp);
        response.setStatus(200);
        return "Body";
    }
}
