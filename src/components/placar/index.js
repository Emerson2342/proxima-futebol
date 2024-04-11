import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

import { ModalEditarNomeTime } from "../Modal/ModalEditarNomeTime";
import { usePlacarContext } from "../../context/PlacarContext";

export default function Placar() {
  const { placar, setPlacar } = usePlacarContext();

  const [indexToEdit, setIndexToEdit] = useState(0);
  const [editarNomeVisible, setEditarNomeVisible] = useState(false);

  const golsTime1 = placar.find((time) => time.id === 1)?.gols || 0;
  const golsTime2 = placar.find((time) => time.id === 2)?.gols || 0;

  const nomeTime1 = placar.find((time) => time.id === 1)?.time || "Time 1";
  const nomeTime2 = placar.find((time) => time.id === 2)?.time || "Time 2";

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <TouchableOpacity
          onPress={() => {
            setEditarNomeVisible(true);
            setIndexToEdit(1);
          }}>
          <Text style={styles.text}>{nomeTime1}</Text>
        </TouchableOpacity>
        <View
          style={{ width: '25%' }}
        >
          <Text style={[styles.text, styles.textPlacar]}>{golsTime1}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ height: 50, justifyContent: "center" }}
        onPress={() =>
          setPlacar((prevPlacar) => {
            const novoPlacar = [...prevPlacar];
            novoPlacar[0] = { ...novoPlacar[0], gols: 0 };
            novoPlacar[1] = { ...novoPlacar[1], gols: 0 };
            return novoPlacar;
          })
        }
      >
        <Text style={styles.text}>x</Text>
      </TouchableOpacity>
      <View style={[styles.timeContainer, { justifyContent: 'flex-start' }]}>
        <View
          style={{ width: "25%" }}
        >
          <Text style={[styles.text, styles.textPlacar]}>{golsTime2}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setEditarNomeVisible(true);
            setIndexToEdit(2);
          }}>
          <Text style={styles.text}>{nomeTime2}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={editarNomeVisible}
        transparent={true}
        animationType="fade"
      >
        <ModalEditarNomeTime
          handleClose={() => setEditarNomeVisible(false)}
          indexToEdit={indexToEdit}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    top: 60,
    width: "95%",
    alignSelf: "center",
    height: 50,
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: "row",
    width: "48%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#20473c",
  },
  textPlacar: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#20473c",
  },
});
