import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAlerts from '../hooks/useAlert';
import { BASE_URL, BASE_URL2 } from '../util/constants';

const WebSocketComponent = () => {
  let {data: alerts} = useAlerts();
  const [hasNewAlert, setHasNewAlert] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(BASE_URL+'/alert/list');
        const newAlerts = response.data;
        console.log(newAlerts.length, alerts.length)
        // Verifica se há alerta novo comparando o comprimento dos arrays
        if (newAlerts.length > alerts.length) {
          alerts = newAlerts; // Atualiza o estado 'alerts' com os novos alertas
          setHasNewAlert(true); // Indica que há um novo alerta
        } else {
          setHasNewAlert(false); // Não há novo alerta
        }
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
      }
    };

    // Função para buscar alertas inicialmente
    fetchAlerts();

    // Configurar intervalo para buscar novos alertas a cada 2 segundos
    const interval = setInterval(() => {
      fetchAlerts();
    }, 2000); // 2 segundos em milissegundos

    // Limpar intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [alerts]); // Dependência agora inclui o estado 'alerts'

  // Efeito para mostrar popup de alerta se houver novo alerta
  useEffect(() => {
    if (hasNewAlert) {
      const result = window.confirm('Nova notícia cadastrada! Clique em OK para conferir.');

      if (result) {
        window.location.href = BASE_URL2;
      }
    }
  }, [hasNewAlert]);

  return (
    <div>
    </div>
  );
};

export default WebSocketComponent;
