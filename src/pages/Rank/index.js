import { StyleSheet, ImageBackground, View } from 'react-native';
import Artilheiros from '../../components/Artilheiros';
import Header from '../../components/Header';


export default function Rank() {
    return (

        <View style={styles.container}>
            <Header />
            <Artilheiros />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
