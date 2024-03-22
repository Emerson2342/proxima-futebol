import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useJogadorContext } from "../../context/JogadoresContext";

export default function Artilheiros() {
  const { listaDeJogadores } = useJogadorContext();

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
          <Text style={styles.listItem}>{item.gols}</Text>
        </View>
        <View style={styles.itemAssist}>
          <Text style={styles.listItem}>{item.assist}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gols e Assistências</Text>
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    index: 1,
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
    top: -35,
    maxHeight: 450,
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
    top: -80,
    fontSize: 40,
    fontWeight: "bold",
    color: "#cece",
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
});
