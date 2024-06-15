package com.carlosribeiro.sb01.controller;

import com.carlosribeiro.sb01.model.Noticia;
import com.carlosribeiro.sb01.service.NotificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carlosribeiro.sb01.util.ConstantesServidor;

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
    public Noticia getUltimaNotificacao(@RequestParam(required = false) String ultimoIdVisualizado) {
        return notificacaoService.getUltimaNotificacao(ultimoIdVisualizado);
    }
}