import React,{useEffect,useState,useContext} from 'react';
import {Text,View,Alert} from 'react-native';
import Mapview from 'react-native-maps'
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Driver_Context} from "./App";
import Axios from 'axios';


export default function Map() {
  const [cords,setcorde] = useState([])
  const {id} = useContext(Driver_Context)
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
  const {person} = useContext(Driver_Context)

  const query = `mutation{
    Completed(status:true,_id:"${id}"){
      Parcel_Type
      Driver
      Completed
      updatedAt
    }
    Moved(Driver:"${person}",status:false){
      Username
      On_Delivery
    }
  }`

  const Done_Button = ()=>{
    Axios({
      url:"https://powerful-bastion-17180.herokuapp.com/graphql",
      method: 'post',
      data: {query:query},
      headers:{
        'Content-Type': 'application/json'
       }
    })
    .then(res=>{
      console.log(res.status)
    Alert.alert("Skynet Driver","Good!, the necessary data is been sent and stored")})
    .catch(err=>{
      Alert.alert("Network Issue","Unable to send Details. It may be due to network problems")
    })
  }
   
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
      <View style={{flexDirection:"row",elevation:10.0,alignItems:"center",borderRadius:12,justifyContent:"center",position:"absolute",bottom:20,right:20,backgroundColor:"#eee"}}>
        <TouchableOpacity onPress={()=>{Done_Button()}} style={{padding:5}}>
          <Text style={{padding:5,fontWeight:"bold",fontSize:20}}>Done!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

