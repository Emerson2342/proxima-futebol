import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { MotiView, MotiText } from "moti";

import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";
import { useTimeContext } from "../../context/TimeContext";

export default function Times() {
  const { timeTitular1, setTimeTitular1, timeTitular2, setTimeTitular2 } =
    useTimeContext();
  const { jogadoresReservas, setJogadoresReservas } =
    useJogadoresReservasContext();
  const { listaDeJogadores, setListaDeJogadores } = useJogadorContext();

  useEffect(() => {
    // Este alert será executado apenas na montagem inicial da tela
    Alert.alert("", "Bem vindo à Lista de Próximas!!");
  }, []);

  const removerJogador1 = (index) => {
    const removedItem = timeTitular1[index];
    if (removedItem.id !== null) {
      timeTitular1[index] = {
        id: null,
        jogador: "",
        gols: 0,
        assist: 0,
        selected: false,
      };
      setJogadoresReservas((prevLista) => prevLista.concat(removedItem));
      setTimeTitular1([...timeTitular1]);
    } else {
      alert("Posição está vazia!");
    }
  };

  const removerJogador2 = (index) => {
    const removedItem = timeTitular2[index];
    if (removedItem.id !== null) {
      timeTitular2[index] = {
        id: null,
        jogador: "",
        gols: 0,
        assist: 0,
        selected: false,
      };
      setJogadoresReservas((prevLista) => prevLista.concat(removedItem));
      setTimeTitular2([...timeTitular2]);
    } else {
      alert("Posição está vazia!");
    }
  };

  const adicionarJogador1 = (index) => {
    const addItem = timeTitular1[index];
    if (addItem.id == null) {
      if (jogadoresReservas.length > 0) {
        const jogadorReserva = jogadoresReservas[0];
        timeTitular1[index] = jogadorReserva;
        setJogadoresReservas((prevReservas) => prevReservas.slice(1));
        setTimeTitular1([...timeTitular1]);
      } else {
        alert("Não há mais jogadores na reserva!");
      }
    } else alert("Jogador precisa sair antes!");
  };

  const adicionarJogador2 = (index) => {
    const addItem = timeTitular2[index];
    if (addItem.id == null) {
      if (jogadoresReservas.length > 0) {
        const jogadorReserva = jogadoresReservas[0];
        timeTitular2[index] = jogadorReserva;
        setJogadoresReservas((prevReservas) => prevReservas.slice(1));
        setTimeTitular2([...timeTitular2]);
      } else {
        alert("Não há mais jogadores na reserva!");
      }
    } else alert("Jogador precisa sair antes!");
  };

  const gol1 = (index) => {
    const jogador = timeTitular1[index];
    if (jogador && jogador.id !== null && jogador.id !== undefined) {
      const jogadorNaLista = listaDeJogadores.find(
        (j) => j && j.id === jogador.id
      );
      if (jogadorNaLista) {
        jogadorNaLista.gols += 1;
        setListaDeJogadores([...listaDeJogadores]);
      } else {
        alert("Jogador não encontrado na listaDeJogadores!");
      }
    } else {
      alert("Jogador inválido ou sem ID!");
    }
  };

  const assist1 = (index) => {
    const jogador = timeTitular1[index];
    if (jogador && jogador.id !== null && jogador.id !== undefined) {
      const jogadorNaLista = listaDeJogadores.find(
        (j) => j && j.id === jogador.id
      );
      if (jogadorNaLista) {
        jogadorNaLista.assist += 1;
        setListaDeJogadores([...listaDeJogadores]);
      } else {
        alert("Jogador não encontrado na listaDeJogadores!");
      }
    } else {
      alert("Jogador inválido ou sem ID!");
    }
  };

  const gol2 = (index) => {
    const jogador = timeTitular2[index];
    if (jogador && jogador.id !== null && jogador.id !== undefined) {
      const jogadorNaLista = listaDeJogadores.find(
        (j) => j && j.id === jogador.id
      );
      if (jogadorNaLista) {
        jogadorNaLista.gols += 1;
        setListaDeJogadores([...listaDeJogadores]);
      } else {
        alert("Jogador não encontrado na listaDeJogadores!");
      }
    } else {
      alert("Jogador inválido ou sem ID!");
    }
  };

  const assist2 = (index) => {
    const jogador = timeTitular2[index];
    if (jogador && jogador.id !== null && jogador.id !== undefined) {
      const jogadorNaLista = listaDeJogadores.find(
        (j) => j && j.id === jogador.id
      );
      if (jogadorNaLista) {
        jogadorNaLista.assist += 1;
        setListaDeJogadores([...listaDeJogadores]);
      } else {
        alert("Jogador não encontrado na listaDeJogadores!");
      }
    } else {
      alert("Jogador inválido ou sem ID!");
    }
  };

  const renderItem1 = ({ item, index }) => (
    <View style={styles.jogadorContainer}>
      <View style={styles.jogadorContent}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.jogador}</Text>
        </View>
        <View style={styles.icones}>
          <TouchableOpacity onPress={() => gol1(index)}>
            <FontAwesome name="soccer-ball-o" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => assist1(index)}>
            <Image
              style={{ objectFit: "contain", height: 30 }}
              source={require("../../../assets/assist.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => adicionarJogador1(index)}>
            <Entypo name="arrow-up" color={"green"} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removerJogador1(index)}>
            <Entypo name="arrow-down" color={"red"} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const renderItem2 = ({ item, index }) => (
    <View style={styles.jogadorContainer}>
      <View style={styles.jogadorContent}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.jogador}</Text>
        </View>
        <View style={styles.icones}>
          <TouchableOpacity onPress={() => gol2(index)}>
            <FontAwesome name="soccer-ball-o" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => assist2(index)}>
            <Image
              style={{ objectFit: "contain", height: 30 }}
              source={require("../../../assets/assist.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => adicionarJogador2(index)}>
            <Entypo name="arrow-up" color={"green"} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removerJogador2(index)}>
            <Entypo name="arrow-down" color={"red"} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ marginTop: 0 }}>
      <Text style={[styles.timeText, { color: "#000" }]}>Escalação</Text>
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>Time 01</Text>
          <FlatList
            data={timeTitular1}
            renderItem={renderItem1}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : `empty_${index}`
            }
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>Time 02</Text>
          <FlatList
            data={timeTitular2}
            renderItem={renderItem2}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : `empty_${index}`
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timeText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#20473c",
  },
  timeContainer: {
    alignSelf: "center",
    width: "50%",
    padding: 5,
  },
  textContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    elevation: 9,
    height: 45,
    padding: 3,
    borderColor: "#fff",
  },
  text: {
    fontSize: 20,
    padding: 3,
    color: "#20473c",
    fontWeight: "bold",
  },
  icones: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 3,
  },
});
