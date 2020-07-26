import React, { createContext, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './Login'
import Home from './Home'
import Trial from './Trial'


export const Customer_Context = createContext({})

export default function App() {
  const[person,setperson] = useState('')
  const Stack = createStackNavigator()
  
  return (
    <NavigationContainer>
      <Customer_Context.Provider value={{person,setperson}}>
     <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Skynet" component={Home} options={{headerLeft:null}}/>
      <Stack.Screen name="Signup" component={Trial} options={{headerLeft:null}}/>
     </Stack.Navigator>
     </Customer_Context.Provider>
    </NavigationContainer>
  );
}


