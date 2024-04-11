import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Logo from "../../../assets/proximaImage.png";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 50,
          height: 50,
          resizeMode: "contain",
          top: 5,
        }}
        source={Logo}
      />
      <Text style={styles.title}>Próxima</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    position: "absolute",
    backgroundColor: "#93dc4f",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    top: 10,
  }
});
