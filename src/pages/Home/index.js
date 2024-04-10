import { StyleSheet, View, StatusBar, Image } from "react-native";
import Header from "../../components/Header";
import Cronometro from "../../components/cronometro";
import Times from "../../components/times";
import Placar from "../../components/Placar";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#489404"} />
      <Header />
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
});
