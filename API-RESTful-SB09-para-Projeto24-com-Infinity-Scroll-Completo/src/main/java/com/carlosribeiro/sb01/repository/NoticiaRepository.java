package com.carlosribeiro.sb01.repository;

import com.carlosribeiro.sb01.model.Noticia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;




public interface NoticiaRepository extends JpaRepository<Noticia, Long> {
    @Query("SELECT n FROM Noticia n ORDER BY n.dataPostagem DESC")
    List<Noticia> findAllByOrderByDataPostagemDesc();

    @Query("SELECT n FROM Noticia n WHERE n.dataCriacao > :timestamp OR n.dataAtualizacao > :timestamp ORDER BY n.dataPostagem DESC")
    List<Noticia> findByDataCriacaoAfterOrDataAtualizacaoAfterOrderByDataPostagemDesc(@Param("timestamp") LocalDateTime timestampAtualizacao);

    @Query("SELECT n FROM Noticia n order by n.dataPostagem desc")
    List<Noticia> recuperarNoticias();
}
