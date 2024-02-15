import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JogadorContext = createContext();

export const JogadorProvider = ({ children }) => {
    const [listaDeJogadores, setListaDeJogadores] = useState(
        [['Witch Doctor', 5, 2], ['Lion', 3, 1], ['Anti-Mage', 0, 3],
        ['Invoker', 3, 3], ['Lifesteal', 2, 1], ['Outworld Devourer', 1, 1],
        ['Phanton Assassin', 2, 0], ['Skywrat Mage', 0, 0], ['Jogador9', 1, 1],
        ['Tinker', 0, 3], ['Leshrac', 3, 3], ['Lycan', 2, 4],
        ['Axe', 0, 0], ['Phanton Lancer', 2, 1], ['Pudge', 2, 0], ['Faceless Void', 5, 3]]);

    const [gol, setGol] = useState(0);
    const marcarGol = (index, timeTitular) => {
        // Testa se index é uma string vazia, null ou undefined

        if (index >= 0 && index < timeTitular.length) {
            setListaDeJogadores((prevState) => {
                const novoArray = [...prevState];
                // Verifica se timeTitular[index] é undefined antes de acessar [0]
                if (timeTitular[index] !== undefined) {

                    // Encontre o índice do jogador na lista geral
                    const jogadorIndex = listaDeJogadores.findIndex(jogador => jogador[0] === timeTitular[index][0]);
                    // Verifica se jogadorIndex é válido antes de acessar novoArray[jogadorIndex]
                    if (jogadorIndex !== -1 && novoArray[jogadorIndex]) {
                        setGol(gol + 1);
                        console.log("Gol Marcado", index)
                        // Atualiza o número de gols do jogador no índice encontrado
                        novoArray[jogadorIndex] = [novoArray[jogadorIndex][0], novoArray[jogadorIndex][1] + 1, novoArray[jogadorIndex][2]];
                        console.log(`Gol marcado para o Time ${time}`, index);

                        return novoArray;

                    } else {
                        Alert.alert(
                            'Meu chapa',
                            'Vc tá vendo jogadar aí nessa posição??!',
                            [{ text: 'OK' }],
                            { cancelable: false }
                        );
                        return prevState; // Retorna o estado anterior sem fazer alterações
                    }
                } else {
                    alert("Índice fora dos limites");
                    return prevState; // Retorna o estado anterior sem fazer alterações
                }
            });
        } else {
            alert("Índice fora dos limites");
        }
    };



    useEffect(() => {
        const retrieveData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('listaDeJogadores');
                if (storedData) {
                    setListaDeJogadores(JSON.parse(storedData));
                }
            } catch (error) {
                console.error('Erro ao recuperar dados do AsyncStorage:', error);
            }
        };

        retrieveData();
    }, []);

    const updateAndPersistData = async (newData) => {
        const sortedData = [...newData].sort((a, b) => a[0].localeCompare(b[0]));


        setListaDeJogadores(sortedData);

        try {
            // Salva os dados no AsyncStorage sempre que houver uma atualização
            await AsyncStorage.setItem('listaDeJogadores', JSON.stringify(sortedData));
        } catch (error) {
            console.error('Erro ao salvar dados no AsyncStorage:', error);
        }

    };

    return (
        <JogadorContext.Provider value={{ gol, setGol, marcarGol, listaDeJogadores, setListaDeJogadores: updateAndPersistData }}>
            {children}
        </JogadorContext.Provider>
    );
};

export const useJogadorContext = () => {
    return useContext(JogadorContext);
};
