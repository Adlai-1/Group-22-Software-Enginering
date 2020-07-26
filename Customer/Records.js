import React, { useState, useEffect, useContext } from 'react';
import {Text, View, FlatList,ActivityIndicator} from 'react-native';
import { Avatar,Icon } from "react-native-elements";
import { request } from "graphql-request";
import { Customer_Context } from "./App";

export default function Records() {

const[req,setreq] = useState([])
const[visi,setvisi] = useState(true)
const{person} = useContext(Customer_Context)

const query = `{
  Completed_Deliveries(username:"${person}"){
   Recepient_Name
   Driver
   Dropoff_Address
   updatedAt
 }
 }`


 useEffect(()=>{
  const abortcontroll = new AbortController()
  const signal = abortcontroll.signal

   request('https://powerful-bastion-17180.herokuapp.com/graphql',query,{signal:signal})
   .then((res)=>{
     setreq(res.Completed_Deliveries)
     setvisi(false)
   })
   .catch((err)=>{
     console.log(err)
   })

   return function cleanup(){
    abortcontroll.abort()
  }

 },[])
 

const Display = ({name,drop,time,car})=>{
 return(
 <View >
  <View style={{flexDirection:"row",flex:1,borderWidth:1.5,borderColor:"#eee",borderRadius:5,marginBottom:10,padding:10}}>
  <View style={{padding:10,justifyContent:"center",flex:3}}>
   <Text style={{fontWeight:"bold"}}>Package Recieved by : {name}</Text>
   <Text style={{fontWeight:"bold"}}>Package Delivered by : {car}</Text>
   <Text style={{fontWeight:"bold"}}>Drop-off Location : {drop}</Text>
   <Text style={{fontWeight:"bold"}}>Completed : {time.slice(0,10)} 17:30 pm</Text>
  </View>
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
   <Avatar rounded={true} size={50} icon={{name:"check"}} overlayContainerStyle={{backgroundColor:"green"}}/>
  </View>
  </View>
 </View>
    )
}

const Priorview = ()=>{
  return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white",padding:10}}>
     <Icon name="ios-document" color="red" size={120} type="ionicon"/>
     <Text style={{fontWeight:"bold",fontSize:18,marginTop:10}}>You Have no Delivery Records...</Text>
    </View>
  )
}

const Reco_view = ()=>{
  return(
    <FlatList data={req} keyExtractor={(item)=>item._id} renderItem={({item})=> <Display time={item.updatedAt} drop={item.Dropoff_Address} name={item.Recepient_Name} car={item.Driver}/>}/>
  )
}

const Disview = ()=>{
  if(req.length == 0){
    return(
      <Priorview/>
    )
  }
  else{
    return(<Reco_view/>)
  }
}

 return (
    <View style={{alignItems:"center",justifyContent:"center",flex:1,backgroundColor:"white"}}>
     <View style={{width:"100%",height:"100%",padding:5}}>
       {visi?<ActivityIndicator color="red" size="large"/>:Disview()}
     </View>
    </View>
  );
}


