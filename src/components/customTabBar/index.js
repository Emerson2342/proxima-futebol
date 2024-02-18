import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';



export default function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>

                {/*  {state.routes.map((route, index) => { */}
                {state.routes.map((route, index) => { //gpt

                    const { options } = descriptors[route.key];


                    const { key, name } = route //gpt

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    return (
                        <TouchableOpacity
                            key={key} //gpt
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.buttonTab}
                        >
                            <View style={{ alignItems: 'center', padding: 4 }}>
                                <View style={[styles.innerButton,
                                { backgroundColor: isFocused ? "#20473c" : "transparent" }]}>
                                    {options.tabBarIcon === 'soccer-field' ? (
                                        <MaterialCommunityIcons
                                            name={options.tabBarIcon}
                                            size={34}
                                            color={isFocused ? "#ffffff" : "#000"}
                                        />
                                    ) : (
                                        <MaterialIcons
                                            name={options.tabBarIcon}
                                            size={34}
                                            color={isFocused ? "#ffffff" : "#000"}
                                        />
                                    )}
                                </View>
                            </View>

                        </TouchableOpacity>
                    )
                })
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        borderRadius: 99,
        flexDirection: 'row',
        marginBottom: Platform.OS === 'ios' ? 38 : 24,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(255,255,255, 0.9)',
        gap: 50,
        elevation: 15,
        textShadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        textShadowRadius: 3.80
    },
    buttonTab: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerButton: {
        padding: 8,

        borderRadius: 99
    }

})