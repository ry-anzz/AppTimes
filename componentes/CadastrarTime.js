import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ImageBackground
} from 'react-native';
import { firestore } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CadastrarTime({navigation}) {

    const [nome, setnome] = useState(null);
    const [liga, setliga] = useState(null);
    const [posicao, setposicao] = useState(null);

    async function addTime() {
        try {
            const docRef = await addDoc(collection(firestore, 'time'), {
                nome: nome,
                liga: liga,
                posicao: posicao
            });
            console.log("Cadastrado com ID: ", docRef.id);
            Alert.alert("Cadastro", "Registros cadastrados com sucesso")
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
            Alert.alert("Erro", "Erro ao cadastrar . Por favor, tente novamente.");
        }
    }

    return (

        <ImageBackground
        source={require('../assets/background.jpg')} 
        style={estilo.background}>

        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}> Cadastre um novo time</Text>
            </View>

            <TextInput style={estilo.input} placeholder="Digite o nome" onChangeText={setnome} value={nome} />
            <TextInput style={estilo.input} placeholder="Digite a liga" onChangeText={setliga} value={liga} />
            <TextInput style={estilo.input} placeholder="Digite a posição" onChangeText={setposicao} value={posicao} />

            <TouchableOpacity
                style={estilo.btnenviar}
                onPress={() => {
                    addTime();
                }}>
                <Text style={estilo.btntxtenviar}> Enviar </Text>
            </TouchableOpacity>
        </View>

        </ImageBackground>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#9ac234',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        borderRadius: 10,
    },
    btnenviar: {
        marginTop: 20,
    },
    btntxtenviar: {
        fontSize: 25,
    },
    titulo: {
        marginVertical: 40,
        fontSize: 25,
        textAlign: 'center',
    },
        background :{
            flex: 1,
            justifyContent: 'center', 
            alignItems: 'center', 
        },
    

});