import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

export default function ModalAjuda({ handleClose }) {


  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.text}>#Introdução</Text>
        <Text style={{ padding: 10 }}>
          São 4 páginas, Jogo, Lista de Próximas, Lista de Jogadores e Artilharia. A Última
          é apenas para consulta e/ou para zerar a contagem de gols e assistências.
        </Text>
        <Text style={styles.text}>#Primeira Adição</Text>
        <Text style={{ padding: 10 }}>Para adicionar jogador no time, primeiro tem que adicionar ele na terceira aba,
          clique em Adicionar Jogador e salva o nome dele. Ao clicar no nome da lista em Lista de Jogadores, ele será selecionado  ao clicar em Enviar para a reserva,
          todos os selecionados serão enviados para a Lista de Próxima.  Ao segurar no nome do jogador, é possível editar o nome ou apagar ele da Lista Geral.</Text>
        <Text style={styles.text}>#Lista de Próximas</Text>
        <Text style={{ padding: 10 }}>Para sortear os jogadores, basta segurar em Segure Para Sortear que ele vai embaralhar os nomes na Lista de Reservas.
          Pode sortear quantas vezes quiser. Caso queira retirar o jogador que não vai mais jogar no dia, basta segurar no nome e
          confirmar a exclusão da Lista de Reservas (Ele ainda continuará na Lista Geral).
        </Text>
        <Text style={styles.text}>#O Jogo</Text>
        <Text style={{ padding: 10 }}>Nele, é onde acontece a partida. Para adicionar jogador em um time, basta clicar na seta verde para cima e para
          remover o jogador, a seta para baixo vermelha.
          O jogador que vai entrar é o primeiro da Lista de Reservas, e ao sair, ele vai para o último na Lista de Reservas.
          Caso queira aumentar ou diminuir a quantidade de jogadores nos times, basta clicar em Jogadores por Time.
          Essa ação só será possível quando ambos os times estiverem vazios.
          É possível editar o nome dos times clicando neles respectivamente.

        </Text>
        <Text style={styles.text}>#Gols</Text>
        <Text style={{ padding: 10 }}>Para adicionar o gol ou assistência, basta clicar no respectivo ícone do jogador que será adicionarJogador1na artilharia.</Text>
        <Text style={styles.text}>#Atenção</Text>
        <Text style={{ padding: 10 }}>Sempre ao acabar a partida, limpar a Lista de Próximas e ambos os times, para evitar a duplicação na próxima execução!</Text>

      </ScrollView >
      <TouchableOpacity
        style={{ backgroundColor: "#fff", width: "30%", borderRadius: 5 }}
        onPress={handleClose}
      >
        <Text
          style={styles.text}
        >Fechar</Text>
      </TouchableOpacity>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.8)",
    flex: 1,
    alignItems: "center",
    padding: 10

  },
  content: {
    maxHeight: 900,
    backgroundColor: "#fff",
    width: "85%",
    paddingLeft: 10,
    paddingRight: 10,

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",

  },
  text: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: 'bold',
    padding: 7,
  },
});
