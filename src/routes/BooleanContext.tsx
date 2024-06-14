import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// Defina a interface para o contexto
interface BooleanContextType {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

// Crie o contexto com um valor padrão
const BooleanContext = createContext<BooleanContextType | undefined>(undefined);

// Crie o provedor de contexto
export const BooleanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('booleanValue');
    return savedValue ? JSON.parse(savedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem('booleanValue', JSON.stringify(value));
  }, [value]);

  return (
    <BooleanContext.Provider value={{ value, setValue }}>
      {children}
    </BooleanContext.Provider>
  );
};

// Crie um hook para usar o contexto
export const useBooleanContext = (): BooleanContextType => {
  const context = useContext(BooleanContext);
  if (!context) {
    throw new Error('useBooleanContext must be used within a BooleanProvider');
  }
  return context;
};