import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useJogadorContext } from "../../context/JogadoresContext";

export function ModalAddProxima({ handleClose }) {
  const { listaDeJogadores, setListaDeJogadores } = useJogadorContext();

  const [id, setId] = useState(25);
  const [nome, setNome] = useState("");
  const [novoJogador, setNovoJogador] = useState({
    id: id,
    jogador: "",
    gols: 0,
    assist: 0,
    selected: false,
  });

  const handleSalvar = () => {
    /* const addNovoJogador = {
      ...novoJogador,
      id: id,
      jogador: nome,
    };

    const novaListaDeJogadores = [...listaDeJogadores, addNovoJogador];
    setListaDeJogadores(novaListaDeJogadores); */
    // setId(id + 1);
    alert(id);
    setId((prevId) => prevId + 1);
    handleClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Digite um nome"
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

  input: {
    borderWidth: 1,
    width: "90%",
    fontSize: 15,
    padding: 10,
    borderRadius: 7,
    borderColor: "#20473c",
    // color: "#003b6b"
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
