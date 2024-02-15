import ListaProximas from '../../components/ListaProximas';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';


export default function AdicionarProxima() {
    return (
        <View style={styles.container}>
            <Header />
            <ListaProximas />
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
