import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

export default function CharacterDetails({navigation, route}) {
    const {characterData} = route.params;
    const [characterLocationDetails, setCharacterLocationDetails] = useState({})
    const [characterEpisodes, setCharacterEpisodes] = useState([])

    const fetchLocationDetails = async() => {
        const resp = await fetch(characterData.location.url)
        const data = await resp.json();
        setCharacterLocationDetails(data)
    }

    const processAndFetchEpisodes = async() => {
        var episodeList = characterData.episode.map((item) => {
            const urlSplit = item.split('/');
            return parseInt(urlSplit[urlSplit.length - 1]);
        })
        //console.log(episodeList);
        const resp = await fetch("https://rickandmortyapi.com/api/episode/" + episodeList)
        var data = await resp.json()
        //console.log(data);
        if(typeof data === 'object' && !Array.isArray(data)) {
            data = [data]
        }
        setCharacterEpisodes(data)
    }

    useEffect(() => {
        fetchLocationDetails();
        processAndFetchEpisodes();
    }, []);

    const renderItem = ({ item, index }) => (
        <View style={styles.episodelistview}>
            <Text style={styles.episodenametext}>{item.name}</Text>
        </View>
    )

    const characterInfo = () => (
        <View style={styles.primarycardview}>
                    <View style={styles.characterimageview}>
                        <Image style={styles.characterimage} source = {{uri:characterData.image}} />
                    </View>
                    <Text style={styles.charctersnametext}>{characterData.name}</Text>
                    <View style={styles.charactersinfoview}>
                        <View style={styles.speciesview}>
                            <Text style={styles.speciestext}>Species</Text>
                            <Text style={styles.characterspeciestext}>{characterData.species}</Text>
                        </View>
                        <View style={styles.statusview}>
                            <Text style={styles.speciestext}>Status</Text>
                            <Text style={styles.statustext}>{characterData.status}</Text>
                        </View>
                        <View style={styles.genderview}>
                            <Text style={styles.speciestext}>Gender</Text>
                            <Text style={styles.gendertext}>{characterData.gender}</Text>
                        </View>
                    </View>
                <View style={styles.secondarycardview}>
                    <View style={styles.originview}>
                        <Text style={styles.origintitle}>Origin</Text>
                        <Text style={styles.origintext}>{characterData.origin.name}</Text>
                    </View>
                    <View style={styles.originview}>
                        <Text style={styles.origintitle}>Location Name</Text>
                        <Text style={styles.origintext}>{characterLocationDetails.name}</Text>
                    </View>
                    <View style={styles.originview}>
                        <Text style={styles.origintitle}>Location  Type</Text>
                        <Text style={styles.origintext}>{characterLocationDetails.type}</Text>
                    </View>
                    <View style={styles.originview}>
                        <Text style={styles.origintitle}>Dimension</Text>
                        <Text style={styles.origintext}>{characterLocationDetails.dimension}</Text>
                    </View>
                    <View style={styles.originview}>
                        <Text style={styles.origintitle}>Residents count</Text>
                        <Text style={styles.origintext}>{characterLocationDetails.residents?.length}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.episodelisttitle}>Featured in</Text>
                </View>
        </View>
    )


    return(
        <View style={styles.mainview}>
            <FlatList
                style = {styles.flatliststyling}
                data={characterEpisodes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={characterInfo}
                ListFooterComponent = {<View style={{height: 20}}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        backgroundColor: "#121212",
    },
    characterimageview: {
        alignSelf: "center",
        marginVertical: 10
    },
    characterimage: {
        height: 130,
        width: 130,
        borderRadius: 65
    },
    charactersinfoview:{
        flexDirection: "row",
        marginTop: 10
    },
    charctersnametext: {
        fontFamily: "Poppins-SemiBold",
        color: "#f1f1f1",
        fontSize: 22,
        textAlign: "center",
        marginVertical: 5
    },
    characterspeciestext : {
        fontFamily: "Poppins-SemiBold",
        color: "#f1f1f1",
        fontSize: 16,
        textAlign: "center"
    },
    statustext: {
        fontFamily: "Poppins-SemiBold",
        color: "#f1f1f1",
        fontSize: 16,
        textAlign: "center"
    },
    gendertext:{
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: "#f1f1f1",
        textAlign: "center"
    },
    secondarycardview: {
        marginVertical: 10,
        marginLeft: 5
    },
    episodelisttitle: {
        fontFamily: "Poppins-SemiBold",
        color: "#f1f1f1",
        fontSize: 18,
        marginLeft: 5,
        textAlign: "center"
    },
    episodenametext: {
        fontFamily: "Poppins-Regular",
        color: "#f1f1f1",
        fontSize: 14,
        paddingHorizontal: 20,
        textAlignVertical: "center"
    },
    flatliststyling: {
        backgroundColor: "#282828",
        marginVertical: 10,
        marginHorizontal: 12,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    speciesview: {
        flex: 3,
        backgroundColor: "#404040",
        borderRadius: 5,
        paddingVertical: 12,
        marginHorizontal: 5
    },
    statusview: {
        flex: 4,
        backgroundColor: "#404040",
        borderRadius: 5,
        paddingVertical: 12,
        marginHorizontal: 5
    },
    genderview:{
        flex: 3,
        backgroundColor: "#404040",
        borderRadius: 5,
        paddingVertical: 12,
        marginHorizontal: 5
    },
    speciestext:{
        fontFamily: "Poppins-Regular",
        color: "#b3b3b3",
        fontSize: 12,
        textAlign: "center",
        paddingBottom: 2
    },
    originview: {
        backgroundColor: "#404040",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        marginVertical: 5,
    },
    origintext: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        color: "#f1f1f1",
        flex: 2,
        textAlignVertical: "center"
    },
    origintitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        color: "#b3b3b3",
        flex: 1
    },
    episodelistview: {
        backgroundColor:"#404040",
        marginVertical: 5,
        borderRadius: 8,
        paddingVertical: 10
    }
})