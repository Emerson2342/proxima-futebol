import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, Alert } from 'react-native';
import { MotiView } from 'moti';
import { ModalAddProxima } from "../Modal";
import { useJogadorContext } from "../../context/JogadoresContext";
import { useReservaContext } from "../../context/ReservasContext";
import Icon from 'react-native-vector-icons/FontAwesome'



export default function ListadeJogadores() {
    const { listaDeJogadores, setListaDeJogadores } = useJogadorContext();
    const { listaDeReservas, setListaDeReservas } = useReservaContext();

    const [nome, setNome] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlayers, setSelectedPlayers] = useState([]);



    const handleCheckBox = (index) => {
        // Atualiza a lista de jogadores selecionados
        if (selectedPlayers.includes(index)) {
            // Remove o jogador da lista de jogadores selecionados
            setSelectedPlayers(selectedPlayers.filter(item => item !== index));
        } else {
            // Adiciona o jogador à lista de jogadores selecionados
            setSelectedPlayers([...selectedPlayers, index]);
        }
    };


    const moverParaReservas = () => {
        // Mover jogadores selecionados para a lista de reservas
        const jogadoresSelecionados = selectedPlayers.map(index => listaDeJogadores[index]);
        const novaListaDeReservas = [...listaDeReservas, ...jogadoresSelecionados];

        // Atualiza o estado de listaDeReservas
        setListaDeReservas(novaListaDeReservas);

        // Limpa a lista de jogadores selecionados
        setSelectedPlayers([]);
    };

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleChangeText = (novoNome) => {
        setNome(novoNome);
    };


    const handleSalvar = async () => {

        const novoJogador = [nome, 0, 0]
        const newList = [...listaDeJogadores, novoJogador];

        setListaDeJogadores(newList);
        setNome('');
        // Esconda o modal
        setModalVisible(false);
    };


    const handleEditarNome = async (index, novoNome) => {
        setListaDeJogadores((prevState) => {
            if (index >= 0 && index < prevState.length) {
                const newList = [...prevState];
                newList[index] = [novoNome, newList[index][1], newList[index][2]];
                return newList;
            } else {
                console.error('Índice de jogador inválido:', index);
                return prevState;
            }
        });
    }


    const handleConfirmar = (item, index, novoNome) => {
        Alert.alert(
            'Atenção',
            `Gostaria de alterar o nome do jogador ${item[0]} ou excluir ele da lista???`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Apagar Jogador', onPress: () => handleDelete(index) },
                { text: 'Editar Nome', onPress: () => handleEditarNome(index, novoNome) }
            ],
            { cancelable: false }
        );
    };

    const handleDelete = (index) => {
        // Cria uma cópia do array e remove o item na posição 'index'
        const novaLista = [...listaDeJogadores];
        novaLista.splice(index, 1);

        // Atualiza o estado com a nova lista sem o item excluído
        setListaDeJogadores(novaLista);
    };

    const renderItem = ({ item, index }) => (

        <MotiView
            from={{ rotateX: '-100deg', opacity: 0 }}
            animate={{ rotateX: '0deg', opacity: 1 }}
        >
            <TouchableOpacity
                onLongPress={() => handleConfirmar(item, index)}
                onPress={() => handleCheckBox(index)}
            >

                <View style={styles.jogadorContainer}>
                    <TouchableOpacity onPress={() => handleCheckBox(index)}>
                        <View style={styles.checkBox}>
                            {selectedPlayers.includes(index) && <Icon name="check" size={18} color="#003b6b" />}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.jogadorText}>{item[0]}</Text>
                </View>
            </TouchableOpacity>
        </MotiView>
    );

    return (
        < View style={styles.container}>
            <Text style={styles.textTitle}>Jogadores</Text>

            <FlatList style={styles.scrollView}
                data={listaDeJogadores}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={2} // Número de colunas
                columnWrapperStyle={{ justifyContent: 'space-between' }} // Espaçamento entre as colunas
            />


            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <ModalAddProxima
                    proxima={listaDeJogadores}
                    nome={nome}
                    handleSalvar={handleSalvar}
                    handleChangeText={handleChangeText}
                    handleClose={() => setModalVisible(false)}
                />
            </Modal>

            <View style={styles.buttonContainer}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={moverParaReservas} style={styles.inputButton}>
                        <Text style={styles.inputButtonText}>Adicionar para a reserva</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={handlePress} style={styles.inputButton}>
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
        borderColor: '#003b6b',
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