import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { FontAwesome } from 'react-native-vector-icons'

import CountDown from 'react-native-countdown-component';



export default function Cronometro() {

    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [key, setKey] = useState(1);

    const play = () => {
        time <= 0 ? Alert.alert("Cronômetro zerado", "Adicione um tempo") : setPlaying(!playing);
    };
    const handleIncrement = () => {
        setKey((prevKey) => prevKey + 1);
        setTime((asdf) => asdf + 10)

        setPlaying(false);
    }
    const handleDecrement = () => {
        setKey((prevKey) => prevKey + 1);
        setTime((prevTime) => Math.max(0, prevTime - 10));
        setPlaying(false);
    }

    const handleReset = () => {
        setPlaying(false)
        setTime(0);
        setKey((prevKey) => prevKey + 1);
    };

    return (
        <View style={styles.container}>
            <View>
                <CountdownCircleTimer
                    key={key}
                    size={100}
                    isPlaying={playing}
                    duration={time < 0 ? 0 : time}
                    colors={['#89ff68', '#00fbff', '#FF0000', '#FF0000']}
                    colorsTime={[20, 15, 10, 0]}
                    onComplete={() => {
                        Alert.alert("", "Fim de jogo");
                        handleReset()


                    }}
                    strokeWidth={10}

                    trailColor={"#d9d9d9"}
                // rotation={'counterclockwise'}
                //isGrowing={true}

                >
                    {({ remainingTime }) =>
                        <Text style={styles.tempoText}>
                            {`${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, '0')}`}
                        </Text>
                    }
                </CountdownCircleTimer>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={{ width: '20%' }}
                    onPress={() => play()}>
                    <FontAwesome
                        name={playing ? 'pause' : 'play'}
                        size={30}
                        color={"#20473c"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ width: '20%' }}
                    onPress={() => handleReset()}
                >
                    <FontAwesome
                        name={'stop'}
                        size={30}
                        color={"#20473c"} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ width: '20%' }}
                    onPress={() => handleIncrement()}
                >
                    <FontAwesome
                        name={'caret-up'}
                        size={50}
                        color={"#20473c"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ width: '20%' }}
                    onPress={() => handleDecrement()}
                >
                    <FontAwesome
                        name={'caret-down'}
                        size={50}
                        color={"#20473c"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: 'space-around',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    tempoText: {
        color: "#fff",
        fontSize: 30
    },
    button: {
        width: '50%',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center'
    }

});