import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

export function ModalEditarNome({ handleClose, handleEdit, nomeAtual, novoNome, setNovoNome }) {


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Alterar Nome do Jogador</Text>
                <TextInput
                    style={styles.input}
                    placeholder={nomeAtual}
                    value={novoNome != null ? novoNome : nomeAtual}
                    onChangeText={(text) => setNovoNome(text)}
                />

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={() => { handleClose(); setNovoNome(null) }}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#489404" }]}
                        onPress={() => { handleEdit(novoNome, setNovoNome); setNovoNome(null) }}
                    >
                        <Text style={[styles.buttonText, { color: "#fff" }]}>
                            Salvar Nome
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
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
    },
    text: {
        fontSize: 25,
        fontWeight: "bold",
        paddingBottom: 15,
        color: "#489404"
    },

    input: {
        borderWidth: 1,
        width: "90%",
        fontSize: 15,
        padding: 10,
        borderRadius: 7,
        borderColor: "#489404",
        textAlign: "center"
    },
    buttonArea: {
        flexDirection: "row",
        width: "90%",
        marginTop: 8,
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        width: "45%",
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
