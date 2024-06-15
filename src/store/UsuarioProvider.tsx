import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  permissao: number;
}

interface UsuarioContextType {
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
  estaLogado: () => boolean; 
  admin: () => boolean; 
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const UsuarioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const savedUsuario = localStorage.getItem('usuario');
    return savedUsuario ? JSON.parse(savedUsuario) : null;
  });

  const estaLogado = () => {
    return usuario != null; 
  };

  const admin = () => {
    return usuario?.permissao === 1; 
  };

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, estaLogado, admin }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuarioContext = (): UsuarioContextType => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error('useUsuarioContext precisa ser utilizando junto a um UsuarioProvider');
  }
  return context;
};
