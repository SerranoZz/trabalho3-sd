package com.carlosribeiro.sb01.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "O 'Nome' deve ser informado.")
    private String nome;

    @Getter
    @NotEmpty(message = "O 'E-mail' deve ser informado.")
    private String email;

    @Getter
    @NotEmpty(message = "A 'Senha' deve ser informada.")
    private String senha;

    @Getter
    @Setter
    @NotNull(message = "A 'Permissão' deve ser informada.")
    private Integer permissao;

    public Usuario(String nome, String email, String senha, Integer permissao) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.permissao = permissao;
    }
}
