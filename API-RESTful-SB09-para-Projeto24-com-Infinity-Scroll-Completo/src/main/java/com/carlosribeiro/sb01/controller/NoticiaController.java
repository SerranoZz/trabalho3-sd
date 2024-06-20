package com.carlosribeiro.sb01.controller;

import com.carlosribeiro.sb01.model.Noticia;
import com.carlosribeiro.sb01.service.NoticiaService;
import com.carlosribeiro.sb01.util.ConstantesServidor;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.IanaLinkRelations.SELF;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = ConstantesServidor.URL)
@RestController
@RequestMapping("noticias")
public class NoticiaController {

    private final NoticiaService noticiaService;

    public NoticiaController(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    @GetMapping
    public CollectionModel<EntityModel<Noticia>> recuperarNoticias() {
        List<EntityModel<Noticia>> noticias = noticiaService.recuperarNoticias().stream()
                .map(this::toEntityModel)
                .collect(Collectors.toList());
        return CollectionModel.of(noticias, linkTo(methodOn(NoticiaController.class).recuperarNoticias()).withSelfRel());
    }

    @GetMapping("{idNoticia}")
    public EntityModel<Noticia> recuperarNoticiaPorId(@PathVariable("idNoticia") Long id) {
        Noticia noticia = noticiaService.recuperarNoticiaPorId(id);
        return toEntityModel(noticia);
    }

    @PostMapping
    public ResponseEntity<?> cadastrarNoticia(@RequestBody Noticia noticia) {
        Noticia savedNoticia = noticiaService.cadastrarNoticia(noticia);
        EntityModel<Noticia> entityModel = toEntityModel(savedNoticia);
        return ResponseEntity
                .created(entityModel.getRequiredLink(SELF).toUri()) // Use SELF instead of Link.REL_SELF
                .body(entityModel);
    }
    @PutMapping
    public ResponseEntity<?> alterarNoticia(@RequestBody Noticia updatedNoticia) {
        Noticia noticia = noticiaService.alterarNoticia(updatedNoticia);
        EntityModel<Noticia> entityModel = toEntityModel(noticia);
        return ResponseEntity.ok(entityModel);
    }

    @DeleteMapping("{idNoticia}")
    public ResponseEntity<?> removerNoticia(@PathVariable("idNoticia") Long id) {
        noticiaService.removerNoticia(id);
        return ResponseEntity.noContent().build();
    }

    private EntityModel<Noticia> toEntityModel(Noticia noticia) {
        return EntityModel.of(noticia,
                linkTo(methodOn(NoticiaController.class).recuperarNoticiaPorId(noticia.getId())).withSelfRel(),
                linkTo(methodOn(NoticiaController.class).recuperarNoticias()).withRel("noticias"));
    }
}