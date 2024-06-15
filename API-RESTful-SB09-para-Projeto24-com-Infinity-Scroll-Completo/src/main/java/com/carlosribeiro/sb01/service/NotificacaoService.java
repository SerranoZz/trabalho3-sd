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
        List<Noticia> noticias = noticiaService.recuperarNoticias();

        if (noticias.isEmpty()) {
            return null;
        }

        Long ultimoId = ultimoIdVisualizado != null ? Long.parseLong(ultimoIdVisualizado) : null;

        for (Noticia noticia : noticias) {
            if (ultimoId == null || noticia.getId() > ultimoId) {
                return noticia;
            }
        }

        return null;
    }

}
