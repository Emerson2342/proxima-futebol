import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, } from "react-native";
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import { MotiView, MotiText } from "moti";

import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";
import { useTimeContext } from '../../context/TimeContext'

export default function Times() {

    const { timeTitular1, setTimeTitular1, timeTitular2, setTimeTitular2 } = useTimeContext();
    const { jogadoresReservas, setJogadoresReservas } = useJogadoresReservasContext();
    const { listaDeJogadores, setListaDeJogadores } = useJogadorContext();



    const [timeTitular11, setTimeTitular11] =
        useState([
            { id: null, jogador: '', gols: 0, assist: 0, selected: false },
            { id: null, jogador: '', gols: 0, assist: 0, selected: false },
            { id: null, jogador: '', gols: 0, assist: 0, selected: false },
            { id: null, jogador: '', gols: 0, assist: 0, selected: false },
            { id: null, jogador: '', gols: 0, assist: 0, selected: false }]);
    const [timeTitular22, setTimeTitular22] =
        useState([
            { id: null, jogador: '', gols: 0, assist: 0, selected: false },
            { id: null, jogador: '', gols: 0, assist: 0, selected: false },
            { id: null, jogador: '', gols: 0, assist: 0, selected: false },
            { id: null, jogador: '', gols: 0, assist: 0, selected: false },
            { id: null, jogador: '', gols: 0, assist: 0, selected: false }]);



    const removerJogador1 = (index) => {

        const removedItem = timeTitular11[index];
        if (removedItem.id !== null) {
            timeTitular11[index] = { id: null, jogador: '', gols: 0, assist: 0, selected: false };
            setJogadoresReservas((prevLista) => prevLista.concat(removedItem));
            setTimeTitular11([...timeTitular11]);
        } else {
            alert("Posição está vazia!")
        }
    };

    const removerJogador2 = (index) => {
        const removedItem = timeTitular22[index];
        if (removedItem.id !== null) {
            timeTitular22[index] = { id: null, jogador: '', gols: 0, assist: 0, selected: false };
            setJogadoresReservas((prevLista) => prevLista.concat(removedItem));
            setTimeTitular22([...timeTitular22]);
        } else {
            alert("Posição está vazia!")
        }
    };

    const adicionarJogador1 = (index) => {
        const addItem = timeTitular11[index];
        if (addItem.id == null) {
            if (jogadoresReservas.length > 0) {
                const jogadorReserva = jogadoresReservas[0];
                timeTitular11[index] = jogadorReserva;
                setJogadoresReservas((prevReservas) => prevReservas.slice(1));
                setTimeTitular11([...timeTitular11]);
            } else {
                alert("Não há mais jogadores na reserva!")
            }
        } else
            alert("Jogador precisa sair antes!")
    };

    const adicionarJogador2 = (index) => {
        const addItem = timeTitular22[index];
        if (addItem.id == null) {
            if (jogadoresReservas.length > 0) {
                const jogadorReserva = jogadoresReservas[0];
                timeTitular22[index] = jogadorReserva;
                setJogadoresReservas((prevReservas) => prevReservas.slice(1));
                setTimeTitular22([...timeTitular22]);
            } else {
                alert("Não há mais jogadores na reserva!")
            }
        } else
            alert("Jogador precisa sair antes!")
    };


    const gol1 = (index) => {
        const jogador = timeTitular11[index];
        if (jogador && jogador.id !== null && jogador.id !== undefined) {
            const jogadorNaLista = listaDeJogadores.find((j) => j && j.id === jogador.id);
            if (jogadorNaLista) {
                jogadorNaLista.gols += 1;
                setListaDeJogadores([...listaDeJogadores]);
            } else {
                alert("Jogador não encontrado na listaDeJogadores!");
            }
        } else {
            alert("Jogador inválido ou sem ID!");
        }
    };

    const assist1 = (index) => {
        const jogador = timeTitular11[index];
        if (jogador && jogador.id !== null && jogador.id !== undefined) {
            const jogadorNaLista = listaDeJogadores.find((j) => j && j.id === jogador.id);
            if (jogadorNaLista) {
                jogadorNaLista.assist += 1;
                setListaDeJogadores([...listaDeJogadores]);
            } else {
                alert("Jogador não encontrado na listaDeJogadores!");
            }
        } else {
            alert("Jogador inválido ou sem ID!");
        }
    };

    const gol2 = (index) => {
        const jogador = timeTitular22[index];
        if (jogador && jogador.id !== null && jogador.id !== undefined) {
            const jogadorNaLista = listaDeJogadores.find((j) => j && j.id === jogador.id);
            if (jogadorNaLista) {
                jogadorNaLista.gols += 1;
                setListaDeJogadores([...listaDeJogadores]);
            } else {
                alert("Jogador não encontrado na listaDeJogadores!");
            }
        } else {
            alert("Jogador inválido ou sem ID!");
        }
    };

    const assist2 = (index) => {
        const jogador = timeTitular22[index];
        if (jogador && jogador.id !== null && jogador.id !== undefined) {
            const jogadorNaLista = listaDeJogadores.find((j) => j && j.id === jogador.id);
            if (jogadorNaLista) {
                jogadorNaLista.assist += 1;
                setListaDeJogadores([...listaDeJogadores]);
            } else {
                alert("Jogador não encontrado na listaDeJogadores!")
            }
        } else {
            alert("Jogador inválido ou sem ID!");
        }
    };


    const renderItem1 = ({ item, index }) => (
        <View style={styles.jogadorContainer}>
            <View style={styles.jogadorContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.jogador}</Text>
                </View>
                <View style={styles.icones}>
                    <TouchableOpacity
                        onPress={() => gol1(index)}>
                        <FontAwesome name="soccer-ball-o" size={17} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => assist1(index)}>
                        <Image
                            style={{ objectFit: "contain", height: 20 }}
                            source={require('../../../assets/assist.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => adicionarJogador1(index)}>
                        <Entypo name="arrow-up" color={"green"} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => removerJogador1(index)}>

                        <Entypo name="arrow-down" color={"red"} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    const renderItem2 = ({ item, index }) => (
        <View style={styles.jogadorContainer}>
            <View style={styles.jogadorContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.jogador}</Text>
                </View>
                <View style={styles.icones}>
                    <TouchableOpacity
                        onPress={() => gol2(index)}>
                        <FontAwesome name="soccer-ball-o" size={17} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => assist2(index)}>
                        <Image
                            style={{ objectFit: "contain", height: 20 }}
                            source={require('../../../assets/assist.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => adicionarJogador2(index)}>
                        <Entypo name="arrow-up" color={"green"} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => removerJogador2(index)}>

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
                    renderItem={renderItem1}
                    keyExtractor={(item, index) => (item.id ? item.id.toString() : `empty_${index}`)}
                /></View>
            <View style={styles.timeContainer}>
                <FlatList
                    data={timeTitular22}
                    renderItem={renderItem2}
                    keyExtractor={(item, index) => (item.id ? item.id.toString() : `empty_${index}`)}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        top: 50,
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