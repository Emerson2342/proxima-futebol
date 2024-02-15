import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Timer from 'react-native-timer'
//import CountDown from 'react-native-countdown-component';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';


export default function Cronometro() {
    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [soundKey, setSoundKey] = useState();



    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };


    const handleIncreaseMinutes = () => {
        setTimer((prevSeconds) => Math.max(prevSeconds + 10, 0));
    }

    const handleDecreaseMinutes = () => {
        setTimer((prevSeconds) => Math.max(prevSeconds - 10, 0))
    }
    const handleReset = () => {
        setIsRunning(false);
        setTimer(0); // Reinicie o timer com o valor inicial desejado
        setSoundKey((prevKey) => prevKey + 1); // Altere a chave do som para reiniciar o som
    };

    useEffect(() => {
        // Configurar o som ao carregar o componente
        Audio.Sound.createAsync(
            require('../cronometro/Apito.mp3'),
            { shouldPlay: false }
        );
    }, []);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../cronometro/Apito.mp3'),
            { shouldPlay: true }
        );
        // Limpar o som ao terminar
        setTimeout(() => {
            sound.unloadAsync();
        }, 5000);
    };



    return (
        <View>

            {/*  <CountDown style={styles.cronometro}
                until={timer}
                timeToShow={['M', 'S']}
                timeLabels={{ m: null, s: null }}
                digitStyle={{ backgroundColor: '#dede' }} // Cor de fundo dos dígitos
                digitTxtStyle={{ color: '#000' }} // Cor do texto dos dígitos

                onFinish={playSound}
                size={30}
                running={isRunning}
            />
            <View style={styles.botoes}>

                <TouchableOpacity style={styles.botao} onPress={isRunning ? () => handlePause() : () => handleStart()}>
                    <Entypo name={isRunning ? 'controller-paus' : 'controller-play'}
                        color={"#003b6b"}
                        size={isRunning ? 50 : 50}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao} onPress={handleReset}>
                    <Entypo name='controller-stop'
                        color={"#003b6b"}
                        size={50}
                    ></Entypo>
                </TouchableOpacity>


            </View>
            <View style={styles.setaContainer}>
                <TouchableOpacity style={styles.seta} onPress={handleIncreaseMinutes}>
                    <AntDesign
                        name="upcircleo"
                        size={40}
                        color={'#003b6b'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.seta} onPress={handleDecreaseMinutes}>
                    <AntDesign
                        name="downcircleo"
                        size={40}
                        color={'#003b6b'} />
                </TouchableOpacity>
            </View> */}

        </View >
    )
}
;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center',
    },
    cronometro: {
        top: -100,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    botoes: {
        top: -100,
        flexDirection: 'row',
        justifyContent: 'center',
        //backgroundColor: "#fafa"
    },
    botao: {
        margin: 3,
        // backgroundColor: '#fafa',
        width: "20%",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        justifyContent: "center"

    },
    setaContainer: {
        top: -35,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    seta: {
        top: -90,
        justifyContent: 'center',
        padding: 15
    },


})
