import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JogadoresReservasContext = createContext();

export const useJogadoresReservasContext = () => {
    return useContext(JogadoresReservasContext);
};

export const JogadoresReservasProvider = ({ children }) => {
    const [jogadoresReservas, setJogadoresReservas] = useState([]);


    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("jogadoresReservas");
                if (storedData) {
                    setJogadoresReservas(JSON.parse(storedData));
                }
            } catch (error) {
                console.error("Erro ao carregar dados do AsyncStorage:", error);
            }
        };

        loadAsyncData();
    }, []);


    useEffect(() => {
        const saveAsyncData = async () => {
            try {
                await AsyncStorage.setItem("jogadoresReservas", JSON.stringify(jogadoresReservas));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [jogadoresReservas]);



    return (
        <JogadoresReservasContext.Provider value={{ jogadoresReservas, setJogadoresReservas }}>
            {children}
        </JogadoresReservasContext.Provider>
    );
};


