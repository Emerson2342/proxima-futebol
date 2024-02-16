import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, } from "react-native";
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import { MotiView, MotiText } from "moti";

import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";
import { useTimeContext } from '../../context/TimeContext'

export default function Times() {

    const { timeTitular1, setTimeTitular1, timeTitular2, setTimeTitular2 } = useTimeContext();



    const [timeTitular11, setTimeTitular11] =
        useState([
            { id: 1, jogador: 'Teste1', gols: 0, assist: 0, selected: false },
            { id: 2, jogador: 'Teste2', gols: 0, assist: 0, selected: false },
            { id: 3, jogador: 'Teste3', gols: 0, assist: 0, selected: false },
            { id: 4, jogador: 'Teste4', gols: 0, assist: 0, selected: false },
            { id: 5, jogador: 'Teste5', gols: 0, assist: 0, selected: false }]);
    const [timeTitular22, setTimeTitular22] =
        useState([
            { id: 1, jogador: 'Teste1', gols: 0, assist: 0, selected: false },
            { id: 2, jogador: 'Teste2', gols: 0, assist: 0, selected: false },
            { id: 3, jogador: 'Teste3', gols: 0, assist: 0, selected: false },
            { id: 4, jogador: 'Teste4', gols: 0, assist: 0, selected: false },
            { id: 5, jogador: 'Teste5', gols: 0, assist: 0, selected: false }]);

    const renderItem = ({ item }) => (
        <View style={styles.jogadorContainer}>
            <View style={styles.jogadorContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.jogador}</Text>
                </View>
                <View style={styles.icones}>
                    <TouchableOpacity
                        onPress={() => alert("gol")}>
                        <FontAwesome name="soccer-ball-o" size={17} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => alert("assistência")}>
                        <Image
                            style={{ objectFit: "contain", height: 20 }}
                            source={require('../../../assets/assist.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => alert("entrou")}>
                        <Entypo name="arrow-up" color={"green"} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => alert("saiu")}>

                        <Entypo name="arrow-down" color={"red"} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>

                <FlatList
                    data={timeTitular11}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                /></View>
            <View style={styles.timeContainer}>
                <FlatList
                    data={timeTitular11}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />

            </View>
        </View>

    )

};


const styles = StyleSheet.create({
    container: {
        top: 130,
        flexDirection: 'row',
        justifyContent: "space-around",

    },
    timeContainer: {
        alignSelf: "center",
        width: "45%",
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 5

    },
    textContainer: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        elevation: 9,
        padding: 3,
        borderColor: "#fff"
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    icones: {
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 3
    }
})