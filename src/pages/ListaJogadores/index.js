import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ListadeJogadores from '../../components/ListaJogadores';
import Header from '../../components/Header';


export default function ListaJogadores() {
    return (

        <View style={styles.container}>
            <Header />
            <ListadeJogadores />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
