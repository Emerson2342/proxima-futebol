import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { FontAwesome, AntDesign, Entypo } from "react-native-vector-icons";


export default function Cronometro() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(1);

  const play = () => {
    time <= 0
      ? Alert.alert("Cronômetro zerado", "Adicione um tempo")
      : setPlaying(!playing);
  };
  const handleIncrement = () => {
    setKey((prevKey) => prevKey + 1);
    setTime((asdf) => asdf + 10);

    setPlaying(false);
  };
  const handleDecrement = () => {
    setKey((prevKey) => prevKey + 1);
    setTime((prevTime) => Math.max(0, prevTime - 10));
    setPlaying(false);
  };

  const handleReset = () => {
    setPlaying(false);
    setTime(0);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <View style={styles.buttonContent}>
          <TouchableOpacity onPress={() => play()}>
            <AntDesign
              name={playing ? "pause" : "caretright"}
              size={40}
              color={"#cece"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleReset()}>
            <Entypo name={"cw"} size={25} color={"#cece"} />
          </TouchableOpacity>
        </View>
        <CountdownCircleTimer
          key={key}
          size={100}
          isPlaying={playing}
          duration={time < 0 ? 0 : time}
          colors={["#89ff68", "#00fbff", "#FF0000", "#FF0000"]}
          colorsTime={[20, 15, 10, 0]}
          onComplete={() => {
            Alert.alert("", "Fim de jogo");
            handleReset();
          }}
          strokeWidth={8}
          trailColor={"#cece"}
        >
          {({ remainingTime }) => (
            <Text style={styles.tempoText}>
              {`${Math.floor(remainingTime / 60)}:${String(
                remainingTime % 60
              ).padStart(2, "0")}`}
            </Text>
          )}
        </CountdownCircleTimer>
        <View style={styles.buttonContent}>
          <TouchableOpacity onPress={() => handleIncrement()}>
            <FontAwesome name={"plus"} size={30} color={"#cece"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDecrement()}>
            <FontAwesome name={"minus"} size={30} color={"#cece"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    top: -20,
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
  },
  tempoText: {
    color: "#cece",
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContent: {
    width: "20%",
    height: 80,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
