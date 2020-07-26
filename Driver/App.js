import React, { createContext, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './Login'
import Home from './Home'


export const Driver_Context = createContext({})

export default function App() {
 const Stack = createStackNavigator()
 const[person,setperson] = useState('')
 const[id,setid] = useState('')
 
  return (
   <NavigationContainer>
     <Driver_Context.Provider value={{person,setperson,id,setid}}>
    <Stack.Navigator>
     <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
     <Stack.Screen name="Skynet" component={Home} options={{headerLeft:false}}/> 
    </Stack.Navigator>
     </Driver_Context.Provider>
   </NavigationContainer>
  );
}

