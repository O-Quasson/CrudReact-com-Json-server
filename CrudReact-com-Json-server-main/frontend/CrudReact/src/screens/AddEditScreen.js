import React, { useState } from "react";
import { View, TextInput, Button, Alert, Platform } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import styles from "../styles/styles.js";
import { createPerson, updatePerson } from "../backend/peopleCrud.js";
import Swal from "sweetalert2";

export default function AddEditScreen({ route, navigation }) {
    const person = route.params?.person;

    const [firstname, setfirstname] = useState(person?.firstname);
    const [lastname, setlastname] = useState(person?.lastname);
    const [email, setemail] = useState(person?.email);
    const [phone, setphone] = useState(person?.phone);
    const [serie, seserie_favorita] = useState(person?.serie_favorita);

    async function save(){

        const alerta = () => {
            if (Platform.OS === 'web') {
                Swal.fire("Erro!", "Nome, email e telefone devem ser preenchidos!", 'error');
            }else{
                Alert.alert("Erro!", "Nome, email e telefone devem ser preenchidos!", [{text: "OK", onPress: () => console.log("OK Pressed")}], {cancelable: true})
            }
        }
        
        let tfirstname = firstname;
        let tlastname = lastname;
        let temail = email;
        let telefone = phone;
        let serie_favorita = serie;

        if((tfirstname===undefined)||(tlastname===undefined)||(temail===undefined)||(telefone===undefined)){
            alerta();
        }else{
            if((tfirstname.trim().length>0)&&(tlastname.trim().length>0)&&(temail.trim().length>0)&&(telefone.trim().length>0)){
                
                if((serie === undefined)||(serie_favorita.trim().length==0)){
                    serie_favorita = 'Nenhuma';
                }

                let firstname = tfirstname.charAt(0).toUpperCase() + tfirstname.slice(1)

                const data = { firstname, lastname, email, phone, serie_favorita };
    
                if(person){
                    await updatePerson(person.id, data);
                }else{
                    await createPerson(data);
                } 
                
                navigation.goBack();
            }else{
                alerta();
            }
            
        }

    }

    return(
        <View style={[styles.container, {}]}>
            <TextInput placeholder="First Name" value={firstname} onChangeText={setfirstname}/>

            <TextInput placeholder="Last Name" value={lastname} onChangeText={setlastname}/>

            <TextInput placeholder="Email" value={email} onChangeText={setemail}/>

            <MaskInput placeholder="Telefone" value={phone} onChangeText={(masked, unmasked) => {setphone(masked)}} mask={Masks.BRL_PHONE} keyboardType="numeric" />

            <TextInput placeholder="Série Favorita" value={serie} onChangeText={seserie_favorita}/>

            <Button title="Salvar" onPress={save}/>

            <Button title="Cancelar" onPress={() => navigation.goBack()}/>
        </View>
    )
}
