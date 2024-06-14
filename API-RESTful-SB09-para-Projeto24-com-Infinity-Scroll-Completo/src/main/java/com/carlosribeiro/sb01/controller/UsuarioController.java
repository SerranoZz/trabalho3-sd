package com.carlosribeiro.sb01.controller;

import com.carlosribeiro.sb01.model.Usuario;
import com.carlosribeiro.sb01.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http:"+IP+":5173")
@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("{id}")
    public Usuario buscarUsuarioPorId(@PathVariable("id") Long id) {
        return usuarioService.buscarUsuarioPorId(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    @PostMapping
    public ResponseEntity<?> cadastrarUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = usuarioService.salvarUsuario(usuario);
            return ResponseEntity.ok(novoUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário: " + e.getMessage());
        }
    }

    @PutMapping("{id}")
    public Usuario alterarUsuario(@PathVariable("id") Long id, @RequestBody Usuario usuarioAtualizado) {
        usuarioAtualizado.setId(id); // Garante que o ID seja o mesmo do path
        return usuarioService.salvarUsuario(usuarioAtualizado);
    }

    @DeleteMapping("{id}")
    public Usuario deletarUsuario(@PathVariable("id") Long id) {
        Usuario usuario = usuarioService.buscarUsuarioPorId(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
        usuarioService.deletarUsuario(id);
        return usuario;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        System.out.println(usuario);
        Optional<Usuario> usuarioOpt = usuarioService.verificarCredenciais(usuario.getEmail(), usuario.getSenha());
        if (usuarioOpt.isPresent()) {
            return ResponseEntity.ok(usuarioOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }
}
