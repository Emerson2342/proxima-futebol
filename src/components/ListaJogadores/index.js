import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { MotiView } from "moti";
import { ModalAddProxima } from "../Modal";
import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";

export default function ListadeJogadores() {
  const {
    listaDeJogadores,
    alterarSelected,
    setListaDeJogadores,
    limparSelected,
  } = useJogadorContext();
  const { jogadoresReservas, setJogadoresReservas } =
    useJogadoresReservasContext();

  const handleSelect = (jogador) => {
    if (jogador !== null && jogador !== undefined) {
      alterarSelected(jogador, !jogador.selected);
    } else {
      console.error("Erro: jogador é null ou undefined.");
    }
  };

  const addParaReserva = () => {
    setJogadoresReservas((prevReserva) => {
      const jogadoresSelecionados = listaDeJogadores.filter(
        (jogador) => jogador && jogador.selected
      );

      const jogadoresNaoPresentes = jogadoresSelecionados.filter(
        (jogadorSelecionado) =>
          !prevReserva.some((j) => j.id === jogadorSelecionado.id)
      );

      return [...prevReserva, ...jogadoresNaoPresentes];
    });

    setListaDeJogadores((prevList) =>
      prevList.map((jogador) =>
        jogador && jogador.selected
          ? { ...jogador, selected: !jogador.selected }
          : jogador
      )
    );
  };

  const listaOrdenada = [...listaDeJogadores]
    .filter((item) => item !== null && item !== undefined)
    .sort((a, b) => a.jogador.localeCompare(b.jogador));

  const renderItem = ({ item, index }) => (
    <MotiView
      from={{ rotateX: "-100deg", opacity: 0 }}
      animate={{ rotateX: "0deg", opacity: 1 }}
    >
      <TouchableOpacity
        style={
          item.selected
            ? styles.jogadorContainerSelected
            : styles.jogadorContainer
        }
        onPress={() => handleSelect(item)}
      >
        <Text
          style={
            item.selected ? styles.jogadorTextSelected : styles.jogadorText
          }
        >
          {item.jogador}
        </Text>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Jogadores</Text>

      <FlatList
        style={styles.scrollView}
        data={listaOrdenada}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => addParaReserva()}
            style={styles.inputButton}
          >
            <Text style={styles.inputButtonText}>Adicionar para a reserva</Text>
          </TouchableOpacity>
        </View>
        <View on style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => alert(JSON.stringify(listaOrdenada, null, 2))}
            style={styles.inputButton}
          >
            <Text style={styles.inputButtonText}>Adicione um novo jogador</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    top: 30,
    maxHeight: 430,
  },
  textTitle: {
    fontSize: 40,
    textAlign: "center",
    flexWrap: "nowrap",
    width: "100%",
    fontWeight: "bold",
    color: "#fff",
  },
  jogadorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 180,
    height: 40,
    marginVertical: 7,
    borderColor: "#20473c",
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 7,
  },
  jogadorContainerSelected: {
    flexDirection: "row",
    alignItems: "center",
    width: 180,
    height: 40,
    marginVertical: 7,
    backgroundColor: "#20473c",
    borderRadius: 7,
    elevation: 3,
  },
  jogadorText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    flexWrap: "wrap",
    flex: 1,
  },
  jogadorTextSelected: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    flexWrap: "wrap",
    flex: 1,
  },

  inputContainer: {
    alignSelf: "center",
    top: 15,
    backgroundColor: "#3f8d65",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },

  container: {
    top: -70,
    marginLeft: 10,
    marginRight: 10,
  },
  inputButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    bottom: "auto",
  },
  buttonContainer: {
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "center",
    width: "100%",
  },
});
