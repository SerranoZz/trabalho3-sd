package com.carlosribeiro.sb01.repository;

import com.carlosribeiro.sb01.model.Noticia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;




public interface NoticiaRepository extends JpaRepository<Noticia, Long> {
    @Query("SELECT n FROM Noticia n")
    List<Noticia> recuperarNoticias();
}
