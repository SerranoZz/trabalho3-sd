package com.carlosribeiro.sb01.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import com.carlosribeiro.sb01.util.ServerConstants;

@CrossOrigin(ServerConstants.URL)
@RestController
@RequestMapping("/alert")
public class AlertController {
    private List<String> alertMessages = new ArrayList<>();

    @GetMapping
    public String sendAlert(@RequestParam String message) {
        alertMessages.add(message);
        return "Alert sent: " + message;
    }

    @GetMapping("/list")
    public List<String> getAlerts() {
        return alertMessages;
    }
}