import { StyleSheet, View, StatusBar, Text } from "react-native";
import Header from "../../components/Header";
import Cronometro from "../../components/cronometro";
import Times from "../../components/times";
import Placar from "../../components/Placar";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#489404"} />
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.titulo}>Partida</Text>
      </View>
      <Cronometro />
      <Placar />
      <Times />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    top: 60,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#20473c",
    textAlign: "center",
  },
});
