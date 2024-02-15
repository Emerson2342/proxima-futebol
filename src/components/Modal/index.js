import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
//import * as Clipboard from 'expo-clipboard';

export function ModalAddProxima({ handleSalvar, handleClose, nome, handleChangeText }) {


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Pressable style={styles.innerPassword} >
                    <TextInput
                        placeholder="Digite um nome"
                        value={nome}
                        onChangeText={handleChangeText}
                        style={{ borderBottomWidth: 1, marginBottom: 16 }}
                    />
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText} >Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSalvar}>
                        <Text style={styles.buttonSaveText}>Salvar Próxima</Text>
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
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 24
    },
    innerPassword: {
        backgroundColor: "#ffff",
        width: "90%",
        padding: 14,
        borderRadius: 10
    },
    text: {
        color: "#000",
        textAlign: "center"
    },
    buttonArea: {
        flexDirection: "row",
        width: '90%',
        marginTop: 8,
        alignItems: "center",
        justifyContent: "space-between"
    },
    button: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 14,
        marginTop: 14,
        padding: 8,
        backgroundColor: '#d5fdcf',
        borderRadius: 10,
    },
    buttonSave: {
        backgroundColor: "#127066",
        borderRadius: 10,
    },
    buttonSaveText: {
        color: "#fff",
        fontWeight: "bold"
    }
})