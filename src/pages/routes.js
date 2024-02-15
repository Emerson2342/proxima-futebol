import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home";
import AdicionarProxima from "./AdicionarProxima";
//import Artilheiros from "./Artilheiros";
import CustomTabBar from "../components/customTabBar";
import Rank from "./Rank";
import ListaJogadores from "./ListaJogadores";



const Tab = createBottomTabNavigator();

export function Routes() {
    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#121212',


                tabBarStyle: {
                    borderTopWidth: 0,
                    backGroundColor: '#ffffff'
                }
            }}

            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: "soccer-field"
                }}
            />

            <Tab.Screen
                name="Adicionar Próxima"
                component={AdicionarProxima}
                options={{
                    tabBarIcon: "content-paste"
                }}
            />
            <Tab.Screen
                name="Lista de Jogadores"
                component={ListaJogadores}
                options={{
                    tabBarIcon: "person-add"
                }}
            />
            <Tab.Screen
                name="Rank"
                component={Rank}
                options={{
                    tabBarIcon: "emoji-events"
                }}
            />
        </Tab.Navigator>
    )
}