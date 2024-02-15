import React from "react";
import {
    View,
    StyleSheet,

} from "react-native";

/* const statusBarHeight =
    StatusBar.currentHeight ? StatusBar.currentHeight + 45 : 70; */

export default function Header() {
    return (
        <View style={styles.container} />

    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 110,
        backgroundColor: '#004f78',
        borderBottomWidth: 1,
    }
})