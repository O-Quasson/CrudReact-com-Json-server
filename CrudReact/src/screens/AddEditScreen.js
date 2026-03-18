import React, { useState } from "react";
import { View, TextInput, Button } from 'react-native';
import styles from "../styles/styles.js";
import { createPerson, updatePerson } from "../backend/peopleCrud.js";

export default function AddEditScreen({ route, navigation }) {
    const person = route.params?.person;

    const [firstname, setfirstname] = useState(person?.firstname || "");
    const [lastname, setlastname] = useState(person?.lastname || "");
    const [email, setemail] = useState(person?.email || "");

    async function save(){
        const data = { firstname, lastname, email };

        if(person){
            await updatePerson(person.id, data);
        }else{
            await createPerson(data);
        }

        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <TextInput placeholder="First Name" value={firstname} onChangeText={setfirstname}/>

            <TextInput placeholder="Last Name" value={lastname} onChangeText={setlastname}/>

            <TextInput placeholder="Email" value={email} onChangeText={setemail}/>

            <Button title="Salvar" onPress={save}/>

            <Button title="Cancelar" onPress={() => navigation.goBack()}/>
        </View>
    )
}