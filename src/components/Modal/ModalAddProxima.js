import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export function ModalAddProxima({ handleClose, handleSalvar, nome, setNome }) {


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Adicionar Novo Jogador</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do jogador"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={() => handleClose()}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#20473c" }]}
            onPress={() => handleSalvar()}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              Salvar Próxima
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
    color: "#20473c"
  },

  input: {
    borderWidth: 1,
    width: "90%",
    fontSize: 15,
    padding: 10,
    borderRadius: 7,
    borderColor: "#20473c",
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
    borderColor: "#20473c",
  },
  buttonText: {
    color: "#20473c",
    fontSize: 15,
    fontWeight: "bold",
  },
});
