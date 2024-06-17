package com.carlosribeiro.sb01.util;

import com.carlosribeiro.sb01.model.Noticia;

public class NoticiaDTO {
    private Noticia noticia;
    private String status;

    public NoticiaDTO(Noticia noticia, String status) {
        this.noticia = noticia;
        this.status = status;
    }

    public Noticia getNoticia() {
        return noticia;
    }

    public String getStatus() {
        return status;
    }
}