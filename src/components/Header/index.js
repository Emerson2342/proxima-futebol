import React from "react";
import { View, StyleSheet } from "react-native";

export default function Header() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 110,
    backgroundColor: "#3f8d65",
    borderBottomWidth: 1,
  },
});
