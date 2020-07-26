import React from 'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Maps from './Maps'
import Request from './Request'
import Records from './Records'

export default function Home() {
  const Tabs = createMaterialBottomTabNavigator()
  return (
    <Tabs.Navigator barStyle={{backgroundColor:"white"}} activeColor="red">
     <Tabs.Screen name="Request" component={Request} options={{tabBarIcon:"truck"}}/>
     <Tabs.Screen name="Maps" component={Maps} options={{tabBarIcon:"map"}}/>
     <Tabs.Screen name="Records" component={Records} options={{tabBarIcon:"folder"}}/>
    </Tabs.Navigator>
  );
}


