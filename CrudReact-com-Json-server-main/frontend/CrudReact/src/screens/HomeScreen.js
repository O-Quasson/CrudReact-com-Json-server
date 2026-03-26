import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Button, Dimensions, TextInput, ActivityIndicator, Platform, Alert } from 'react-native';
import styles from "../styles/styles.js";
import { getPeople, deletePerson } from "../backend/peopleCrud.js";
import Swal from "sweetalert2";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {

    const alerta = () => {
        if (Platform.OS === 'web') {
            Swal.fire("Erro!", "API indisponível!", 'error');
        }else{
            Alert.alert("Erro!", "API indisponível!", [{text: "OK", onPress: () => console.log("OK Pressed")}], {cancelable: true})
        }
    }

    let coiso = () => {
        if(deuerro==false){
            if(loading==false){
                return(
                    <FlatList 
                        data={people}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <CardPersonal item={item} navigation={navigation} refresh={loadPeople} />
                        )}
                    />
                )
            }else{
                return(
                    <View style={[{justifyContent: 'center', alignItems: 'center', flex: 1}]}>
                        <ActivityIndicator size="large"/>
                    </View>
                    
                )
                
            }
        }else{
            alerta();
        }
    }

    const [people, setPeople] = useState([]);
    let [filtro, setfiltro] = useState("");
    let [loading, setloading] = useState(true);
    let [deuerro, seterro] = useState(false);

    const filtrar = (texto) => {
        if((isNaN(texto))&&(texto.length>0)){
            //deveria existir uma função mais fácil pra capitalizar a primeira letra 
            let texto2 = texto.charAt(0).toUpperCase() + texto.slice(1)
            setfiltro(`?firstname=${encodeURIComponent(texto2)}`);
        }else{
            setfiltro("");
        }
    }

    async function loadPeople(){
        try{
            const data = await getPeople(filtro);
            setloading(false);
            console.log(data);
            setPeople(data);
        }catch(error){
            seterro(true);
        }
    }

    useEffect(() => {
        loadPeople(filtro);
    }, [filtro]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pessoas</Text>
            <TextInput placeholder="Pesquisar por primeiro nome" onSubmitEditing={(texto) => filtrar(texto.nativeEvent.text)} style={[{backgroundColor: "#e6e6e6", padding: 5, marginBottom: 5}]}></TextInput>
            <Button title="Adicionar pessoa" onPress={() => navigation.navigate("AddEdit")}/>

                {coiso()}

            

        </View>
    );
}

function CardPersonal({item, navigation, refresh}){
    return(
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{item.firstname} {item.lastname}</Text>

                <Text style={styles.email}>{item.email}</Text>

                <Text style={styles.email}>{item.serie_favorita}</Text>
                
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