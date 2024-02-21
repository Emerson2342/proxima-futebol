import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MotiView, MotiText } from "moti";

export default function Placar() {
  return (
    <View style={styles.placarContainer}>
      <View style={styles.timeContainer}>
        <Text style={styles.textPlacar}>1</Text>
        <Text style={styles.textTime}> Time 01</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.textPlacar}>1</Text>
        <Text style={styles.textTime}> Time 02</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placarContainer: {
    display: "none",
    top: -85,
    width: "30%",
    marginLeft: 10,
  },
  timeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  textPlacar: {
    width: "15%",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#cece",
    borderRadius: 5,
  },
  textTime: {
    width: "75%",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#cece",
    borderRadius: 5,
    textAlign: "center",
  },
});
