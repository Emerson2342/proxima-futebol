import React from 'react';
import { View, StyleSheet, Text, Image, StatusBar } from 'react-native';
import Logo from '../../../assets/proximaImage.png'
import { MotiView, MotiText } from "moti";

import * as Animatable from "react-native-animatable";

export function Apresentacao() {
    return (
        <View style={styles.container}>
            <MotiView
                style={{ alignItems: 'center', paddingTop: 20 }}
                from={{ translateY: -100 }}
                animate={{ translateY: 0 }}
                transition={{ type: 'timing', duration: 2000 }}
            >
                <View style={styles.header} />
                <StatusBar backgroundColor={"#489404"} />
                <Text
                    style={styles.textTitle}
                >Seja Bem Vindo!!</Text>

            </MotiView>
            <View
                style={{ top: 200 }}

            >
                <Animatable.View
                    animation="flipInY"
                    duration={5500}
                    iterationCount={'infinite'}
                >
                    <Image
                        style={styles.img}
                        source={Logo}
                    />
                </Animatable.View>
                <Text
                    style={styles.title}
                >Próxima</Text>
            </View>
            <View
                style={{ flex: 1, justifyContent: 'flex-end' }}
            >
                <Animatable.View
                    style={styles.subTitleContainer}
                    animation="flipInX" duration={2500}
                >
                    <Text
                        style={styles.subTitle}
                    >Substitua a prancheta, caneta e papel para gerenciar suas partidas de futebol.
                        Com ele, você:
                    </Text>

                    <View
                        style={{ top: 10 }}
                    >
                        <Text
                            style={{ fontStyle: 'italic', textAlign: 'center' }}
                        >Gerencia a Lista de Jogadores;</Text>
                        <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>Tenha o controle de gols e assistências;</Text>
                        <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>Altera a quantidade de jogadores nos times;</Text>
                        <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>Sorteie apenas os jogadores do banco de reservas.</Text>
                    </View>
                </Animatable.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 500
    },
    header: {
        height: 80,
        position: "absolute",
        backgroundColor: "#93dc4f",
        width: "100%",
        borderBottomEndRadius: 70,
        borderBottomStartRadius: 70
    },
    img: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    textTitle: {
        fontStyle: 'italic',
        top: 10,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitleContainer: {
        top: 200,
        justifyContent: 'center',
        height: 200,
        borderRadius: 9,
        width: '90%'
    },
    subTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    }

})