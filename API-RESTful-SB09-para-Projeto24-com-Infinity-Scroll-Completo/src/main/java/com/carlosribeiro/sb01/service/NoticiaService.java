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
import java.util.List;




@Service
public class NoticiaService {

    @Autowired
    private NoticiaRepository noticiaRepository;

    public List<Noticia> recuperarNoticias() {
        return noticiaRepository.recuperarNoticias();
    }

    public Noticia cadastrarNoticia(Noticia noticia) {
        if (noticia.getId() == null) {
            return noticiaRepository.save(noticia);
        } else {
            throw new EntidadeDestacadaException("Tentando cadastrar uma notícia destacada");
        }
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

    public Noticia recuperarNoticiaPorId(Long id) {
        return noticiaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Notícia número " + id + " não encontrada"));
    }

    public Page<Noticia> recuperarNoticiasPaginadas(String titulo, Pageable pageable) {
        return noticiaRepository.recuperarNoticiasPaginadas(titulo, pageable);
    }
}