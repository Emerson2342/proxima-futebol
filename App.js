import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Routes } from "./src/pages/routes";
import { JogadorProvider } from "./src/context/JogadoresContext";
import { JogadoresReservasProvider } from "./src/context/JogadoresReservasContext";
import { TimeProvider } from "./src/context/TimeContext";

import 'react-native-reanimated';

export default function App() {
  return (
    <JogadorProvider>
      <JogadoresReservasProvider>
        <TimeProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </TimeProvider>
      </JogadoresReservasProvider>
    </JogadorProvider>

  );
}
