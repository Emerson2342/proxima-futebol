import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, Alert } from 'react-native';
import { MotiView } from 'moti';
import { ModalAddProxima } from "../Modal";
import { useJogadorContext } from "../../context/JogadoresContext";
import { MaterialCommunityIcons } from 'react-native-vector-icons'





export default function ListadeJogadores() {

    const { listaDeJogadores, setListaDeJogadores, alterarSelected, alterarReserva, limparSelected } = useJogadorContext();


    const [nome, setNome] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const listaOrdenada = [...listaDeJogadores];
    listaOrdenada.sort((a, b) => a.jogador.localeCompare(b.jogador));

    const handleSelect = (jogador) => {
        alterarSelected(jogador, !jogador.selected);
    };

    const renderItem = ({ item, index }) => (
        <MotiView
            from={{ rotateX: '-100deg', opacity: 0 }}
            animate={{ rotateX: '0deg', opacity: 1 }}
        >
            <TouchableOpacity
                onLongPress={() => handleConfirmar(item, index)}
            >
                <TouchableOpacity
                    style={styles.jogadorContainer}
                    onPress={() => {
                        handleSelect(item)
                    }}
                >

                    {item.selected ? (<MaterialCommunityIcons
                        name='checkbox-outline'
                        size={20}
                    />) : <MaterialCommunityIcons
                        name='checkbox-blank-outline'
                        size={20}
                    />}


                    <Text style={styles.jogadorText}>{item.jogador}</Text>
                </TouchableOpacity>

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


            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <ModalAddProxima
                    proxima={listaDeJogadores}
                    nome={nome}
                    // handleSalvar={handleSalvar}
                    // handleChangeText={handleChangeText}
                    handleClose={() => setModalVisible(false)}
                />
            </Modal>

            <View style={styles.buttonContainer}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        //</View> onPress={moverParaReservas} 
                        onPress={() => { alterarReserva(); limparSelected() }}
                        style={styles.inputButton}>
                        <Text style={styles.inputButtonText}>Adicionar para a reserva</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        // onPress={handlePress}
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