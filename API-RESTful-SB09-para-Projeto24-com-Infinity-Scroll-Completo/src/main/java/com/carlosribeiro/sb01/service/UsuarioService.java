package com.carlosribeiro.sb01.service;

import com.carlosribeiro.sb01.model.Usuario;
import com.carlosribeiro.sb01.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Optional<Usuario> buscarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario salvarUsuario(Usuario usuario) {
        if ("admin".equals(usuario.getSenha())) {
            usuario.setPermissao(1);
        } else {
            usuario.setPermissao(0);
        }

        return usuarioRepository.save(usuario);
    }


    public void deletarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> verificarCredenciais(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }
}
