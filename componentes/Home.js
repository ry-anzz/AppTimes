import React,{ useEffect, useState } from "react";
import { View,Text,StyleSheet,FlatList, TouchableOpacity,Alert, ImageBackground} from "react-native";
import { firestore } from "../Firebase"; 
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 

export default function Home({navigation}) {
           
    const [time, settime] = useState([]);

    async function deleteTime(id) {
        try{
            await deleteDoc(doc(firestore,'time',id));
            Alert.alert("O time foi deletado.")
        }catch(error){
            console.error("Erro ao deletar.", error)
        }
    }
       
    useEffect(()=>{
        const unsubcribe = onSnapshot(collection(firestore,'time'),(querySnapshot)=>{
            const lista = [];
            querySnapshot.forEach((doc)=>{
                lista.push({...doc.data(), id: doc.id});
            });
            settime(lista);
        });
        return () => unsubcribe();
    },[]);

    return(

        <ImageBackground
        source={require('../assets/background.jpg')} 
        style={estilo.background}>


        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo} >Lista de Times</Text>
            </View>
            <FlatList 
                data={time}
                renderItem={({item})=>{
                    return(
                        <View style={estilo.time}>
                            <TouchableOpacity onPress={()=>navigation.navigate("Alterar",{
                                id: item.id,
                                nome: item.nome,
                                liga: item.liga,
                                posicao: item.posicao
                            })}>
                                <View style={estilo.itens}>
                                    <Text> time: <Text>{item.nome}</Text></Text>
                                    <Text> liga: <Text>{item.liga}</Text></Text>
                                    <Text> posicao: <Text>{item.posicao}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View style={estilo.botaodeletar}>
                                <TouchableOpacity onPress={()=>{deleteTime(item.id)}}>
                                <Text>X</Text>
                                </TouchableOpacity>    
                            </View>    
                        </View>    
                    );
                }}
            />
            <TouchableOpacity style={estilo.addbutton} onPress={()=> navigation.navigate("Cadastrar")}>
                <Text>+</Text>
            </TouchableOpacity>
        </View>

        </ImageBackground>
    );
}

const estilo = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titulo:{
      marginTop: 50,
      fontSize:30,
      color: 'white',
      backgroundColor: 'black'
    },
    itens:{
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 10,
        backgroundColor: 'white'
    },
    criptos:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius:10 
    },
    botaodeletar:{
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    addbutton:{
    backgroundColor: '#ffffff',
    borderRadius: 50,
    position: 'absolute',
  
    bottom: -10,
    padding : 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    },
    background :{
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },

    });