import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  permissao: number;
  // Adicione outras propriedades conforme necessário
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  estaLogado: () => boolean; // Função para verificar se o usuário está logado
  admin: () => boolean; // Função para verificar se o usuário é admin
}

// Crie o contexto com um valor padrão
const UserContext = createContext<UserContextType | undefined>(undefined);

// Crie o provedor de contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Função para verificar se o usuário está logado
  const estaLogado = () => {
    return user != null; // Verifica se o usuário existe (está logado)
  };

  // Função para verificar se o usuário é admin
  const admin = () => {
    return user?.permissao === 1; // Verifica se o usuário tem permissão de admin
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, estaLogado, admin }}>
      {children}
    </UserContext.Provider>
  );
};

// Crie um hook para usar o contexto
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
