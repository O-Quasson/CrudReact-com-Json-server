import React, { useEffect } from "react";
import api from "../api/api.js";
import { FlatList } from 'react-native';

const HomeScreen = ({}) => {
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