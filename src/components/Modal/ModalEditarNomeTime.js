import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { usePlacarContext } from "../../context/PlacarContext";


export function ModalEditarNomeTime({ handleClose, indexToEdit }) {

    const { placar, setPlacar } = usePlacarContext();


    const nomeAtual = placar.find((time) => time.id === indexToEdit);

    const [novoNome, setNovoNome] = useState(
        { time: nomeAtual ? nomeAtual.time : "" }
    );

    const handleSalvar = () => {
        if (indexToEdit == 1) {
            setPlacar((prevPlacar) => {
                const novoPlacar = [...prevPlacar];
                novoPlacar[0] = { ...novoPlacar[0], time: novoNome.time }
                return novoPlacar;
            })
        } if (indexToEdit == 2) {
            setPlacar((prevPlacar) => {
                const novoPlacar = [...prevPlacar];
                novoPlacar[1] = { ...novoPlacar[1], time: novoNome.time }
                return novoPlacar;
            })
        }

        handleClose();
    };


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Alterar Nome do Time</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do time"
                    value={novoNome.time}
                    onChangeText={(text) =>
                        setNovoNome({
                            ...novoNome, time: text
                        })}
                />

                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleClose()}
                    >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#489404" }]}
                        onPress={() => handleSalvar()}
                    >
                        <Text style={[styles.buttonText, { color: "#fff" }]}>
                            Alterar Nome
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24,24,24,0.6)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        backgroundColor: "#fff",
        width: "95%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 15,
        color: "#489404"
    },
    input: {
        color: "#20473c",
        width: "90%",
        fontSize: 20,
        fontWeight: "bold",
        borderWidth: 1,
        padding: 5,
        borderRadius: 9,
        textAlign: "center",
        borderColor: '#489404'
    },
    buttonArea: {
        flexDirection: "row",
        width: "90%",
        marginTop: 8,
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        width: "48%",
        alignItems: "center",
        marginTop: 10,
        padding: 10,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: "#489404",
    },
    buttonText: {
        color: "#489404",
        fontSize: 15,
        fontWeight: "bold",
    },
});
