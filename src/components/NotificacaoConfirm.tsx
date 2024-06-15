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
        if (newAlerts.length > alerts.length) {
          alerts = newAlerts; 
          setHasNewAlert(true); 
        } else {
          setHasNewAlert(false); 
        }
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
      }
    };

    fetchAlerts();

    const interval = setInterval(() => {
      fetchAlerts();
    }, 2000); 

    return () => clearInterval(interval);
  }, [alerts]); 

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
