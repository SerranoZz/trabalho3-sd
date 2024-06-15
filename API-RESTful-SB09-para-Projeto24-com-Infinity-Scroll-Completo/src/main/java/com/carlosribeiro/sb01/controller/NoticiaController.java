package com.carlosribeiro.sb01.controller;

import com.carlosribeiro.sb01.model.Noticia;
import com.carlosribeiro.sb01.service.NoticiaService;
import com.carlosribeiro.sb01.util.ConstantesServidor;
import com.carlosribeiro.sb01.util.ServidorUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = ConstantesServidor.URL)
@RestController
@RequestMapping("noticias")
public class NoticiaController {

    private final NoticiaService noticiaService;

    @Autowired
    public NoticiaController(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    @GetMapping
    public List<Noticia> recuperarNoticias() {
        System.out.println(ServidorUtils.getServerIP());
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
