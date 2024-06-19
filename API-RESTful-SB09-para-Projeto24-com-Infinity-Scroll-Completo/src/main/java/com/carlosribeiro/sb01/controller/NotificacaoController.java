package com.carlosribeiro.sb01.controller;

import com.carlosribeiro.sb01.model.Noticia;
import com.carlosribeiro.sb01.service.NotificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carlosribeiro.sb01.util.ConstantesServidor;

import com.carlosribeiro.sb01.model.Noticia;
import com.carlosribeiro.sb01.service.NotificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carlosribeiro.sb01.util.ConstantesServidor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = ConstantesServidor.URL)
@RestController
@RequestMapping("/notificacoes")
public class NotificacaoController {

    private final NotificacaoService notificacaoService;

    @Autowired
    public NotificacaoController(NotificacaoService notificacaoService) {
        this.notificacaoService = notificacaoService;
    }

    @GetMapping("/ultimas")
    public Map<String, Object> getUltimasNotificacoes(@RequestParam(required = false) String ultimoTimestampVisualizado) {
        LocalDateTime timestamp = null;
        if (ultimoTimestampVisualizado != null && !ultimoTimestampVisualizado.isEmpty()) {
            try {
                timestamp = LocalDateTime.parse(ultimoTimestampVisualizado);
            } catch (DateTimeParseException e) {
                e.printStackTrace();
            }
        }
        if(timestamp == null) LocalDateTime.now();
        return notificacaoService.getUltimasNotificacoes(timestamp);
    }
}
