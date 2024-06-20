package com.carlosribeiro.sb01.controller;

import com.carlosribeiro.sb01.model.Usuario;
import com.carlosribeiro.sb01.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import com.carlosribeiro.sb01.util.ConstantesServidor;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = ConstantesServidor.URL)
@RestController
@RequestMapping("usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = usuarioService.salvarUsuario(usuario);

            EntityModel<Usuario> usuarioResource = EntityModel.of(novoUsuario,
                    linkTo(methodOn(UsuarioController.class).cadastrarUsuario(novoUsuario)).withSelfRel(),
                    linkTo(methodOn(UsuarioController.class).login(usuario)).withRel("login"),
                    linkTo(methodOn(UsuarioController.class).cadastrarUsuario(null)).withRel("cadastro")

            );

            return ResponseEntity.created(linkTo(methodOn(UsuarioController.class).cadastrarUsuario(novoUsuario)).toUri()) // 201 Created
                    .body(usuarioResource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioOpt = usuarioService.verificarCredenciais(usuario.getEmail(), usuario.getSenha());
        if (usuarioOpt.isPresent()) {
            Usuario usuarioLogado = usuarioOpt.get();

            EntityModel<Usuario> usuarioResource = EntityModel.of(usuarioLogado,
                    linkTo(methodOn(UsuarioController.class).login(usuario)).withSelfRel(),
                    linkTo(methodOn(UsuarioController.class).cadastrarUsuario(null)).withRel("cadastro")
            );

            return ResponseEntity.ok(usuarioResource);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }
}
