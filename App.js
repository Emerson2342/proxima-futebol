import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Routes } from "./src/pages/routes";
import { JogadorProvider } from "./src/context/JogadoresContext";

import 'react-native-reanimated';

export default function App() {
  return (
    <JogadorProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </JogadorProvider>

  );
}
