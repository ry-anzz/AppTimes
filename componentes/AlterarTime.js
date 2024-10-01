import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firestore } from "../Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function AlterarTime({navigation, route}) {

    const id = route.params.id;

    const [nome, setnome] = useState(route.params.nome);
    const [liga, setliga] = useState(route.params.liga);
    const [posicao, setposicao] = useState(route.params.posicao);


    async function alterarTime(id, nome, liga, posicao) {
        try {
            await updateDoc(doc(collection(firestore, "time"), id), {
                nome: nome,
                liga: liga,
                posicao: posicao
            })
            Alert.alert("Aviso", "time Alterado com sucesso.")
            navigation.navigate("Home")
        }
        catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }
        return (
            <View style={estilo.container}>
                <View>
                    <Text style={estilo.titulo}> Alterar dados do Time </Text>
                </View>
                <View>
                    <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite o Time" onChangeText={setnome} value={nome} />
                    <TextInput style={estilo.input} placeholder="Digite a Sigla" onChangeText={setliga} value={liga} />
                    <TextInput style={estilo.input} placeholder="Digite o valor" onChangeText={setposicao} value={posicao} />
                    <TouchableOpacity
                        style={estilo.btnenviar}
                        onPress={() => {
                            alterarTime(id, nome, liga, posicao);
                        }}>
                        <Text style={estilo.btntxtenviar}> Alterar </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    });