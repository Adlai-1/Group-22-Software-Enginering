import React from 'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Delivery from './Deliveries'
import Map from './Map'
import Records from './Records'

export default function Home() {
  const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator barStyle={{backgroundColor:"white"}} activeColor="red">
      <Tab.Screen name="Deliveries" component={Delivery} options={{tabBarIcon:"truck"}}/>
      <Tab.Screen name="Maps" component={Map} options={{tabBarIcon:"map"}}/>
      <Tab.Screen name="Records" component={Records} options={{tabBarIcon:"file"}}/>
    </Tab.Navigator>
  );
}

