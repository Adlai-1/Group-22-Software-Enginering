import React,{useState,useEffect,useContext} from 'react';
import {Text,View,ActivityIndicator,FlatList,TouchableOpacity,Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {request} from 'graphql-request'
import {Driver_Context} from "./App"
import Axios from 'axios';


export default function Deliveries({navigation}) {
const[visi,setvisi] = useState(false)
const[arr,setarr] = useState([])


const {person,id,setid} = useContext(Driver_Context)

const query = `{
  Driver_Delivery(driver:"${person}"){
    _id
    Recepient_Name
    Recepient_Contact
    Dropoff_Address
  }
}`

useEffect(()=>{
  const abortcontroll = new AbortController()
  const signal = abortcontroll.signal

  request('https://powerful-bastion-17180.herokuapp.com/graphql',query,{signal:signal})
  .then((res)=>{
    setarr(res.Driver_Delivery)
    setvisi(false)
  })
  .catch((err)=>{
    console.log(err)
  })

  return function cleanup(){
   abortcontroll.abort()
 }

},[])

const query1 = `mutation{
  Delivering(status:true,_id:"${id}"){
    _id
    Driver
  }
  Moved(status:true,Driver:"${person}"){
    Username
    On_Delivery
  }
}`

const On_Delivery = ()=>{
      Axios({
        method: 'post',
        url : 'https://powerful-bastion-17180.herokuapp.com/graphql',
        data : {query:query1},
        headers:{
          'Content-Type': 'application/json'
         }
      })
      .then((res)=>{
        if(res.status == "200"){
          console.log(res.status)
          navigation.navigate('Maps')
        }
        else{
          Alert.alert("Network issue","Unable to show maps to start Delivery. Make sure your Connection is good and stable.")
        }
      })
      .catch((err)=>{Alert.alert("Network Problem","Network Error")})
}


const Display = ({name,drop,phone,id})=>{
 return(
 <View>
  <TouchableOpacity onPress={()=>{setid(id);On_Delivery()}} style={{flexDirection:"row",flex:1,borderWidth:1.5,borderColor:"#eee",borderRadius:5,marginBottom:10,padding:10}}>
  <View style={{padding:10,justifyContent:"center",flex:3}}>
   <Text style={{fontWeight:"bold"}}>Package Recepient : {name}</Text>
   <Text style={{fontWeight:"bold"}}>Recepient Contact : {phone}</Text>
   <Text style={{fontWeight:"bold"}}>Drop-off Location : {drop}</Text>
  </View>
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
   <Icon name="directions-car" size={40}/>
  </View>
  </TouchableOpacity>
 </View>
    )
}

const Delivery_list = ()=>{
  return(
    <FlatList data={arr} keyExtractor={(item)=>item.id} renderItem={({item})=> <Display id={item._id} name={item.Recepient_Name} drop={item.Dropoff_Address} phone={item.Recepient_Contact}/>} showsVerticalScrollIndicator={false}/>
  )
}

const Prior_view = ()=>{
  return(
  <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white",padding:10}}>
    <Icon name="ios-document" color="red" size={120} type="ionicon"/>
    <Text style={{fontWeight:"bold",fontSize:18,marginTop:10}}>You Have no Deliveries to make...</Text>
  </View>
  )
}

const Disview = ()=>{
  if(arr.length == 0){
    return(
      <Prior_view/>
    )
  }
  else{
    return(<Delivery_list/>)
  }
}

  return (
    <View style={{justifyContent:"center",flex:1,backgroundColor:"white",padding:10}}>
     {visi?<ActivityIndicator color="red" size="large"/>:Disview()}
    </View>
  );
}

