import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import AdicionarProxima from "./AdicionarProxima";
import Home from "./Home";
import Rank from "./Rank";
import ListaJogadores from "./ListaJogadores";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Apresentacao } from "./Home/instructions";
import * as Animatable from "react-native-animatable";

const Tab = createBottomTabNavigator();

export function Routes() {
  const [apresentation, setApresentation] = useState(true);

  const focus = '#489404'

  function App() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
            alignSelf: "center",
            width: "100%",
            backgroundColor: "#fff",
            paddingBottom: 5,
            height: 50,
          },
          tabBarActiveTintColor: focus
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
                    color={focus}
                    style={styles.icon}
                  />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="whistle-outline"
                  size={30}
                  color={"#c9c9c9"}
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
                    color={focus}
                    style={styles.icon}
                  />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="clipboard-edit-outline"
                  size={30}
                  color={"#c9c9c9"}
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
                    color={focus}
                    style={styles.icon}
                  />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="account-multiple-plus-outline"
                  size={35}
                  color={"#c9c9c9"}
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
                    color={focus}
                    style={styles.icon}
                  />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="medal-outline"
                  size={30}
                  color={"#c9c9c9"}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  function TelaApresentacao() {
    return (
      <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <Apresentacao />
        <Animatable.View
          style={styles.button}
          animation="slideInUp" duration={1500}
        >
          <TouchableOpacity
            onPress={() => setApresentation(false)}>
            <Text
              style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}
            >Ir para o aplicativo</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
  return (
    <View style={styles.container}>

      {apresentation ? < TelaApresentacao /> : <App />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  icon: {
    width: "70%",
    alignSelf: "center",
    borderRadius: 5,
    textAlign: "center",
  },
  button: {
    top: 200,
    width: '80%',
    backgroundColor: "#93dc4f",
    padding: 10,
    borderRadius: 15

  }
});
