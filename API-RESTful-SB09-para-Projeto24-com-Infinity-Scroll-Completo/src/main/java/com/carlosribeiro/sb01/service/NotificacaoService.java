package com.carlosribeiro.sb01.service;

import com.carlosribeiro.sb01.model.Noticia;
import com.carlosribeiro.sb01.repository.NoticiaRepository;
import com.carlosribeiro.sb01.util.NoticiaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class NotificacaoService {

    private final NoticiaRepository noticiaRepository;

    @Autowired
    public NotificacaoService(NoticiaRepository noticiaRepository) {
        this.noticiaRepository = noticiaRepository;
    }

    public List<NoticiaDTO> getUltimasNotificacoes(LocalDateTime ultimoTimestampVisualizado) {
    List<Noticia> noticias = (ultimoTimestampVisualizado == null)
            ? noticiaRepository.findAllByOrderByDataPostagemDesc()
            : noticiaRepository.findByDataCriacaoAfterOrDataAtualizacaoAfterOrderByDataPostagemDesc(ultimoTimestampVisualizado);

    return noticias.stream()
            .map(noticia -> new NoticiaDTO(noticia, obterStatus(noticia, ultimoTimestampVisualizado)))
            .collect(Collectors.toList());
}

    private String obterStatus(Noticia noticia, LocalDateTime ultimoTimestampVisualizado) {
        if (ultimoTimestampVisualizado == null || noticia.getDataCriacao().isAfter(ultimoTimestampVisualizado)) {
            return "adicionada";
        }
        return "editada";
    }

}