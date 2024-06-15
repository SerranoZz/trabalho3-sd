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

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class NoticiaService {

    @Autowired
    private NoticiaRepository noticiaRepository;

    public List<Noticia> recuperarNoticias() {
        return noticiaRepository.recuperarNoticias();
    }

//    public Noticia cadastrarNoticia(Noticia noticia) {
//        if (noticia.getId() == null) {
//            return noticiaRepository.save(noticia);
//        } else {
//            throw new EntidadeDestacadaException("Tentando cadastrar uma notícia destacada");
//        }
//    }

    public Noticia cadastrarNoticia(Noticia noticia) {
        if (noticia.getId() != null) {
            throw new EntidadeDestacadaException("Tentando cadastrar uma notícia destacada");
        }

        Noticia novaNoticia = noticiaRepository.save(noticia);

        return novaNoticia;
    }

    @Transactional
    public Noticia alterarNoticia(Noticia noticia) {
        if (noticia.getId() != null) {
            noticiaRepository.findById(noticia.getId())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Notícia não encontrada."));
            return noticiaRepository.save(noticia);
        } else {
            throw new EntidadeTransienteException("Tentando alterar uma notícia transiente.");
        }
    }

    public void removerNoticia(Long id) {
        noticiaRepository.deleteById(id);
    }

    @GetMapping
    public Noticia recuperarNoticiaPorId(Long id) {
        return noticiaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Notícia número " + id + " não encontrada"));
    }

}