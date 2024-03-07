import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlacarContext = createContext();

export const PlacarProvider = ({ children }) => {

  const [placar, setPlacar] = useState([
    { id: 1, time: "Amarelo", gols: 0 },
    { id: 2, time: "Verde", gols: 0 }
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("placarData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (typeof parsedData === "object" && parsedData !== null) {
            setPlacar([
              parsedData.placar[0] || { id: 1, time: "Amarelo", gols: 0 },
              parsedData.placar[1] || { id: 2, time: "Verde", gols: 0 }
            ]);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        const dataToSave = {
          placar
        };
        await AsyncStorage.setItem("placarData", JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveData();
  }, [placar]);

  return (
    <PlacarContext.Provider
      value={{ placar, setPlacar }}
    >
      {children}
    </PlacarContext.Provider>
  );
};

export const usePlacarContext = () => {
  const context = useContext(PlacarContext);
  if (!context) {
    throw new Error("usePlacarContext deve ser usando dentro PlacarProvider");
  }
  return context;
};
