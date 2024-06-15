package com.carlosribeiro.sb01.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;




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

    public Noticia(String capa, String titulo, String descricao, LocalDate dataPostagem) {
        this.capa = capa;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataPostagem = dataPostagem;
    }
}
