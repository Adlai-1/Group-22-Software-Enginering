import React, { useState, useEffect, useContext } from 'react';
import {Text,View,FlatList,TouchableOpacity,Modal,TextInput,ScrollView,ActivityIndicator} from 'react-native';
import {Icon} from "react-native-elements";
import {Alert} from 'react-native';
import { request } from "graphql-request";
import { Customer_Context } from "./App";
import Axios from 'axios'


export default function Request({navigation}) {
  const[modal,setmodal] = useState(false)
  const[see,setsee] = useState(true)

  //..........Variables for Request forms..
  const[parcel,setparcel] = useState('')
  const[desc,setdesc] = useState('')
  const[pickup,setpickup] = useState('')
  const[name,setname] = useState('')
  const[contact,setcontact] = useState('')
  const[dropoff,setdropoff] = useState('')
  const[visi,setvisi] = useState(false)

  //............Variables put on Display for Tracking Parcel..
  const[req,setreq] = useState([])
  const{person} = useContext(Customer_Context)
  
  //Query for making Request....
  const query = `{
    Customer_Delivery(username:"${person}"){
     _id
     Recepient_Name
     Recepient_Contact
     Dropoff_Address
     Parcel_Type
     Parcel_Description
     Pickup_Made
     createdAt
   }
   }`

   const query1 = `mutation{
    Delivery_Request(Username:"${person}",Parcel_Type:"${parcel}",Parcel_Description:"${desc}",
    Pickup_Addess:"${pickup}",Dropoff_Address:"${dropoff}",Recepient_Contact:"${contact}",Recepient_Name:"${name}"){
      _id
    }
  }`

  useEffect(()=>{
    const abortcontroll = new AbortController()
    const signal = abortcontroll.signal
  
     request('https://powerful-bastion-17180.herokuapp.com/graphql',query,{signal:signal})
     .then((res)=>{
       setreq(res.Customer_Delivery)
       setsee(false)
     })
     .catch((err)=>{
       console.log(err)
     })
  
     return function cleanup(){
      abortcontroll.abort()
    }
  
   },[])

  const Load_Delivery = ()=>{
    const abortcontroll = new AbortController()
    const signal = abortcontroll.signal
  
     request('https://powerful-bastion-17180.herokuapp.com/graphql',query,{signal:signal})
     .then((res)=>{
       setreq(res.Customer_Delivery)
       setsee(false)
     })
     .catch((err)=>{
       console.log(err)
     })
  
     return function cleanup(){
      abortcontroll.abort()
    },[]
  }

   const Request = ()=>{

     Axios({
       url: 'https://powerful-bastion-17180.herokuapp.com/graphql',
       method: 'post',
       data : {query:query1},
       headers:{
        'Content-Type': 'application/json'
       }
     })
     .then((res)=>{console.log(res.status)
      setvisi(false)
       if(res.status=="200"){
         Alert.alert("Syknet Delivery Request","Your Request has been recieved.You can track its progress in the User Dashboard")
         setmodal(!modal)
       }})
     .catch((err)=>{
       setvisi(false)
       Alert.alert("Database Error","Unable to Store your Request due."),
       setmodal(!modal)
       console.log(err)
     })

   }

//.....Function to allow Tracking of Parcels.....
const Allowance = ({status})=>{
  if(status == "true"){
    navigation.navigate('Maps')
  }
  else{
    Alert.alert('Notice','Unable to begin Tracking because Package has not been picked by us.')
  }
}


//Views for the Request...!!!
const Display = ({drop,recep,pack,desc,date,phone,status})=>{
 return(
 <View >
  <TouchableOpacity onPress={()=> Allowance({status})} style={{flexDirection:"row",flex:1,borderWidth:1.5,borderColor:"#eee",borderRadius:5,marginBottom:10,padding:10}}>
  <View style={{padding:10,justifyContent:"center",flex:3}}>
   <Text style={{fontWeight:"bold",marginTop:1}}>Drop-off Location : {drop}</Text>
   <Text style={{fontWeight:"bold",marginTop:1}}>Recepient Name : {recep}</Text>
   <Text style={{fontWeight:"bold",marginTop:1}}>Recepient Conatct : {phone}</Text>
   <Text style={{fontWeight:"bold",marginTop:1}}>Package Type : {pack}</Text>
   <Text style={{fontWeight:"bold",marginTop:1}}>Package Description : {desc}</Text>
   <Text style={{fontWeight:"bold",marginTop:1}}>Request Made on : {date.slice(0,10)}</Text>
  </View>
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
   <Icon name="directions" color="green" size={40}/>
  </View>
  </TouchableOpacity>
 </View>
    )
}

const Prior = ()=>{
  return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white",padding:10}}>
     <Icon name="ios-paper-plane" color="red" size={120} type="ionicon"/>
     <TouchableOpacity onPress={()=>{setmodal(!modal)}} style={{padding:10,marginTop:10,borderWidth:0.3,borderColor:"grey",alignItems:"center",justifyContent:"center",width:200,borderRadius:10}}>
      <Text style={{fontWeight:"bold",fontSize:18}}>Place an Order?</Text>
     </TouchableOpacity>
    </View>
  )
}


