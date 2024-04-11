import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useJogadorContext } from "../../context/JogadoresContext";

export default function ModalConfirmarZerar({ handleClose }) {

  const { listaDeJogadores, setListaDeJogadores } = useJogadorContext();


  function resetarArtilharia() {
    setListaDeJogadores(prevLista => {
      return prevLista.map(jogador => ({
        ...jogador, gols: 0, assist: 0
      }))
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Deseja realmente zerar os gols e assistências?</Text>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button}
            onPress={() => handleClose()}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#489404" }]}
            onPress={() => {
              resetarArtilharia();
              handleClose()
            }}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              Zerar Artilharia
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.8)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  buttonText: {
    color: "#20473c",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 7,
    marginVertical: 5,
    padding: 5,
    width: "90%",
    borderWidth: 1,
    borderColor: '#93dc4f'
  },
  buttonArea: {
    width: "100%",
  },
});
