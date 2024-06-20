package com.carlosribeiro.sb01.service;

import com.carlosribeiro.sb01.model.Noticia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class NotificacaoService {

    private final NoticiaService noticiaService;

    @Autowired
    public NotificacaoService(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    public Map<String, Object> getUltimasNotificacoes(LocalDateTime ultimoTimestampVisualizado) {
        return noticiaService.getUltimaNoticiaManipulada(ultimoTimestampVisualizado);
    }
}