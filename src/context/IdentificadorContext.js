import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IdentificadorContext = createContext();

export const useIdentificadorContext = () => {
  return useContext(IdentificadorContext);
};

export const IdentificadorProvider = ({ children }) => {
  const [identificador, setIdentificador] = useState(1);

  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("identificador");
        if (storedData) {
          setIdentificador(JSON.parse(storedData));
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
          "identificador",
          JSON.stringify(identificador)
        );
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [identificador]);

  return (
    <IdentificadorContext.Provider value={{ identificador, setIdentificador }}>
      {children}
    </IdentificadorContext.Provider>
  );
};
