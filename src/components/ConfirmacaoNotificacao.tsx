import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL, BASE_URL2 } from '../util/constants';
import { NotificacaoContext } from '../store/NotificacaoProvider';
import Notificacao from '../interfaces/notificacao';

const ConfirmacaoNotificacao: React.FC = () => {
  const { ultimaNotificacao, setUltimaNotificacao } = useContext(NotificacaoContext);

  useEffect(() => {
    const fetchUltimaNotificacao = async () => {
      try {
        console.log('guardado:', ultimaNotificacao);

        const url = `${BASE_URL}/notificacoes/ultimas?ultimoIdVisualizado=${ultimaNotificacao?.id}`;
        const response = await axios.get(url);
        const novaNotificacaoData = response.data;

        console.log("chegou", novaNotificacaoData);

        if (novaNotificacaoData !== "") {
          const novoValor: Notificacao = { id: novaNotificacaoData.id };
          setUltimaNotificacao(novoValor);
          const confirmacao = window.confirm('Nova notícia cadastrada! Clique em OK para conferir.');
          if (confirmacao) {
            window.location.href = `${BASE_URL2}/noticia/${novaNotificacaoData.id}`;
          }
        }
      } catch (error) {
        console.error('Erro ao buscar notificação:', error);
      }
    };

    const interval = setInterval(fetchUltimaNotificacao, 2000);

    return () => clearInterval(interval);
  }, [ultimaNotificacao, setUltimaNotificacao]);

  return (
    <div>
      {}
    </div>
  );
};

export default ConfirmacaoNotificacao;
