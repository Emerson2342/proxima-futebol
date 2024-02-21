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
import { MotiView } from "moti";
import { ModalAddProxima } from "../Modal";
import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";
import { useIdentificadorContext } from "../../context/IdentificadorContext";

export default function ListadeJogadores() {
  const { listaDeJogadores, alterarSelected, setListaDeJogadores } =
    useJogadorContext();
  const { setJogadoresReservas } = useJogadoresReservasContext();

  const { identificador, setIdentificador } = useIdentificadorContext();

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [nome, setNome] = useState("");
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
    alert(JSON.stringify(novoJogadorAtualizado, null, 2));
    setNome("");
  };

  const handleConfirmar = (id, jogador) => {
    Alert.alert(
      "",
      `Deseja excluir ${jogador} da lista de jogadores?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => handleDelete(id) },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = (id) => {
    console.log("ID recebido:", id);

    const indexToDelete = listaDeJogadores.findIndex((item) => item.id === id);
    console.log("Index do item a ser deletado:", indexToDelete);

    if (indexToDelete !== -1) {
      const novaLista = [...listaDeJogadores];
      novaLista.splice(indexToDelete, 1);
      setListaDeJogadores(novaLista);
    } else {
      console.log("ID não encontrado na listaDeJogadores.");
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
        onLongPress={() => handleConfirmar(item.id, item.jogador)}
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
      <Text
        onPress={() => alert(JSON.stringify(listaDeJogadores, null, 2))}
        style={styles.textTitle}
      >
        Jogadores
      </Text>

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
          style={styles.inputContainer}
        >
          <Text style={styles.inputButtonText}>Enviar para a reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalAddVisible(true)}
          style={styles.inputContainer}
        >
          <Text style={styles.inputButtonText}>Adicione um novo jogador</Text>
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
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    top: 30,
    height: 460,
    paddingLeft: 7,
    paddingRight: 7,
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
    backgroundColor: "#20473c",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    width: "90%",
  },

  container: {
    top: -85,
    // marginLeft: 10,
    //marginRight: 10,
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
    // paddingLeft: 5,
    //paddingRight: 5,
    justifyContent: "center",
    width: "100%",
  },
});
