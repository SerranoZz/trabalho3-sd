package com.carlosribeiro.sb01.service;

import com.carlosribeiro.sb01.model.Noticia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificacaoService {

    private final NoticiaService noticiaService;

    @Autowired
    public NotificacaoService(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    public Noticia getUltimaNotificacao(String ultimoIdVisualizado) {
        Long ultimoId = null;

        if (ultimoIdVisualizado != null) {
            try {
                ultimoId = Long.parseLong(ultimoIdVisualizado);
            } catch (NumberFormatException e) {
                e.printStackTrace();
                return null;
            }
        }

        if (ultimoId == null) {
            return null;
        }

        Long proximoId = ultimoId + 1;

        return noticiaService.recuperarNoticiaPorId(proximoId);
    }

}
