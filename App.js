import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Routes } from "./src/pages/routes";
import { TimeProvider } from "./src/context/TimeContext"; // Substitua pelo caminho real
import { JogadorProvider } from "./src/context/JogadoresContext";
import { ReservaProvider } from "./src/context/ReservasContext";
import { GolsProvider } from "./src/context/GolsContext";


import 'react-native-reanimated';

export default function App() {
  return (
    <JogadorProvider>
      <ReservaProvider>
        <TimeProvider>
          <GolsProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </GolsProvider>
        </TimeProvider>
      </ReservaProvider>
    </JogadorProvider>

  );
}
