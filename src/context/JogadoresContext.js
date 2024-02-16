import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JogadorContext = createContext();

export const useJogadorContext = () => {
    return useContext(JogadorContext);
};

export const JogadorProvider = ({ children }) => {
    const [listaDeJogadores, setListaDeJogadores] = useState([
        { id: 11, jogador: 'Witch Doctor', gols: 0, assist: 0, selected: false },
        { id: 12, jogador: 'Lion', gols: 0, assist: 0, selected: false },
        { id: 13, jogador: 'AntiMage', gols: 0, assist: 0, selected: false },
        { id: 14, jogador: 'Axe', gols: 0, assist: 0, selected: false },
        { id: 15, jogador: 'Outworld Devourer', gols: 0, assist: 0, selected: false },
        { id: 16, jogador: 'Enchantress', gols: 0, assist: 0, selected: false },
        { id: 17, jogador: 'Faceless Void', gols: 0, assist: 0, selected: false },
        { id: 18, jogador: 'Queen of Pain', gols: 0, assist: 0, selected: false }, ,
        { id: 19, jogador: 'Invoker', gols: 0, assist: 0, selected: false },
        { id: 20, jogador: 'Tidehunter', gols: 0, assist: 0, selected: false },
        { id: 21, jogador: 'Ember Spirit', gols: 0, assist: 0, selected: false },
        { id: 22, jogador: 'Sven', gols: 0, assist: 0, selected: false },
        { id: 23, jogador: 'Lina', gols: 0, assist: 0, selected: false },
        { id: 24, jogador: 'Medusa', gols: 0, assist: 0, selected: false },
        { id: 25, jogador: 'Spectre', gols: 0, assist: 0, selected: false },
        { id: 26, jogador: 'Meepo', gols: 0, assist: 0, selected: false },
        { id: 27, jogador: 'Timbersaw', gols: 0, assist: 0, selected: false },
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


