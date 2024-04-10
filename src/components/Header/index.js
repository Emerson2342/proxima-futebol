import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Logo from '../../../assets/proximaImage.png'

export default function Header() {
  return <View style={styles.container}
  >
    <Image
      style={{ width: 50, height: 50, resizeMode: 'contain', top: 30 }}
      source={Logo}
    />
    <Text
      style={styles.title}
    >Próxima</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#70e404",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    top: 30
  }
});
