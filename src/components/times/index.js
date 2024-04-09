import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { MotiView, MotiText } from "moti";

import ModalPosicaoVazia from "../Modal/ModalPosicaoVazia";
import ModalReservaVazia from "../Modal/ModalReservaVazia";

import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";
import { useTimeContext } from "../../context/TimeContext";
import { usePlacarContext } from "../../context/PlacarContext";

export default function Times() {
  const { timeTitular1, setTimeTitular1, timeTitular2, setTimeTitular2 } =
    useTimeContext();
  const { jogadoresReservas, setJogadoresReservas } =
    useJogadoresReservasContext();
  const { listaDeJogadores, setListaDeJogadores } = useJogadorContext();
  const { placar, setPlacar } = usePlacarContext();

  const [posicaoVaziaVisible, setPosicaoVaziaVisible] = useState(false);
  const [reservaVaziaVisible, setReservaVaziaVisible] = useState(false);

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialRender(false);
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timer em caso de desmontagem do componente
  }, []);

  const removerJogador1 = (index) => {
    const removedItem = timeTitular1[index];
    if (removedItem.id !== null && removedItem.id !== undefined) {
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
      setPosicaoVaziaVisible(true);
    }
  };

  const removerJogador2 = (index) => {
    const removedItem = timeTitular2[index];
    if (removedItem.id !== null && removedItem.id !== undefined) {
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
      setPosicaoVaziaVisible(true);
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
        setReservaVaziaVisible(true);
      }
    } else Alert.alert("", "Jogador precisa sair antes!");
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
        setReservaVaziaVisible(true);
      }
    } else Alert.alert("", "Jogador precisa sair antes!");
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

        setPlacar((prevPlacar) => {
          const novoPlacar = [...prevPlacar];
          novoPlacar[0] = { ...novoPlacar[0], gols: novoPlacar[0].gols + 1 };
          return novoPlacar;
        });
      } else {
        Alert.alert("Jogador não encontrado na Lista de Jogadores!");
      }
    } else {
      setPosicaoVaziaVisible(true);
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
        Alert.alert("Jogador não encontrado na Lista de Jogadores!");
      }
    } else {
      setPosicaoVaziaVisible(true);
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

        setPlacar((prevPlacar) => {
          const novoPlacar = [...prevPlacar];
          novoPlacar[1] = { ...novoPlacar[1], gols: novoPlacar[1].gols + 1 };
          return novoPlacar;
        });
      } else {
        Alert.alert("Jogador não encontrado na Lista de Jogadores!");
      }
    } else {
      setPosicaoVaziaVisible(true);
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
        Alert.alert("Jogador não encontrado na Lista de Jogadores!");
      }
    } else {
      setPosicaoVaziaVisible(true);
    }
  };

  const renderItem1 = ({ item, index }) => {
    return (
      <MotiView
        style={{ paddingVertical: 10 }}
        from={initialRender ? { translateX: -150, opacity: 0 } : undefined}
        animate={initialRender ? { translateX: 0, opacity: 1 } : undefined}
        transition={{ type: "timing", duration: 1000 + index * 500 }}
      >
        <MotiView
          style={styles.textContainer}
          from={{ translateX: -150, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
        >
          <Text style={styles.text}>{item.jogador}</Text>
        </MotiView>

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
      </MotiView>
    );
  };
  const renderItem2 = ({ item, index }) => (
    <MotiView
      style={{ paddingVertical: 10 }}
      from={initialRender ? { translateX: 150, opacity: 0 } : undefined}
      animate={initialRender ? { translateX: 0, opacity: 1 } : undefined}
      transition={{ type: "timing", duration: 1000 + index * 500 }}
    >
      <MotiView
        style={styles.textContainer}
        from={{ translateX: 150, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
      >
        <Text style={styles.text}>{item.jogador}</Text>
      </MotiView>
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
    </MotiView>
  );

  return (
    <View style={{ marginTop: 0 }}>
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <FlatList
            data={timeTitular1}
            renderItem={renderItem1}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : `empty_${index}`
            }
          />
        </View>
        <View style={styles.timeContainer}>
          <FlatList
            data={timeTitular2}
            renderItem={renderItem2}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : `empty_${index}`
            }
          />
        </View>
      </View>
      <Modal
        visible={posicaoVaziaVisible}
        animationType="fade"
        transparent={true}
      >
        <ModalPosicaoVazia handleClose={() => setPosicaoVaziaVisible(false)} />
      </Modal>
      <Modal
        visible={reservaVaziaVisible}
        animationType="fade"
        transparent={true}
      >
        <ModalReservaVazia handleClose={() => setReservaVaziaVisible(false)} />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    top: -20,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  timeContainer: {
    alignSelf: "center",
    width: "48%",
  },
  textContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    // elevation: 5,
    height: 40,
    padding: 3,
    borderColor: "#20473c",
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
    padding: 3,
    color: "#20473c",
    fontWeight: "bold",
    textAlign: "center",
  },
  icones: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 3,
  },
});
