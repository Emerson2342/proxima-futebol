import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { ModalAddProxima } from "../Modal/ModalAddProxima";
import { ModalEditarNome } from "../Modal/ModalEditarNome";
import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";
import { useIdentificadorContext } from "../../context/IdentificadorContext";

export default function ListadeJogadores() {
  const { listaDeJogadores, alterarSelected, setListaDeJogadores } =
    useJogadorContext();
  const { setJogadoresReservas } = useJogadoresReservasContext();

  const { identificador, setIdentificador } = useIdentificadorContext();

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalNomeVisible, setModalNomeVisible] = useState(false);
  const [idParaEditar, setIdParaEditar] = useState(null);
  const [nomeParaEditar, setNomeParaEditar] = useState("");

  const [nome, setNome] = useState("");
  const [novoNome, setNovoNome] = useState(null);
  const [novoJogador, setNovoJogador] = useState({
    id: identificador,
    jogador: "",
    gols: 0,
    assist: 0,
    selected: false,
  });

  const handleSalvar = () => {
    const novoJogadorAtualizado = {
      ...novoJogador,
      id: identificador,
      jogador: nome,
    };

    const novaListaDeJogadores = [...listaDeJogadores, novoJogadorAtualizado];
    setListaDeJogadores(novaListaDeJogadores);
    setIdentificador((prevId) => prevId + 1);
    setModalAddVisible(false);
    setNome("");
  };

  const handleConfirmar = (id, jogador) => {
    setIdParaEditar(id);
    setNomeParaEditar(jogador);
    Alert.alert(
      "Jogador",
      `${jogador}`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar Jogador", onPress: () => handleDelete(id) },
        { text: "Editar nome", onPress: () => setModalNomeVisible(true) },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = (id) => {
    const indexToDelete = listaDeJogadores.findIndex((item) => item.id === id);

    if (indexToDelete !== -1) {
      const novaLista = [...listaDeJogadores];
      novaLista.splice(indexToDelete, 1);
      setListaDeJogadores(novaLista);
    } else {
      Alert.alert("ID não encontrado na Lista de Jogadores!");
    }
  };

  const handleEdit = (id, novoNome) => {
    const indexToEdit = listaDeJogadores.findIndex((item) => item.id === id);
    if (indexToEdit !== -1) {
      const novaLista = [...listaDeJogadores];
      novaLista[indexToEdit] = {
        ...novaLista[indexToEdit],
        jogador: novoNome,
      };
      setListaDeJogadores(novaLista);
      setModalNomeVisible(false);
    }
  };
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
      if (jogadoresSelecionados <= 0) {
        Alert.alert("", "Nenhum jogador selecionado");
      }
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
    <Animatable.View animation="flipInX" duration={1500}>
      <TouchableOpacity
        style={
          item.selected
            ? [styles.jogadorContainer, { backgroundColor: "#ffa200" }]
            : styles.jogadorContainer
        }
        onPress={() => handleSelect(item)}
        onLongPress={() => handleConfirmar(item.id, item.jogador)}
      >
        <Text
          style={
            item.selected
              ? [styles.jogadorText, { color: "#000" }]
              : styles.jogadorText
          }
        >
          {item.jogador}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          onLongPress={() => alert(JSON.stringify(listaDeJogadores, null, 2))}
          style={styles.textTitle}
        >
          Jogadores
        </Text>
      </View>

      <FlatList
        style={styles.scrollView}
        data={listaOrdenada}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => addParaReserva()}
          style={styles.button}
        >
          <Text style={styles.textButton}>Enviar para a reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalAddVisible(true)}
          style={styles.button}
        >
          <Text style={styles.textButton}>Adicione um novo jogador</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalAddVisible} transparent={true} animationType="slide">
        <ModalAddProxima
          nome={nome}
          setNome={setNome}
          handleSalvar={() => handleSalvar()}
          handleClose={() => setModalAddVisible(false)}
        />
      </Modal>
      <Modal
        visible={modalNomeVisible}
        transparent={true}
        animationType="slide"
      >
        <ModalEditarNome
          handleEdit={() => handleEdit(idParaEditar, novoNome, setNovoNome)}
          handleClose={() => setModalNomeVisible(false)}
          novoNome={novoNome}
          setNovoNome={setNovoNome}
          nomeAtual={nomeParaEditar}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    top: 60,
  },
  titleContainer: {
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    height: 70,
    justifyContent: "center",
    borderRadius: 9,
  },
  scrollView: {
    marginTop: 20,
    height: 400,
    paddingLeft: 7,
    paddingRight: 7,
  },
  jogadorText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    flexWrap: "wrap",
    flex: 1,
  },
  textTitle: {
    fontSize: 30,
    textAlign: "center",
    flexWrap: "nowrap",
    width: "100%",
    fontWeight: "bold",
    color: "#20473c",
  },
  jogadorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 180,
    height: 40,
    marginVertical: 5,
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 5,
  },

  jogadorText: {
    color: "#20473c",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    flexWrap: "wrap",
    flex: 1,
  },

  button: {
    alignSelf: "center",
    backgroundColor: "#93dc4f",
    borderRadius: 7,
    marginVertical: 5,
    padding: 5,
    width: "90%",
  },
  textButton: {
    color: "#20473c",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 50,
  },
});
