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
import ModalSairJogador from "../Modal/ModalSairJogador";
import ModalAlterarTime from '../Modal/ModalAlterarTime';
import ModalAjuda from "../Modal/ModalAjuda";

import { useJogadorContext } from "../../context/JogadoresContext";
import { useJogadoresReservasContext } from "../../context/JogadoresReservasContext";
import { useTimeContext } from "../../context/TimeContext";
import { usePlacarContext } from "../../context/PlacarContext";


export default function Times() {
  const { timeTitular1, setTimeTitular1, timeTitular2, setTimeTitular2, numJogadores, setNumJogadores } =
    useTimeContext();

  const { jogadoresReservas, setJogadoresReservas } =
    useJogadoresReservasContext();
  const { listaDeJogadores, setListaDeJogadores } = useJogadorContext();
  const { placar, setPlacar } = usePlacarContext();

  const [posicaoVaziaVisible, setPosicaoVaziaVisible] = useState(false);
  const [reservaVaziaVisible, setReservaVaziaVisible] = useState(false);
  const [sairJogadorVisible, setSairJogadorVisible] = useState(false);
  const [modalAlterarTime, setModalAlterarTime] = useState(false);
  const [modalAjudaVisible, setModalVisibleAjuda] = useState(false);

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialRender(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleIncrement = () => {
    if (timeTitular1.find(jogador => jogador.id != null)
      || timeTitular2.find(jogador => jogador.id != null)
    ) {
      setModalAlterarTime(true);
    } else {
      setNumJogadores((asdf) => asdf + 1);
    }
  };

  const handleDecrement = () => {
    if (timeTitular1.find(jogador => jogador.id != null)
      || timeTitular2.find(jogador => jogador.id != null)
    ) {
      setModalAlterarTime(true);
    } else {
      setNumJogadores(prevTime => Math.max(0, prevTime - 1));
    }
  };

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
    } else setSairJogadorVisible(true);
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
    } else setSairJogadorVisible(true);
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
        style={{ paddingVertical: 3 }}
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
            <FontAwesome name="soccer-ball-o" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => assist1(index)}>
            <Image
              style={{ objectFit: "contain", height: 25 }}
              source={require("../../../assets/assist.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => adicionarJogador1(index)}>
            <Entypo name="arrow-up" color={"#3cc455"} size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removerJogador1(index)}>
            <Entypo name="arrow-down" color={"red"} size={25} />
          </TouchableOpacity>
        </View>
      </MotiView>
    );
  };
  const renderItem2 = ({ item, index }) => (
    <MotiView
      style={{ paddingVertical: 3 }}
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
          <FontAwesome name="soccer-ball-o" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => assist2(index)}>
          <Image
            style={{ objectFit: "contain", height: 25 }}
            source={require("../../../assets/assist.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => adicionarJogador2(index)}>
          <Entypo name="arrow-up" color={"#3cc455"} size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removerJogador2(index)}>
          <Entypo name="arrow-down" color={"red"} size={25} />
        </TouchableOpacity>
      </View>
    </MotiView>
  );

  return (
    <View style={{ top: 50 }} >
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
      <View style={styles.options}>
        <View
          style={{ width: '50%' }}
        >
          <Text
            style={styles.titleOptions}
          >
            Jogadores por Time
          </Text>
          <View
            style={styles.buttonOptions}>
            <TouchableOpacity
              style={{ alignSelf: 'center', alignItems: 'center', width: '40%' }}
              onPress={() => handleIncrement()}
            >
              <FontAwesome name={"plus"} size={20} color={"#20473c"} />
            </TouchableOpacity>
            <Text
              style={styles.textOptions}
            >{numJogadores}</Text>
            <TouchableOpacity
              style={{ alignSelf: 'center', alignItems: 'center', width: '40%' }}
              onPress={() => handleDecrement()}
            >
              <FontAwesome name={"minus"} size={20} color={"#20473c"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '50%', alignItems: 'center' }}>
          <Text style={styles.titleOptions}>Ajuda</Text>
          <TouchableOpacity

            onPress={() => setModalVisibleAjuda(true)}
          >
            <Entypo name={"help"} size={20} color={"#20473c"} />
          </TouchableOpacity>
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

      <Modal
        visible={sairJogadorVisible}
        animationType="fade"
        transparent={true}>
        <ModalSairJogador
          handleClose={() => setSairJogadorVisible(false)}
        />
      </Modal>
      <Modal
        visible={modalAlterarTime}
        animationType="fade"
        transparent={true}
      >
        <ModalAlterarTime
          handleClose={() => setModalAlterarTime(false)}
        />
      </Modal>
      <Modal
        visible={modalAjudaVisible}
        animationType="fade"
        transparent={true}
      >
        <ModalAjuda
          handleClose={() => setModalVisibleAjuda(false)}
        />

      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    height: 450,
  },
  timeContainer: {
    alignSelf: "center",
    width: "48%",
  },
  textContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 3,
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
  options: {
    width: '100%',
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleOptions: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#20473c',
    textAlign: 'center'
  },
  buttonOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    alignSelf: 'center'
  },
  textOptions: {
    fontSize: 25,
    color: "#20473c"
  }
});
