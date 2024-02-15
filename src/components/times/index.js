import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, StatusBar, FlatList, } from "react-native";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { MotiView, MotiText } from "moti";
import { useTimeContext } from "../../context/TimeContext";
//import { StatusBar } from "expo-status-bar";
import { useReservaContext } from "../../context/ReservasContext";
import { useJogadorContext } from "../../context/JogadoresContext";
import { useGolsContext } from "../../context/GolsContext";

export default function Times() {

    const { timeTitular1, timeTitular2, setTimeTitular1, setTimeTitular2 } = useTimeContext();
    const { listaDeReservas, setListaDeReservas } = useReservaContext();
    const { marcarGol } = useJogadorContext();
    const { marcarGol1, marcarGol2 } = useGolsContext();


    const adicionarJogador1 = (index) => {
        const primeiroJogador = listaDeReservas[0];

        if (typeof primeiroJogador !== 'undefined' && primeiroJogador !== '') {
            setTimeTitular1((prevState) => {
                const novoArray = [...prevState];

                // Verifica se a posição é vazia ou undefined
                if (typeof novoArray[index] === 'undefined' || novoArray[index] === '') {
                    // Substitui o valor na posição específica
                    novoArray[index] = primeiroJogador;

                    // Remove o jogador adicionado da lista de reservas
                    const novaLista = listaDeReservas.slice(1);
                    setListaDeReservas(novaLista);

                    console.log('Adicionou jogador no time 1: jogador', index + 1, primeiroJogador[0]);
                } else {
                    Alert.alert(
                        'Me ajuda aí pow',
                        'Tem q sair o carinha pra entrar outro né amigo??',
                        [{ text: 'ok' }],
                        { cancelable: false }
                    );
                }

                return novoArray;
            });
        } else {
            Alert.alert(
                'Tragédia',
                'Acabou os pernas de pau pra jogar',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }
    };


    const adicionarJogador2 = (index) => {

        const primeiroJogador = listaDeReservas[0];

        if (typeof primeiroJogador !== 'undefined' && primeiroJogador !== '') {
            setTimeTitular2((prevState) => {
                const novoArray = [...prevState];

                // Verifica se a posição é vazia ou undefined
                if (typeof novoArray[index] === 'undefined' || novoArray[index] === '') {
                    // Substitui o valor na posição específica
                    novoArray[index] = primeiroJogador;

                    // Remove o jogador adicionado da lista de reservas
                    const novaLista = listaDeReservas.slice(1);
                    setListaDeReservas(novaLista);

                    console.log('Adicionou jogador no time 2: jogador', index + 1, primeiroJogador[0]);
                } else {
                    Alert.alert(
                        'Me ajuda aí pow',
                        'Tem q sair o carinha pra entrar outro né amigo??',
                        [{ text: 'ok' }],
                        { cancelable: false }
                    );
                }

                return novoArray;
            });
        } else {
            Alert.alert(
                'Tragédia',
                'Acabou os pernas de pau pra jogar',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }
    };
    const removerJogadordoTime1 = (index) => {
        const jogadorRemovido = timeTitular1[index];
        // Adiciona o jogador removido de volta à listaDeReservas
        if (jogadorRemovido !== '') {
            setListaDeReservas([...listaDeReservas, jogadorRemovido]);

            // Deixa o lugar do jogador vazio no time titulares
            const novaListaTitulares = [...timeTitular1];
            novaListaTitulares[index] = '';
            setTimeTitular1(novaListaTitulares);
            console.log('Removeu jogador do time 1: jogador', index + 1, jogadorRemovido[0]);
        }
    }

    const removerJogadordoTime2 = (index) => {
        const jogadorRemovido = timeTitular2[index];
        // Adiciona o jogador removido de volta à listaDeReservas
        if (jogadorRemovido !== '') {
            setListaDeReservas([...listaDeReservas, jogadorRemovido]);

            // Deixa o lugar do jogador vazio no time titulares
            const novaListaTitulares = [...timeTitular2];
            novaListaTitulares[index] = '';
            setTimeTitular2(novaListaTitulares);
            console.log('Removeu jogador do time 2: jogador', index + 2, jogadorRemovido[0]);
        }
    }



    /* ************************************************************************* */
    const renderItem1 = ({ item, index }) => (
        <MotiView
            from={{
                translateY: -300,
                opacity: 0
            }}
            animate={{
                translateY: 0,
                opacity: 1,
            }}
        >
            <View>
                <View >
                    <View style={styles.jogadorContainer}>
                        <MotiText
                            from={{
                                translateX: -300
                            }}
                            animate={{
                                translateX: 0
                            }}
                            transition={{

                                duration: 3000,
                                delay: 800
                            }}
                            style={styles.jogadorText}>{item[0]}</MotiText>
                    </View>
                </View>

                <View >
                    <View style={styles.icon}>
                        <TouchableOpacity
                            // onPress={() => marcarGol(index, timeTitular1)}
                            onPress={marcarGol1}

                            style={{ flex: 1, alignItems: 'center' }} >
                            <FontAwesome
                                name="soccer-ball-o"
                                size={25}
                                color={'#127066'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1, alignItems: 'center' }}
                            onPress={() => adicionarJogador1(index)}
                        >
                            <FontAwesome
                                name="arrow-up"
                                size={23}
                                color={'#32CD32'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, alignItems: 'left' }}
                            onPress={() => removerJogadordoTime1(index)}
                        >
                            <FontAwesome
                                name="arrow-down"
                                size={23}
                                color={'#FF0000'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </MotiView>
    );


    /* ************************************************************************* */
    const renderItem2 = ({ item, index }) => (
        <View>
            <View >
                <MotiView
                    from={{
                        translateY: 300,
                        opacity: 0
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1,
                    }}
                >
                    <View style={styles.jogadorContainer}>
                        <MotiText
                            from={{
                                translateX: 300
                            }}
                            animate={{
                                translateX: 0
                            }}
                            transition={{
                                duration: 3000,
                                delay: 800
                            }}
                            style={styles.jogadorText}>{item[0]}</MotiText>
                    </View>
                </MotiView>
            </View>
            <View >
                <View style={styles.icon}>
                    <TouchableOpacity
                        //onPress={() => marcarGol(index, timeTitular2)}
                        onPress={marcarGol2}
                        style={{ flex: 1, alignItems: 'center' }} >
                        <FontAwesome
                            name="soccer-ball-o"
                            size={25}
                            color={'#127066'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() => adicionarJogador2(index)}
                    >
                        <FontAwesome
                            name="arrow-up"
                            size={23}
                            color={'#32CD32'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'left' }}
                        onPress={() => removerJogadordoTime2(index)}
                    >
                        <FontAwesome
                            name="arrow-down"
                            size={23}
                            color={'#FF0000'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.listContainer}>
            <StatusBar style="light"
                backgroundColor="#003b6b"

            />

            <FlatList
                data={timeTitular1}
                renderItem={renderItem1}
                keyExtractor={(item, index) => `${index}-${timeTitular1.length}`}
                numColumns={1} // Número de colunas
            // columnWrapperStyle={{ justifyContent: 'space-between' }} // Espaçamento entre as colunas
            />

            <FlatList

                data={timeTitular2}
                renderItem={renderItem2}
                keyExtractor={(item, index) => `${index}-${timeTitular2.length}`}
                numColumns={1} // Número de colunas
            //   columnWrapperStyle={{ justifyContent: 'space-between' }} // Espaçamento entre as colunas
            />
        </View>
    );
};


const styles = StyleSheet.create({
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
        backgroundColor: "#fff",
        borderRadius: 7,
        elevation: 15
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold'
    },

    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: -10,
        marginTop: 15
    }
})