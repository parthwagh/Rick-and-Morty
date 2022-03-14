import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';


export default function Characters({navigation}) {
    const [characterData, setCharacterData] = useState([]);
    const [nextUrl, setNextUrl] = useState("")
    const [episode, setEpisode] = useState([])

    const fetchCharacters = async() => {
        const resp = await fetch("https://rickandmortyapi.com/api/character/?page=1")
        const data = await resp.json();
        setCharacterData(data.results)
        setNextUrl(data.info.next)
    }

    const fetchMoreCharacters = async() => {
        const resp = await fetch(nextUrl)
        const data = await resp.json();
        setCharacterData([...characterData, ...data.results])
        setNextUrl(data.info.next)
    }

    useEffect(() => {
        fetchCharacters();
    }, []);

    const renderItem = ({ item, index }) => (
        <View style={styles.mainview}>
           <TouchableOpacity style={styles.cardview} onPress={() => navigation.navigate('Character Details', {characterData: item})}>
                <View style={styles.characterimageview}>
                    <Image style={styles.characterimage} source = {{uri:item.image}} />
                </View>
                <View style={styles.charactersinfoview}>
                    <Text style={styles.charctersnametext}>{item.name}</Text>
                    <Text style={styles.characterspeciestext}>Species- {item.species} </Text>
                    <Text style={styles.statustext}>Status- {item.status}</Text>
                    <Text style={styles.gendertext}>Gender- {item.gender}</Text>
                </View>
           </TouchableOpacity>
        </View>
    )

    const loadMore = () => (
        <TouchableOpacity style={styles.loadmoretouchable} onPress={() => fetchMoreCharacters()}>
            <Text style={styles.loadmoretext}>Load More</Text>
        </TouchableOpacity>
    )
    
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular':require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf')
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      }  else {
    return(
        <View style={styles.finalview}>
        <FlatList
            data={characterData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListFooterComponent ={loadMore}
        />
        </View>
    )
    }
}


const styles = StyleSheet.create({
    finalview : {
        flex: 1,
        backgroundColor: "#121212"
    },
    mainview: {
        flex: 1,
        backgroundColor: "#121212"
    },
    cardview:{
        backgroundColor: "#282828",
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        flexDirection: "row"
    },
    characterimageview: {
        flex: 4,
        justifyContent: "center"
    },
    characterimage: {
        height: 130,
        width: 130,
        borderRadius: 8
    },
    charactersinfoview:{
        flex: 6,
        marginVertical: 8
    },
    charctersnametext: {
        fontFamily: "Poppins-SemiBold",
        color: "#f1f1f1",
        fontSize: 18
    },
    characterspeciestext : {
        fontFamily: "Poppins-Regular",
        color: "#f1f1f1",
        fontSize: 14
    },
    statustext: {
        fontFamily: "Poppins-Regular",
        color: "#f1f1f1",
        fontSize: 14
    },
    gendertext:{
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#f1f1f1"
    },
    loadmoretouchable: {
        marginHorizontal: 35,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: "#282828",
        paddingVertical: 15,
    },
    loadmoretext: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        color: "#f1f1f1",
        textAlign: "center"
    }
})