import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const createEmptyPlayer = () => [
    {
      id: null,
      jogador: "",
      gols: 0,
      assist: 0,
      selected: false,
    },
  ];

  const [timeTitular1, setTimeTitular1] = useState(
    Array.from({ length: 5 }, createEmptyPlayer)
  );

  const [timeTitular2, setTimeTitular2] = useState(
    Array.from({ length: 5 }, createEmptyPlayer)
  );

  // Carregar dados do AsyncStorage na inicialização
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("timeData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setTimeTitular1(parsedData.timeTitular1 || []);
          setTimeTitular2(parsedData.timeTitular2 || []);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  // Atualizar AsyncStorage quando os dados mudam
  useEffect(() => {
    const saveData = async () => {
      try {
        const dataToSave = {
          timeTitular1,
          timeTitular2,
        };
        await AsyncStorage.setItem("timeData", JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    };

    saveData();
  }, [timeTitular1, timeTitular2]);

  return (
    <TimeContext.Provider
      value={{ timeTitular1, setTimeTitular1, timeTitular2, setTimeTitular2 }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTimeContext must be used within a TimeProvider");
  }
  return context;
};
