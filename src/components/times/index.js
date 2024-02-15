import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, FlatList, } from "react-native";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { MotiView, MotiText } from "moti";

export default function Times() {

    return (
        <View><Text>Teste</Text></View>
    )

};


const styles = StyleSheet.create({
    jogadorText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        flexWrap: 'wrap'
    },
    jogadorContainer: {
        justifyContent: 'center',
        width: 180,
        height: 45,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#fff",
        borderRadius: 7,
        elevation: 15
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold'
    },

    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: -10,
        marginTop: 15
    }
})