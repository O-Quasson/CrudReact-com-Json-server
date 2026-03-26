import React, { useState } from "react";
import { View, TextInput, Button, Alert, Platform } from 'react-native';
import styles from "../styles/styles.js";
import { createPerson, updatePerson } from "../backend/peopleCrud.js";
import Swal from "sweetalert2";

export default function AddEditScreen({ route, navigation }) {
    const person = route.params?.person;

    const [firstname, setfirstname] = useState(person?.firstname);
    const [lastname, setlastname] = useState(person?.lastname);
    const [email, setemail] = useState(person?.email);
    const [serie, seserie_favorita] = useState(person?.serie_favorita ) ;

    async function save(){
        //tendo q fazer a verificação aqui pq ele n reconhece nenhum método na condição dentro do if por algum motivo
        //mesmo assim ainda não funciona, que merda
        //resolver isso depois
        const alerta = () => {
            if (Platform.OS === 'web') {
                Swal.fire("Erro!", "Nome e email devem ser preenchidos!", 'error');
            }else{
                Alert.alert("Erro!", "Nome e email devem ser preenchidos", [{text: "OK", onPress: () => console.log("OK Pressed")}], {cancelable: true})
            }
        }
        
        let tfirstname = firstname;
        let tlastname = lastname;
        let temail = email;
        let serie_favorita = serie;

        if((tfirstname===undefined)||(tlastname===undefined)||(temail===undefined)){
            alerta();
        }else{
            if((tfirstname.trim().length>0)&&(tlastname.trim().length>0)&&(temail.trim().length>0)){
                
                if((serie === undefined)||(serie_favorita.trim().length==0)){
                    serie_favorita = 'Nenhuma';
                }

                const data = { firstname, lastname, email, serie_favorita };
    
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

            <TextInput placeholder="Série Favorita" value={serie} onChangeText={seserie_favorita}/>

            <Button title="Salvar" onPress={save}/>

            <Button title="Cancelar" onPress={() => navigation.goBack()}/>
        </View>
    )
}
