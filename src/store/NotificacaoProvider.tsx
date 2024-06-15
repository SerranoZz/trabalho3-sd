import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import Notificacao from '../interfaces/notificacao';

interface NotificacaoContextType {
  ultimaNotificacao: Notificacao;
  setUltimaNotificacao: React.Dispatch<React.SetStateAction<Notificacao>>;
}

const defaultNotificacaoContext: NotificacaoContextType = {
  ultimaNotificacao: { id: 5 }, 
  setUltimaNotificacao: () => {} 
};

const NotificacaoContext = createContext<NotificacaoContextType>(defaultNotificacaoContext);

const NotificacaoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ultimaNotificacao, setUltimaNotificacao] = useState<Notificacao>(() => {
    const savedNotificacao = localStorage.getItem('ultimaNotificacao');
    return savedNotificacao ? JSON.parse(savedNotificacao) : { id: 5 };
  });

  useEffect(() => {
    localStorage.setItem('ultimaNotificacao', JSON.stringify(ultimaNotificacao));
  }, [ultimaNotificacao]);

  return (
    <NotificacaoContext.Provider value={{ ultimaNotificacao, setUltimaNotificacao }}>
      {children}
    </NotificacaoContext.Provider>
  );
};

export { NotificacaoProvider, NotificacaoContext };