const Reqview = ()=>{
  return(
    <FlatList data={req} keyExtractor={(item)=>item._id} renderItem={({item})=> <Display  status={item.Pickup_Made} phone={item.Recepient_Contact} date={item.createdAt} desc={item.Parcel_Description} pack={item.Parcel_Type} recep={item.Recepient_Name} drop={item.Dropoff_Address}/>}/>
  )
}

const Disview = ()=>{
  if(req.length == 0){
    return(                         
      <Prior/>
    )
  }
  else{
    return(
      <Reqview/>
    )
  }
}

return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
     <View style={{width:"100%",height:"100%",padding:5,justifyContent:"center"}}>
      {see?<ActivityIndicator size={60} color="red" style={{position:"absolute",alignSelf:"center"}}/>:Disview()}
     </View> 
     <TouchableOpacity onPress={()=>{setmodal(!modal)}} style={{width:70,height:70,borderRadius:35,backgroundColor:"black",position:"absolute",padding:10,bottom:20,right:20,justifyContent:"center",alignItems:"center"}}>
      <Icon name="add" color="white" size={30}/>
     </TouchableOpacity>
     <Modal visible={modal} animationType="slide">
       <TouchableOpacity onPress={()=>{setmodal(!modal)}} style={{padding:10,alignItems:"flex-start"}}>
        <Icon name="close"/> 
       </TouchableOpacity>
      <ScrollView>
      <View style={{flex:1,alignItems:"center",justifyContent:"center",padding:10}}>
       <Icon name="ios-document" size={120} type="ionicon"/>
       <Text style={{fontWeight:"bold"}}>Make your Request...</Text>

      <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
       <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
       <TextInput placeholder="Parcel Type" style={{fontSize:18}} onChangeText={(text)=>{
         setparcel(text)
       }}/>
       </View>
      <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
       <Icon name="folder" size={35}/>
       </View>
      </View>

      <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
       <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
       <TextInput placeholder="Parcel Description"  style={{fontSize:18}} multiline={true} onChangeText={(text)=>{
         setdesc(text)
       }}/>
       </View>
      <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
       <Icon name="attach-file" size={35}/>
       </View>
      </View>

      <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
       <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
       <TextInput placeholder="Pickup Address" style={{fontSize:18}} onChangeText={(text)=>{
         setpickup(text)
       }}/>
       </View>
      <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
       <Icon name="near-me" size={35}/>
       </View>
      </View>

      <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
       <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
       <TextInput placeholder="Recepient's Name" style={{fontSize:18}} onChangeText={(text)=>{
         setname(text)
       }}/>
       </View>
      <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
       <Icon name="face" size={35}/>
       </View>
      </View>

      <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
       <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
       <TextInput placeholder="Recepient's Contact" style={{fontSize:18}} keyboardType="numeric" onChangeText={(text)=>{
         if(text.length == 10){setcontact(text)}
       }}/>
       </View>
      <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
       <Icon name="phone" size={35}/>
       </View>
      </View>

      <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
       <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
       <TextInput placeholder="Drop-off Address" style={{fontSize:18}} onChangeText={(text)=>{
         setdropoff(text)
       }}/>
       </View>
      <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
       <Icon name="navigation" size={35}/>
       </View>
      </View>
       {visi?<ActivityIndicator color="red" size={50} style={{position:"absolute"}}/>:console.log("Done")}
       <TouchableOpacity onPress={()=>{setvisi(true),Request();Load_Delivery()}} style={{marginTop:20,backgroundColor:"red",padding:20,width:"100%",alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:"white"}}>Sign Up</Text>
       </TouchableOpacity>
      </View>
      </ScrollView>
     </Modal>
    </View>
  );
}


