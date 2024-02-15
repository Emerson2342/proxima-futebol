import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
import { color } from "react-native-elements/dist/helpers";
//import * as Clipboard from 'expo-clipboard';

export function ModalAddProxima({ handleSalvar, handleClose, nome, handleChangeText }) {


    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <TextInput
                    style={styles.input}
                    placeholder="Digite um nome"
                    value={nome}
                    onChangeText={handleChangeText}

                />


                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={() => handleClose()}>
                        <Text style={styles.buttonText} >Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: "#003b6b" }]} onPress={() => handleSalvar()}>
                        <Text style={[styles.buttonText, { color: "#fff" }]}>Salvar Próxima</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24,24,24,0.6)",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: "#fff",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },

    input: {
        borderWidth: 1,
        width: "90%",
        fontSize: 15,
        padding: 10,
        borderRadius: 7,
        borderColor: "#003b6b"
        // color: "#003b6b"
    },
    buttonArea: {
        flexDirection: "row",
        width: '90%',
        marginTop: 8,
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        width: '45%',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: "#003b6b"

    },
    buttonText: {
        color: "#003b6b",
        fontSize: 15,
        fontWeight: "bold",
    }
})