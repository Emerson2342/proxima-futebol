import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JogadorContext = createContext();

export const useJogadorContext = () => {
  return useContext(JogadorContext);
};

export const JogadorProvider = ({ children }) => {
  const [listaDeJogadores, setListaDeJogadores] = useState([]);

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
        await AsyncStorage.setItem(
          "listaDeJogadores",
          JSON.stringify(listaDeJogadores)
        );
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [listaDeJogadores]);

  return (
    <JogadorContext.Provider
      value={{ alterarSelected, listaDeJogadores, setListaDeJogadores }}
    >
      {children}
    </JogadorContext.Provider>
  );
};
