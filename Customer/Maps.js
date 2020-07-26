import React, { useState,useEffect } from 'react';
import {View,ActivityIndicator} from 'react-native';
import Mapview from 'react-native-maps'
import { request } from "graphql-request";


export default function Maps() {
  const [cords,setcorde] = useState([])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((location)=>{
      const Data ={
        Long : location.coords.longitude,
        Lati : location.coords.latitude,
        Speed : location.coords.speed,
        Time : location.timestamp
      }
      setcorde(Data)
    })
  })
   
  return (
    <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
      <Mapview style={{width:"100%",height:"100%"}} initialRegion={{
        latitude: 5.5322923 ,
        longitude: -0.4884842,
        latitudeDelta : 0.0922,
        longitudeDelta: 0.0421
      }} showsUserLocation={true} onRegionChange={(region)=>{
        region.longitude = cords.Long,
        region.latitude = cords.Lati,
        region.latitudeDelta = 0.0922,
        region.longitudeDelta = 0.0421
      }} showsBuildings={true} showsScale={true} showsMyLocationButton={true} />
    </View>
  );
}


