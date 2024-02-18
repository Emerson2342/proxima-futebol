import { StyleSheet, View, StatusBar } from 'react-native';
import Header from '../../components/Header';
import Cronometro from '../../components/cronometro'
import Placar from '../../components/placar';
import Times from '../../components/times';

export default function Home() {
    return (
        <View style={styles.container}>

            <StatusBar backgroundColor={'#20473c'} />
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
