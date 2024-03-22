import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AdicionarProxima from "./AdicionarProxima";
import Home from "./Home";
import Rank from "./Rank";
import ListaJogadores from "./ListaJogadores";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            color: "#cece",
          },

          tabBarStyle: {
            borderTopWidth: 1,
            borderWidth: 1,
            borderColor: "#20473c",
            alignSelf: "center",
            width: "95%",
            marginBottom: 15,
            borderRadius: 5,
            backgroundColor: "#3f8d65",
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
                    size={40}
                    color={"#20473c"}
                  />
                );
              }
              return (
                <MaterialCommunityIcons
                  name="account-multiple-plus-outline"
                  size={40}
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
    </View>
  );
}
