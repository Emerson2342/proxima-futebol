import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

export default function ModalAlterarTime({ handleClose }) {
  const [tempoDecorrido, setTempoDecorrido] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose();
    }, 3500);

    const intervalId = setInterval(() => {
      setTempoDecorrido((tempoAnterior) => tempoAnterior + 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [handleClose]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Ambos os times têm que estarem vazios para alterar a quantidade de jogadores!</Text>
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
    borderWidth: 1,
    borderColor: "#000",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
});
