package com.carlosribeiro.sb01.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://192.168.0.252:5173")
@RestController
@RequestMapping("/alert")
public class AlertController {

    @Autowired
    private SimpMessagingTemplate template;

    private List<String> alertMessages = new ArrayList<>();

    @GetMapping
    public String sendAlert(@RequestParam String message) {
        alertMessages.add(message);
        template.convertAndSend("/topic/alerts", message);
        return "Alert sent: " + message;
    }

    @GetMapping("/list")
    public List<String> getAlerts() {
        return alertMessages;
    }
}