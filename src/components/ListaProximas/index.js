import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import { MotiView } from 'moti';
import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";


export default function ListaProximas() {



    const { listaDeJogadores, LimparReservaJogador } = useJogadorContext();

    const { jogadoresReservas, setJogadoresReservas } = useJogadoresReservasContext();


    const misturarReservas = () => {
        setJogadoresReservas((prevReserva) => {
            const copiaReservas = [...prevReserva];
            copiaReservas.sort(() => Math.random() - 0.5);
            return copiaReservas;
        });
    }


    const handleConfirmar = (item, index) => {
        Alert.alert(
            'Confirmação',
            `Tem certeza que deseja excluir ${item[0]} da lista de próximas?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => handleDelete(index) },
            ],
            { cancelable: false }
        );
    };
    const handleConfirmarTodos = () => {
        Alert.alert(
            '',
            `Tem certeza que deseja limpar a lista de próximas?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => setJogadoresReservas([]) },
            ],
            { cancelable: false }
        );

    };

    const handleDelete = (index) => {
        jogadoresReservas.splice(index, 1);
        setJogadoresReservas([...jogadoresReservas]);
    };



    const renderItem = ({ item, index }) => (
        <MotiView
            from={{
                rotateX: '-100deg',
                opacity: 0
            }}
            animate={{
                rotateX: '0deg',
                opacity: 1
            }}
        >
            <TouchableOpacity onLongPress={() => handleConfirmar(item, index)}>
                <View style={styles.jogadorContainer}>
                    <Text style={styles.jogadorText}>{item.jogador}</Text>
                </View>
            </TouchableOpacity>
        </MotiView>
    );

    return (
        < View >
            <Text style={styles.textTitle}> Banco de Reservas</Text>
            <ImageBackground
                style={styles.imagemCampo}
                source={require('../../../assets/reservas.png')}
            ></ImageBackground>

            <FlatList
                style={styles.scrollView}
                data={jogadoresReservas}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.inputButton}
                        onLongPress={() => misturarReservas()}
                    >
                        <Text style={styles.inputButtonText}>Segure Para Misturar</Text>
                    </TouchableOpacity></View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.inputButton} onPress={handleConfirmarTodos}>
                        <Text style={styles.inputButtonText}>Limpar Próximas</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    scrollView: {
        top: -35,
        maxHeight: 420,
        paddingLeft: 7,
        paddingRight: 7
    },
    textTitle: {
        top: -80,
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
        flexWrap: 'wrap'
    },
    jogadorContainer: {
        justifyContent: 'center',
        width: 180,
        height: 45,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#ffff",
        borderRadius: 7,
        elevation: 9
    },
    inputContainer: {
        backgroundColor: "#003b6b",
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        width: '100%',
    },
    inputButton: {
        alignItems: 'center',
    },
    inputButtonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        bottom: 'auto'
    },
    container: {
        position: 'absolute',
        paddingLeft: 20,
        paddingRight: 20,
        top: 450,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%'
    },

})


''