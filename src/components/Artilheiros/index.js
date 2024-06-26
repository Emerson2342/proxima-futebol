import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from "react-native";
import { useJogadorContext } from "../../context/JogadoresContext";
import ModalConfirmarZerar from "../Modal/ModalConfirmarZerar";


export default function Artilheiros() {
  const { listaDeJogadores } = useJogadorContext();

  const [modalVisible, setModalVisible] = useState(false);

  const gols = listaDeJogadores
    .filter((item) => item !== null)
    .sort((a, b) => {
      if (b.gols !== a.gols) {
        return b.gols - a.gols;
      } else if (b.assist !== a.assist) {
        return b.assist - a.assist;
      } else {
        return a.jogador.localeCompare(b.jogador);
      }
    });

  const renderItemGols = ({ item, index }) => {
    const ordem = index + 1;
    return (
      <View style={styles.listContainer}>
        <View style={styles.itemOrdem}>
          <Text
            style={{
              color: "#20473c",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {ordem}-
          </Text>
        </View>
        <View style={styles.itemJogador}>
          <Text style={styles.listItem}>{item.jogador}</Text>
        </View>
        <View style={styles.itemGol}>
          <Text style={[styles.listItem, { color: "#20473c" }]}>
            {item.gols}
          </Text>
        </View>
        <View style={styles.itemAssist}>
          <Text style={[styles.listItem, { color: "#20473c" }]}>
            {item.assist}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titulo}>Gols e Assistências</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.cabecalho}>
          <View style={styles.jogador}>
            <Text style={[styles.textCabec, { textAlign: "right" }]}>
              Jogador
            </Text>
          </View>
          <View style={styles.gols}>
            <Text style={[styles.textCabec, { textAlign: "right" }]}>Gols</Text>
          </View>
          <View style={styles.assist}>
            <Text style={[styles.textCabec, { textAlign: "center" }]}>
              Assistências
            </Text>
          </View>
        </View>
        <FlatList
          data={gols}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : `empty_${index}`
          }
          renderItem={renderItemGols}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.inputButtonText}>Zerar Contador</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
      >
        <ModalConfirmarZerar
          handleClose={() => setModalVisible(false)}
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
  cabecalho: {
    marginRight: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  jogador: {
    width: "33%",
  },
  gols: {
    width: "25%",
  },
  assist: {
    width: "40%",
  },
  textCabec: {
    color: "#20473c",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  column: {
    height: 480,
    alignItems: "center",
    marginBottom: 25,
  },
  listContainer: {
    paddingLeft: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemOrdem: {
    textAlign: "center",
    width: "7%",
  },
  itemJogador: {
    textAlign: "center",
    width: "40%",
  },
  itemGol: {
    textAlign: "center",
    width: "25%",
  },
  itemAssist: {
    textAlign: "center",
    width: "30%",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#20473c",
    textAlign: "center",
  },
  listIndex: {
    width: "30%",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  listItem: {
    color: "#20473c",
    fontSize: 15,
    textAlign: "left",
  },
  inputButtonText: {
    color: "#20473c",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#93dc4f",
    borderRadius: 7,
    marginVertical: 5,
    padding: 5,
    width: "90%",
  },
  buttonContainer: {
    width: "100%",
    top: 20
  },
});
