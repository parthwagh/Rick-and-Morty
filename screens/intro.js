import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";


export default function Into({navigation}) {
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular':require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf')
      });

      if (!fontsLoaded) {
        return <AppLoading />;
      }  else {
    return(
        <View style={styles.mainview}>
            <View style={styles.imageview}>
                <Image
                    style={styles.rickandmortyimage} 
                    source={require('../assets/rick-and-morty.png')}
                 />
                 <Text style={styles.showname}>The Rick and Morty</Text>
            </View>
            <View style={styles.exploreview}>
                <TouchableOpacity 
                onPress={() => navigation.navigate('characters')}
                style={styles.exploretouchable}
                >
                    <Text style={styles.exploretext}>Explore Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        backgroundColor: "#121212"
    },
    imageview:{
        marginTop: 100,
    },
    rickandmortyimage: {
        height: "70%",
        width: "70%",
        alignSelf: "center",
        resizeMode: "contain"
    },
    showname: {
        textAlign: "center",
        color: "#f1f1f1",
        fontFamily: "Poppins-SemiBold",
        fontSize: 22
    },
    exploreview: {
        marginHorizontal: 35,
        marginTop: -60
    },
    exploretouchable: {
        backgroundColor: "#b7d3e8",
        paddingVertical: 15,
        borderRadius: 8
    },
    exploretext: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        textAlign: "center"
    }
})