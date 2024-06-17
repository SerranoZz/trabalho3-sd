import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL, BASE_URL2 } from '../util/constants';
import { NotificacaoContext } from '../store/NotificacaoProvider';
import Notificacao from '../interfaces/notificacao';
import Swal from 'sweetalert2';

const ConfirmacaoNotificacao: React.FC = () => {
  const { ultimaNotificacao, setUltimaNotificacao } = useContext(NotificacaoContext);
  useEffect(() => {
    const fetchUltimaNotificacao = async () => {
      if (Swal.isVisible()) { 
        return; 
      }

      try {
        let url = `${BASE_URL}/notificacoes/ultimas`;
        if (ultimaNotificacao?.timestamp) {
          url += `?ultimoTimestampVisualizado=${ultimaNotificacao.timestamp}`;
        }

        const response = await axios.get(url);
        const novasNotificacoes = response.data;

        console.log("chegou", JSON.stringify(novasNotificacoes))

        if (novasNotificacoes.length > 0) {
          for (const novaNotificacao of novasNotificacoes) {
            const mensagem = novaNotificacao.status === 'adicionada' ? 'Nova notícia cadastrada!' : 'Notícia editada!';
            
            Swal.fire({
              title: mensagem,
              text: `Deseja visualizar a notícia "${novaNotificacao.noticia.titulo}"?`, // Adicione o título da notícia
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Sim',
              cancelButtonText: 'Não',
              confirmButtonColor: '#FFD700', 
              cancelButtonColor: '#FFD700',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = `${BASE_URL2}/noticia/${novaNotificacao.noticia.id}`;
              }
            });
          }

          const ultimaNotificacaoRecebida = novasNotificacoes[novasNotificacoes.length - 1];
          const novoValor: Notificacao = { 
            id: ultimaNotificacaoRecebida.noticia.id, 
            timestamp: ultimaNotificacaoRecebida.noticia.dataAtualizacao
          };
          setUltimaNotificacao(novoValor);
        }
      } catch (error) {
        console.error('Erro ao buscar notificação:', error);
      }
    };

    const interval = setInterval(fetchUltimaNotificacao, 2000);

    return () => clearInterval(interval);
  }, [ultimaNotificacao, setUltimaNotificacao]); 

  return <div>{}</div>;
};

export default ConfirmacaoNotificacao;

