import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import CountDown from 'react-native-countdown-component';



export default function Cronometro() {

    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(10);
    const [key, setKey] = useState(1);

    const play = () => {
        time <= 0 ? Alert.alert("Cronômetro zerado", "Adicione um tempo") : setPlaying(!playing);
    };
    const handleIncrement = () => {
        setTime((prevTime) => prevTime + 60)
        setPlaying(false);
    }
    const handleDecrement = () => {
        setTime((prevTime) => Math.max(0, prevTime - 60));
        setPlaying(false);
    }

    const resetContador = () => {
        setPlaying(false)
        setTime(0);
        setKey((prevKey) => prevKey + 1);
    };

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                key={key}
                size={100}
                isPlaying={playing}
                duration={time < 0 ? 0 : time}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
            >
                {({ remainingTime }) =>
                    <Text style={styles.tempoText}>
                        {`${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, '0')}`}
                    </Text>
                }
            </CountdownCircleTimer>
            <Button title="Zerar" onPress={() => resetContador()} />
            <Button title={playing ? "Pausar" : "Iniciar"} onPress={() => play()} />
            <Button title="+" onPress={() => handleIncrement()} />
            <Button title="-" onPress={() => handleDecrement()} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

        justifyContent: "center",
        alignItems: "center",
    },

});