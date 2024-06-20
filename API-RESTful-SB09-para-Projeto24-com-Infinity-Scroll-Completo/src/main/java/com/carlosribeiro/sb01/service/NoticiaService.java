package com.carlosribeiro.sb01.service;

import com.carlosribeiro.sb01.exception.EntidadeDestacadaException;
import com.carlosribeiro.sb01.exception.EntidadeNaoEncontradaException;
import com.carlosribeiro.sb01.exception.EntidadeTransienteException;
import com.carlosribeiro.sb01.model.Noticia;
import com.carlosribeiro.sb01.repository.NoticiaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class NoticiaService {

    @Autowired
    private NoticiaRepository noticiaRepository;
    private Long ultimaNoticiaId = null;
    private LocalDateTime ultimaNoticiaTimestamp = null;
    private String tituloUltimaNoticia = null;
    private String ultimaNoticiaAlteracao = null;

    public List<Noticia> recuperarNoticias() {
        return noticiaRepository.recuperarNoticias();
    }

    public Noticia cadastrarNoticia(Noticia noticia) {
        if (noticia.getId() != null) {
            throw new EntidadeDestacadaException("Tentando cadastrar uma notícia destacada");
        }

        Noticia novaNoticia = noticiaRepository.save(noticia);
        tituloUltimaNoticia = novaNoticia.getTitulo();
        ultimaNoticiaId = novaNoticia.getId();
        ultimaNoticiaTimestamp = LocalDateTime.now();
        ultimaNoticiaAlteracao = "Cadastrada";

        return novaNoticia;
    }

    @Transactional
    public Noticia alterarNoticia(Noticia noticia) {
        if (noticia.getId() != null) {
            noticiaRepository.findById(noticia.getId())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Notícia não encontrada."));
            tituloUltimaNoticia = noticia.getTitulo();
            ultimaNoticiaId = noticia.getId();
            ultimaNoticiaTimestamp = LocalDateTime.now();
            ultimaNoticiaAlteracao = "Alterada";
            return noticiaRepository.save(noticia);
        } else {
            throw new EntidadeTransienteException("Tentando alterar uma notícia transiente.");
        }
    }

    public void removerNoticia(Long id) {
        tituloUltimaNoticia = this.recuperarNoticiaPorId(id).getTitulo();
        noticiaRepository.deleteById(id);
        ultimaNoticiaId = id;
        ultimaNoticiaTimestamp = LocalDateTime.now();
        ultimaNoticiaAlteracao = "Removida";
    }

    @GetMapping
    public Noticia recuperarNoticiaPorId(Long id) {
        return noticiaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Notícia número " + id + " não encontrada"));
    }

    private Boolean houveNovaNoticia(LocalDateTime timestamp) {
        if(this.ultimaNoticiaTimestamp == null || timestamp == null) {
            System.out.println("Timestamps nulos");
            return false;
        }
            if(timestamp.isBefore(this.ultimaNoticiaTimestamp)) {
            return true;
        }
        return false;
    }

    public Map<String, Object> getUltimaNoticiaManipulada(LocalDateTime timestamp) {
        Map<String, Object> resposta = new HashMap<>();
        if(!this.houveNovaNoticia(timestamp)) {
            return resposta;
        }
        resposta.put("id", ultimaNoticiaId);
        resposta.put("titulo", tituloUltimaNoticia);
        resposta.put("alteracao", ultimaNoticiaAlteracao);
        resposta.put("timestamp", ultimaNoticiaTimestamp);
        return resposta;
    }
}