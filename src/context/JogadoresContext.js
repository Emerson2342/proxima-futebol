import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JogadorContext = createContext();

export const useJogadorContext = () => {
    return useContext(JogadorContext);
};

export const JogadorProvider = ({ children }) => {
    const [listaDeJogadores, setListaDeJogadores] = useState([
        { jogador: 'Witch Doctor', gols: 3, assist: 5, reserva: false, titular: false, selected: false },
        { jogador: 'Lion', gols: 5, assist: 3, reserva: false, titular: false, selected: false },
        { jogador: 'AntiMage', gols: 2, assist: 1, reserva: false, titular: false, selected: false },
        { jogador: 'Axe', gols: 2, assist: 0, reserva: false, titular: false, selected: false },
        { jogador: 'Outworld Devourer', gols: 7, assist: 1, reserva: false, titular: false, selected: false },
        { jogador: 'Enchantress', gols: 5, assist: 5, reserva: false, titular: false, selected: false },
        { jogador: 'Faceless Void', gols: 6, assist: 3, reserva: false, titular: false, selected: false },
        { jogador: 'Queen of Pain', gols: 9, assist: 8, reserva: false, titular: false, selected: false },
        { jogador: 'Invoker', gols: 0, assist: 7, reserva: false, titular: false, selected: false },
        { jogador: 'Tidehunter', gols: 5, assist: 2, reserva: false, titular: false, selected: false },
        { jogador: 'Ember Spirit', gols: 4, assist: 5, reserva: false, titular: false, selected: false },
        { jogador: 'Sven', gols: 8, assist: 4, reserva: false, titular: false, selected: false },
        { jogador: 'Lina', gols: 3, assist: 6, reserva: false, titular: false, selected: false },
        { jogador: 'Medusa', gols: 4, assist: 9, reserva: false, titular: false, selected: false },
        { jogador: 'Spectre', gols: 6, assist: 1, reserva: false, titular: false, selected: false },
        { jogador: 'Meepo', gols: 6, assist: 1, reserva: false, titular: false, selected: false },
        { jogador: 'Timbersaw', gols: 2, assist: 0, reserva: false, titular: false, selected: false },
    ]);

    const alterarSelected = (jogador, novoValor) => {
        setListaDeJogadores((prevList) =>
            prevList.map((item) =>
                item === jogador ? { ...item, selected: novoValor } : item
            )
        );
    };

    const alterarReserva = () => {
        setListaDeJogadores((prevList) =>
            prevList.map((item) =>
                item.selected && !item.reserva
                    ? { ...item, reserva: true }
                    : item
            )
        );
    };

    const LimparReserva = () => {
        setListaDeJogadores((prevList) =>
            prevList.map((item) =>
                item.reserva
                    ? { ...item, reserva: false }
                    : item
            )
        );
    };

    const LimparReservaJogador = (index) => {
        setListaDeJogadores((prevList) =>
            prevList.map((item, i) =>
                i === index ? { ...item, reserva: false } : item
            )
        );
    };




    const limparSelected = () => {
        setListaDeJogadores((prevList) =>
            prevList.map((item) =>
                item.selected && item.reserva
                    ? { ...item, selected: false }
                    : item
            )
        );
    }

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

    /*   useEffect(() => {
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
      }, []); */

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
        <JogadorContext.Provider value={{ LimparReservaJogador, LimparReserva, limparSelected, alterarReserva, alterarSelected, listaDeJogadores, setListaDeJogadores }}>
            {children}
        </JogadorContext.Provider>
    );
};


