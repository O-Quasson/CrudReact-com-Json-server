import React, { useState } from "react";
import { View, TextInput, Button, Alert } from 'react-native';
import styles from "../styles/styles.js";
import { createPerson, updatePerson } from "../backend/peopleCrud.js";

export default function AddEditScreen({ route, navigation }) {
    const person = route.params?.person;

    const [firstname, setfirstname] = useState(person?.firstname);
    const [lastname, setlastname] = useState(person?.lastname);
    const [email, setemail] = useState(person?.email);
    const [serie, setserie] = useState(person?.serie_favorita || "Nenhuma");

    async function save(){
        //tendo q fazer a verificação aqui pq ele n reconhece nenhum método na condição dentro do if por algum motivo
        //mesmo assim ainda não funciona, que merda
        let tfirstname = firstname.trim()||"";
        let tlastname = lastname.trim()||"";
        let temail = email.trim()||"";
        let tserie = serie.trim();

        if((tfirstname.length>0)&&(tlastname.length>0)&&(temail.length>0)){
            const data = { tfirstname, tlastname, temail, tserie };

             if(person){
                await updatePerson(person.id, data);
            }else{
                await createPerson(data);
            } 
            
            navigation.goBack();
        }else{
            Alert.alert("Erro!", "Nome e email devem ser preenchidos");
        }

    }

    return(
        <View style={styles.container}>
            <TextInput placeholder="First Name" value={firstname} onChangeText={setfirstname}/>

            <TextInput placeholder="Last Name" value={lastname} onChangeText={setlastname}/>

            <TextInput placeholder="Email" value={email} onChangeText={setemail}/>

            <TextInput placeholder="Série Favorita" value={serie} onChangeText={setserie}/>

            <Button title="Salvar" onPress={save}/>

            <Button title="Cancelar" onPress={() => navigation.goBack()}/>
        </View>
    )
}