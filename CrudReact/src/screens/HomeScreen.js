import React, { useEffect } from "react";
import api from "../backend/api.js";
import { FlatList, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
    useEffect(() => {
        api.get(`/people`)
            .then((resposta) => {
                resposta.json();
            })
            .then((resposta) => {
                setPeople(resposta);
            })
            .catch((error) => {
                console.log(error);
            })
    });

    return (
        <FlatList 
            data={people}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.firstname} {item.lastname}</Text>
                    <Text>{item.email}</Text>
                </View>
            )}
        />
    );
}

export { HomeScreen }