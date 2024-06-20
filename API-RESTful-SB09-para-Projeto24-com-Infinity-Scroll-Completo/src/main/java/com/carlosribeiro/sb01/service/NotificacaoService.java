package com.carlosribeiro.sb01.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;


@Service
public class NotificacaoService {

    private final NoticiaService noticiaService;

    @Autowired
    public NotificacaoService(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    public Map<String, Object> getUltimaNotificacao(LocalDateTime ultimoTimestampVisualizado) {
        return noticiaService.getUltimaNoticiaManipulada(ultimoTimestampVisualizado);
    }
}