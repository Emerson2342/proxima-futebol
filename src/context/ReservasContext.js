import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReservaContext = createContext();

export const ReservaProvider = ({ children }) => {
    const [listaDeReservas, setListaDeReservas] = useState(['', 0, 0]);


    useEffect(() => {
        const retrieveData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('listaDeReservas');
                if (storedData) {
                    setListaDeReservas(JSON.parse(storedData));
                }
            } catch (error) {
                console.error('Erro ao recuperar dados do AsyncStorage:', error);
            }
        };

        retrieveData();
    }, []);

    const updateAndPersistData = async (newData) => {
        setListaDeReservas(newData);
        try {
            // Salva os dados no AsyncStorage sempre que houver uma atualização
            await AsyncStorage.setItem('listaDeReservas', JSON.stringify(newData));
        } catch (error) {
            console.error('Erro ao salvar dados no AsyncStorage:', error);
        }
    };

    return (
        <ReservaContext.Provider value={{ listaDeReservas, setListaDeReservas: updateAndPersistData }}>
            {children}
        </ReservaContext.Provider>
    );
};

export const useReservaContext = () => {
    return useContext(ReservaContext);
};
