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
        let url = `${BASE_URL}/notificacoes/ultima`;
        if (ultimaNotificacao?.timestamp) {
          url += `?ultimoTimestampVisualizado=${ultimaNotificacao.timestamp}`;
        }

        const response = await axios.get(url);
        const novaNotificacao = response.data;

        console.log("chegou", JSON.stringify(novaNotificacao))
        
        if (novaNotificacao.hasOwnProperty("alteracao")) {
          const mensagem = novaNotificacao.alteracao === 'Cadastrada' ? 'Nova notícia cadastrada!' : novaNotificacao.alteracao === 'Alterada' ? 'Notícia editada!' : 'Notícia excluída!';
          console.log(novaNotificacao.alteracao);
          if(novaNotificacao.alteracao != 'Removida') {
            Swal.fire({
              title: mensagem,
              text: `Deseja visualizar a notícia "${novaNotificacao.titulo}"?`, // Adicione o título da notícia
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Sim',
              cancelButtonText: 'Não',
              confirmButtonColor: '#FFD700', 
              cancelButtonColor: '#FFD700',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = `${BASE_URL2}/noticia/${novaNotificacao.id}`;
              }
            });
          }

          const novoValor: Notificacao = { 
            id: novaNotificacao.id, 
            timestamp: novaNotificacao.timestamp
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

