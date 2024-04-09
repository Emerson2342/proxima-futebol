import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import AdicionarProxima from "./AdicionarProxima";
import Home from "./Home";
import Rank from "./Rank";
import ListaJogadores from "./ListaJogadores";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const Tab = createBottomTabNavigator();

export function Routes() {
  const [apresentation, setApresentation] = useState(true);

  function App() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
            alignSelf: "center",
            width: "95%",
            backgroundColor: "#f2f2f2",
          },
        }}
      >
        <Tab.Screen
          name="Jogo"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <MaterialCommunityIcons
                    name="whistle"
                    size={30}
                    color={"#20473c"}
                    style={styles.icon}
                  />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="whistle-outline"
                  size={30}
                  color={"#20473c"}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Lista de Proximas"
          component={AdicionarProxima}
          options={{
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <MaterialCommunityIcons
                    name="clipboard-edit"
                    size={30}
                    color={"#20473c"}
                    style={styles.icon}
                  />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="clipboard-edit-outline"
                  size={30}
                  color={"#20473c"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Lista de Jogadores"
          component={ListaJogadores}
          options={{
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <MaterialCommunityIcons
                    name="account-multiple-plus"
                    size={35}
                    color={"#20473c"}
                    style={styles.icon}
                  />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="account-multiple-plus-outline"
                  size={35}
                  color={"#20473c"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Artilharia"
          component={Rank}
          options={{
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <MaterialCommunityIcons
                    name="medal"
                    size={30}
                    color={"#20473c"}
                    style={styles.icon}
                  />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="medal-outline"
                  size={30}
                  color={"#20473c"}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  function Instructions() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Instruções</Text>
        <TouchableOpacity onPress={() => setApresentation(false)}>
          <Text>Ir para o aplicativo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {apresentation ? <Instructions /> : <App />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  icon: {
    backgroundColor: "#cece",
    borderWidth: 1,
    width: "70%",
    alignSelf: "center",
    borderRadius: 5,
    textAlign: "center",
  },
});
