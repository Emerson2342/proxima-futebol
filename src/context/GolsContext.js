import React, { createContext, useContext, useState } from 'react';

// Criar o contexto
const GolsContext = createContext();

// Provedor de contexto
export const GolsProvider = ({ children }) => {
    const [gol1, setGol1] = useState(0);
    const [gol2, setGol2] = useState(0);

    const marcarGol1 = () => {
        setGol1((prevGol1) => prevGol1 + 1);
    };
    const marcarGol2 = () => {
        setGol2((prevGol2) => prevGol2 + 1);
    };
    const zerarPlacar = () => {
        setGol1(0);
        setGol2(0);
    }
    // Definir o valor do contexto
    const contextValue = {
        gol1,
        marcarGol1,
        gol2,
        marcarGol2,
        zerarPlacar
    };
    return (
        <GolsContext.Provider value={contextValue}>
            {children}
        </GolsContext.Provider>
    );
};

// Hook personalizado para utilizar o contexto
export const useGolsContext = () => {
    const context = useContext(GolsContext);
    if (!context) {
        throw new Error('useGolsContext deve ser usado dentro de um GolsProvider');
    }
    return context;
};
