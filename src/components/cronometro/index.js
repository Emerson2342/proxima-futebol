import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
    setTime((asdf) => asdf + 60);
    setPlaying(false);
  };
  const handleDecrement = () => {
    setKey((prevKey) => prevKey + 1);
    setTime((prevTime) => Math.max(0, prevTime - 60));
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
              size={30}
              color={"#20473c"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleReset()}>
            <Entypo name={"cw"} size={25} color={"#20473c"} />
          </TouchableOpacity>
        </View>
        <View
          style={{ top: -35 }}
        >
          <CountdownCircleTimer
            key={key}
            size={120}
            isPlaying={playing}
            duration={time < 0 ? 0 : time}
            colors={["#89ff68", "#00fbff", "#FF0000", "#FF0000"]}
            colorsTime={[20, 15, 10, 0]}
            onComplete={() => {
              Alert.alert("", "Fim de jogo");
              handleReset();
            }}
            strokeWidth={0}
            trailColor={"#000"}
          >
            {({ remainingTime }) => (
              <Text style={styles.tempoText}>
                {`${Math.floor(remainingTime / 60)}:${String(
                  remainingTime % 60
                ).padStart(2, "0")}`}
              </Text>
            )}
          </CountdownCircleTimer>
        </View>
        <View style={styles.buttonContent}>
          <TouchableOpacity onPress={() => handleIncrement()}>
            <FontAwesome name={"plus"} size={20} color={"#20473c"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDecrement()}>
            <FontAwesome name={"minus"} size={20} color={"#20473c"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: '#fff',
    marginLeft: 30,
    marginRight: 30,
    height: 50,
    top: 90,
    width: '90%',
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tempoText: {
    color: "#20473c",
    fontSize: 35,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContent: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
