import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Button, Dimensions } from 'react-native';
import styles from "../styles/styles.js";
import { getPeople, deletePerson } from "../backend/peopleCrud.js";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {

    const [people, setPeople] = useState([]);
    async function loadPeople(){
        const data = await getPeople();
        setPeople(data);
    }

    useEffect(() => {
        loadPeople();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pessoas</Text>
            <Button title="Adicionar pessoa" onPress={() => navigation.navigate("AddEdit")} />

            <FlatList 
                data={people}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CardPersonal item={item} navigation={navigation} refresh={loadPeople} />
                )}
            />
        </View>
    );
}

function CardPersonal({item, navigation, refresh}){
    return(
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{item.firstname} {item.lastname}</Text>

                <Text style={styles.email}>{item.email}</Text>
            </View>

            <View>
                <Button title="Editar" onPress={() => navigation.navigate("AddEdit", {person:item})}/>

                <Button title="Deletar" onPress={async ()=>{
                    await deletePerson(item.id);
                    refresh();
                }}/>
            </View>
        </View>
    )
}

export { HomeScreen }