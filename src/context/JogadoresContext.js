import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JogadorContext = createContext();

export const useJogadorContext = () => {
    return useContext(JogadorContext);
};

export const JogadorProvider = ({ children }) => {
    const [listaDeJogadores, setListaDeJogadores] = useState([
        { id: 11, jogador: 'Witch Doctor', gols: 3, assist: 5, selected: false },
        { id: 12, jogador: 'Lion', gols: 5, assist: 3, selected: false },
        { id: 13, jogador: 'AntiMage', gols: 2, assist: 1, selected: false },
        { id: 14, jogador: 'Axe', gols: 2, assist: 0, selected: false },
        { id: 15, jogador: 'Outworld Devourer', gols: 7, assist: 1, selected: false },
        { id: 16, jogador: 'Enchantress', gols: 5, assist: 5, selected: false },
        { id: 17, jogador: 'Faceless Void', gols: 6, assist: 3, selected: false },
        { id: 18, jogador: 'Queen of Pain', gols: 9, assist: 8, selected: false },
        { id: 19, jogador: 'Invoker', gols: 0, assist: 7, selected: false },
        { id: 20, jogador: 'Tidehunter', gols: 5, assist: 2, selected: false },
        { id: 21, jogador: 'Ember Spirit', gols: 4, assist: 5, selected: false },
        { id: 22, jogador: 'Sven', gols: 8, assist: 4, selected: false },
        { id: 23, jogador: 'Lina', gols: 3, assist: 6, selected: false },
        { id: 24, jogador: 'Medusa', gols: 4, assist: 9, selected: false },
        { id: 25, jogador: 'Spectre', gols: 6, assist: 1, selected: false },
        { id: 26, jogador: 'Meepo', gols: 6, assist: 1, selected: false },
        { id: 27, jogador: 'Timbersaw', gols: 2, assist: 0, selected: false },
    ]);

    const alterarSelected = (jogador, novoValor) => {
        setListaDeJogadores((prevList) =>
            prevList.map((item) =>
                item === jogador ? { ...item, selected: novoValor } : item
            )
        );
    };

    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("listaDeJogadores");
                if (storedData) {
                    setListaDeJogadores(JSON.parse(storedData));
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
                await AsyncStorage.setItem("listaDeJogadores", JSON.stringify(listaDeJogadores));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [listaDeJogadores]);



    return (
        <JogadorContext.Provider value={{ alterarSelected, listaDeJogadores, setListaDeJogadores }}>
            {children}
        </JogadorContext.Provider>
    );
};


