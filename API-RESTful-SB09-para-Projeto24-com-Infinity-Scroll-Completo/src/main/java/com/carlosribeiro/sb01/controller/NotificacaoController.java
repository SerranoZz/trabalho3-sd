package com.carlosribeiro.sb01.controller;

import com.carlosribeiro.sb01.service.NotificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.carlosribeiro.sb01.util.ConstantesServidor;

import java.time.LocalDateTime;
import java.util.Map;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = ConstantesServidor.URL)
@RestController
@RequestMapping("/notificacoes")
public class NotificacaoController {

    private final NotificacaoService notificacaoService;

    @Autowired
    public NotificacaoController(NotificacaoService notificacaoService) {
        this.notificacaoService = notificacaoService;
    }

    @GetMapping("/ultima")
    public ResponseEntity<?> getUltimaNotificacao(
            @RequestParam(required = false) String ultimoTimestampVisualizado
    ) {
        LocalDateTime timestamp = ultimoTimestampVisualizado != null && !ultimoTimestampVisualizado.isEmpty()
                ? LocalDateTime.parse(ultimoTimestampVisualizado)
                : LocalDateTime.now();
        Map<String, Object> notificacao = notificacaoService.getUltimaNotificacao(timestamp);

        if (notificacao == null || notificacao.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        EntityModel<Map<String, Object>> resource = EntityModel.of(notificacao,
                linkTo(methodOn(NotificacaoController.class).getUltimaNotificacao(ultimoTimestampVisualizado)).withSelfRel()
        );

        return ResponseEntity.ok(resource);
    }
}

