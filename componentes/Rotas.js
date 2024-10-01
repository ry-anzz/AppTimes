import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { ImageBackground, StyleSheet } from 'react-native';


    

import Home  from './Home';
import Cadastrar  from './CadastrarTime';
import Alterar from './AlterarTime';
  

const Stack = createStackNavigator();




export default function Rotas() {
    return(

       

        <Stack.Navigator>
            <Stack.Screen  name="Home" component={Home}  />
            <Stack.Screen  name="Cadastrar" component={Cadastrar}  />
            <Stack.Screen  name="Alterar" component={Alterar}  />
        </Stack.Navigator>

       
    );
}

