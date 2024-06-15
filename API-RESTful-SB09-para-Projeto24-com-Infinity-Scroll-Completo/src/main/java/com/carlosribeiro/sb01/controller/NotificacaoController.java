package com.carlosribeiro.sb01.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import com.carlosribeiro.sb01.util.ConstantesServidor;

@CrossOrigin(ConstantesServidor.URL)
@RestController
@RequestMapping("/alert")
public class NotificacaoController {
    private List<String> alertMessages = new ArrayList<>();

    @GetMapping
    public String enviarNotificacao(@RequestParam String message) {
        alertMessages.add(message);
        return "Alert sent: " + message;
    }

    @GetMapping("/list")
    public List<String> getNotificacoes() {
        return alertMessages;
    }
}