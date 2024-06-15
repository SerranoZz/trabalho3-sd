package com.carlosribeiro.sb01.controller;

import com.carlosribeiro.sb01.model.Noticia;
import com.carlosribeiro.sb01.model.Produto;
import com.carlosribeiro.sb01.service.NoticiaService;
import com.carlosribeiro.sb01.util.ServerUtils;

import org.apache.tomcat.util.log.SystemLogHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.net.UnknownHostException;


import java.util.List;
import com.carlosribeiro.sb01.util.ServerConstants;

@CrossOrigin(ServerConstants.URL)
@RestController
@RequestMapping("noticias")
public class NoticiaController {
    // Add fields and methods here
    // Example:
    @Autowired
    private NoticiaService noticiaService;

    @GetMapping
    public List<Noticia> recuperarNoticias() {
        System.out.println(ServerUtils.getServerIP());
        return noticiaService.recuperarNoticias();
    }

    @GetMapping("{idNoticia}")
    public Noticia recuperarNoticiaPorId(@PathVariable("idNoticia") Long id) {
        return noticiaService.recuperarNoticiaPorId(id);
    }

    @PostMapping
    public Noticia cadastrarNoticia(@RequestBody Noticia noticia) {
        return noticiaService.cadastrarNoticia(noticia);
    }

    @PutMapping
    public Noticia alterarNoticia(@RequestBody Noticia updatedNoticia) {
        return noticiaService.alterarNoticia(updatedNoticia);
    }

    @DeleteMapping("{idNoticia}")
    public Noticia removerNoticia(@PathVariable("idNoticia") Long id) {
        Noticia noticia = noticiaService.recuperarNoticiaPorId(id);
        noticiaService.removerNoticia(id);
        return noticia;
    }
}
