import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";

export default function ListaProximas() {
  const { jogadoresReservas, setJogadoresReservas } =
    useJogadoresReservasContext();

  const misturarReservas = () => {
    setJogadoresReservas((prevReserva) => {
      const copiaReservas = [...prevReserva];
      copiaReservas.sort(() => Math.random() - 0.5);
      return copiaReservas;
    });
  };

  const handleConfirmar = (jogador, index) => {
    Alert.alert(
      "Confirmação",
      `Deseja excluir ${jogador} da lista de próximas?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => handleDelete(index) },
      ],
      { cancelable: false }
    );
  };
  const handleConfirmarTodos = () => {
    Alert.alert(
      "",
      `Tem certeza que deseja limpar a lista de próximas?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => setJogadoresReservas([]) },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = (index) => {
    jogadoresReservas.splice(index, 1);
    setJogadoresReservas([...jogadoresReservas]);
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View animation="flipInX" duration={1500}>
      <TouchableOpacity
        onLongPress={() => handleConfirmar(item.jogador, index)}
      >
        <View style={styles.jogadorContainer}>
          <Text style={styles.jogadorText}>{item.jogador}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={{ top: 60 }}>
      <View style={styles.titleContainer}>
        <Text
          onLongPress={() => alert(JSON.stringify(jogadoresReservas, null, 2))}
          style={styles.textTitle}
        >
          {" "}
          Banco de Reservas
        </Text>
      </View>

      <View>
        <FlatList
          style={styles.scrollView}
          data={jogadoresReservas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onLongPress={() => misturarReservas()}
          >
            <Text style={styles.inputButtonText}>Segure Para Sortear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleConfirmarTodos}
          >
            <Text style={styles.inputButtonText}>Limpar Próximas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
    height: 480,
    paddingLeft: 7,
    paddingRight: 7,
  },
  titleContainer: {
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    height: 70,
    justifyContent: "center",
    borderRadius: 9,
  },
  textTitle: {
    fontSize: 30,
    textAlign: "center",
    flexWrap: "nowrap",
    width: "100%",
    fontWeight: "bold",
    color: "#20473c",
  },
  jogadorText: {
    color: "#20473c",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    flexWrap: "wrap",
  },
  jogadorContainer: {
    justifyContent: "center",
    width: 180,
    height: 40,
    marginBottom: 5,
    backgroundColor: "#ffff",
    borderRadius: 7,
    elevation: 3,
  },

  inputButtonText: {
    color: "#20473c",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#93dc4f",
    borderRadius: 7,
    marginVertical: 5,
    padding: 5,
    width: "90%",
  },
  buttonContainer: {
    width: "100%",
  },
});
