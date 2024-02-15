import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MotiView, MotiText } from "moti";

export default function Placar() {


    return (
        <View style={styles.header}>
            <View style={styles.placarContend}>
                {/* *************************************************************** */}
                <View style={styles.time1}>
                    {/* NOME DO TIME */}
                    <View>
                        <Text style={styles.nomeTime}>
                            Time 1
                        </Text>
                    </View>
                    {/* PLACAR DO TIME */}
                    < View

                        style={[styles.placarResultadoContent, { marginLeft: 'auto' }]}>
                        <MotiText
                            from={{
                                rotateX: '-1000deg',
                                opacity: 0
                            }}
                            animate={{
                                rotateX: '0deg',
                                opacity: 1
                            }}
                            style={styles.placarResultado}>0</MotiText>
                    </View>
                </View>
                {/* *************************************************************** */}
                <View ><TouchableOpacity

                ><Text style={styles.zerarPlacar}>X</Text></TouchableOpacity></View>
                {/* *************************************************************** */}
                <View style={styles.time2}>
                    {/* PLACAR DO TIME */}

                    < View

                        style={[styles.placarResultadoContent, { marginRight: 'auto' }]}>
                        <MotiText
                            from={{
                                rotateX: '-1000deg',
                                opacity: 0
                            }}
                            animate={{
                                rotateX: '0deg',
                                opacity: 1
                            }}
                            style={styles.placarResultado}>0</MotiText>
                    </View>

                    {/* NOME DO TIME */}
                    <View >
                        <Text style={styles.nomeTime}>
                            Time 2
                        </Text>
                    </View>

                </View>
                {/* *************************************************************** */}
            </View>
        </View >
    )
};


const styles = StyleSheet.create({
    header: {
        marginTop: -130
    },

    placarContend: {
        height: 60,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    placarResultadoContent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: '35%',
        backgroundColor: '#004f78',

    },

    placarResultado: {
        color: '#ffffff',
        padding: 5,
        fontSize: 40,
        fontWeight: 'bold'
    },
    zerarPlacar: {
        fontSize: 50,
        fontWeight: 'bold'
    },
    time1: {
        borderRadius: 15,
        width: '45%',
        backgroundColor: '#e5e5e5',
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    time2: {
        borderRadius: 15,
        width: '45%',
        backgroundColor: '#e5e5e5',
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        ustifyContent: 'center'
    },
    nomeTime: {
        fontSize: 25,
        margin: 'auto',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})