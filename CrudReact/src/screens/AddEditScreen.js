import React, { useState } from "react";
import { View, TextInput, Button, Alert } from 'react-native';
import styles from "../styles/styles.js";
import { createPerson, updatePerson } from "../backend/peopleCrud.js";

export default function AddEditScreen({ route, navigation }) {
    const person = route.params?.person;

    const [firstname, setfirstname] = useState(person?.firstname);
    const [lastname, setlastname] = useState(person?.lastname);
    const [email, setemail] = useState(person?.email);
    const [serie, setserie] = useState(person?.serie_favorita);

    async function save(){
        //tendo q fazer a verificação aqui pq ele n reconhece nenhum método na condição dentro do if por algum motivo
        //mesmo assim ainda não funciona, que merda
        let tfirstname = firstname;
        let tlastname = lastname;
        let temail = email;
        let tserie = serie||"Nenhuma";

        if((tfirstname===undefined)||(tlastname===undefined)||(temail===undefined)){
            console.log("Erro! O código tá uma merda e não funciona!")
            Alert.alert("Erro!", "Nome e email devem ser preenchidos", [{text: "OK", onPress: () => console.log("OK Pressed")}], {cancelable: true});
        }else{
            if((tfirstname.trim().length>0)&&(tlastname.trim().length>0)&&(temail.trim().length>0)){
                const data = { tfirstname, tlastname, temail, tserie };
    
                 if(person){
                    await updatePerson(person.id, data);
                }else{
                    await createPerson(data);
                } 
                
                navigation.goBack();
            }else{
                console.log("Erro! O código tá uma merda e não funciona!")
                Alert.alert("Erro!", "Nome e email devem ser preenchidos", [{text: "OK", onPress: () => console.log("OK Pressed")}], {cancelable: true});
            }
            
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