package com.carlosribeiro.sb01.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Noticia {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "A 'Capa' deve ser informada.")
    private String capa;

    @NotEmpty(message = "O 'Título' deve ser informado.")
    private String titulo;

    @NotEmpty(message = "A 'Descrição' deve ser informada.")
    @Column(columnDefinition = "LONGTEXT")
    private String descricao;

    @NotNull(message = "A 'Data de Postagem' deve ser informada.")
    @Column(name = "DATA_POSTAGEM")
    private LocalDate dataPostagem;

    @CreationTimestamp
    @Column(name = "DATA_CRIACAO", updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    @Column(name = "DATA_ATUALIZACAO")
    private LocalDateTime dataAtualizacao;

    public Noticia(String capa, String titulo, String descricao, LocalDate dataPostagem) {
        this.capa = capa;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataPostagem = dataPostagem;
    }
}
