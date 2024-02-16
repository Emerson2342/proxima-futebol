import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, Alert } from 'react-native';
import { MotiView } from 'moti';
import { ModalAddProxima } from "../Modal";
import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";
import { MaterialCommunityIcons } from 'react-native-vector-icons'




export default function ListadeJogadores() {

    const { listaDeJogadores, alterarSelected, setListaDeJogadores, limparSelected } = useJogadorContext();
    const { jogadoresReservas, setJogadoresReservas } = useJogadoresReservasContext();


    const handleSelect = (jogador) => {
        // Inverte o valor da propriedade selected
        alterarSelected(jogador, !jogador.selected);
    };


    const addParaReserva = () => {
        setJogadoresReservas((prevReserva) => {
            const jogadoresSelecionados = listaDeJogadores.filter((jogador) => jogador.selected);

            // Verifica se cada jogador selecionado não está presente na lista de reservas
            const jogadoresNaoPresentes = jogadoresSelecionados.filter(
                (jogadorSelecionado) => !prevReserva.some((j) => j.id === jogadorSelecionado.id)
            );

            return [...prevReserva, ...jogadoresNaoPresentes];
        });

        setListaDeJogadores((prevList) =>
            prevList.map((jogador) =>
                jogador.selected ? { ...jogador, selected: !jogador.selected } : jogador
            )
        );
    };



    const listaOrdenada = [...listaDeJogadores];
    listaOrdenada.sort((a, b) => a.jogador.localeCompare(b.jogador));



    const renderItem = ({ item, index }) => (
        <MotiView
            from={{ rotateX: '-100deg', opacity: 0 }}
            animate={{ rotateX: '0deg', opacity: 1 }}
        >
            <TouchableOpacity
                style={styles.jogadorContainer}
                onPress={() => handleSelect(item)}
            >

                {item.selected ? (<MaterialCommunityIcons
                    name='checkbox-outline'
                    size={20}
                />) : <MaterialCommunityIcons
                    name='checkbox-blank-outline'
                    size={20}
                />}


                <Text style={styles.jogadorText}>{item.jogador}</Text>


            </TouchableOpacity >
        </MotiView >

    );

    return (
        < View style={styles.container}>
            <Text style={styles.textTitle}>Jogadores</Text>

            <FlatList style={styles.scrollView}
                data={listaOrdenada}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={2} // Número de colunas
                columnWrapperStyle={{ justifyContent: 'space-between' }} // Espaçamento entre as colunas
            />


            <View style={styles.buttonContainer}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        onPress={() => addParaReserva()}
                        style={styles.inputButton}>
                        <Text style={styles.inputButtonText}>Adicionar para a reserva</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        onPress={() => alert(JSON.stringify(listaOrdenada, null, 2))}
                        style={styles.inputButton}>
                        <Text style={styles.inputButtonText}>Adicione um novo jogador</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View >

    );
}
const styles = StyleSheet.create({
    scrollView: {
        top: 30,
        maxHeight: 430
    },
    textTitle: {
        fontSize: 40,
        textAlign: 'center',
        flexWrap: 'nowrap',
        width: '100%',
        fontWeight: 'bold',
        color: '#fff'
    },

    jogadorText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        flexWrap: 'wrap',
        flex: 1,
    },
    checkBox: {
        marginLeft: 5,
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 2,

        justifyContent: 'center',
        alignItems: 'center'
    },
    jogadorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 180,
        height: 50,
        marginVertical: 7,
        backgroundColor: "#fff",
        borderRadius: 7,
        elevation: 7
    },

    inputContainer: {
        top: 15,
        backgroundColor: "#003b6b",
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        width: '100%',
    },
    inputButton: {
        alignItems: 'center',
    },
    container: {
        top: -80,
        marginLeft: 10,
        marginRight: 10
    },
    inputButtonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        bottom: 'auto'
    },
    buttonContainer: {
        position: 'absolute',
        paddingLeft: 10,
        paddingRight: 10,
        top: 520,
        justifyContent: 'center',
        width: '100%',

    }
})