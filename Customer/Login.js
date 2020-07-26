import React, { useState, useContext} from 'react';
import {Text, View,TextInput, TouchableOpacity, Modal,ScrollView, ImageBackground,Alert,ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements';
import { Customer_Context } from "./App";
import { Button, Avatar } from "react-native-elements";

export default function Login({navigation}) {

  const[user,setuser] = useState('')
  const[pass,setpass] = useState('')
  const{setperson} = useContext(Customer_Context)
  const[visi,setvisi] = useState(false)

  
   
  const Validation= ()=>{
    setvisi(true)
    fetch('https://powerful-bastion-17180.herokuapp.com/User-Login',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        Username : user,
        Password : pass
      })
    })
    .then(res=> res.json())
    .then((data)=>{
      if(data.Login == "True"){
        setvisi(false)
        navigation.navigate("Skynet")
        setperson(user)
      }
      else{
        Alert.alert("Login Error",data.Login)
        setvisi(false)
      }
    })
  }

 

  return (
    <ImageBackground source={require('./assets/cus.jpg')} imageStyle={{resizeMode:"cover"}} style={{flex:1,padding:10,justifyContent:"center"}}>
     <View style={{backgroundColor:"#e3e3e3",alignItems:"center",justifyContent:"center",padding:15,borderRadius:5,elevation:35,marginTop:20}}>
       <Avatar rounded={true} icon={{name:"ios-log-in",color:"black",type:"ionicon",size:90}} size="xlarge" iconStyle={{alignItems:"center",justifyContent:"center"}} containerStyle={{backgroundColor:"#eee"}}/>
     <View style={{flexDirection:"row",padding:10,backgroundColor:"#eee",borderRadius:10,marginTop:15}}>
       <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
        <TextInput placeholder="Username" onChangeText={(text)=>setuser(text)} style={{fontSize:18}}/>
       </View>
       <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
        <Icon name="person" size={30} color="black"/>
       </View>
     </View>
     <View style={{flexDirection:"row",padding:10,marginTop:10,backgroundColor:"#eee",borderRadius:10}}>
       <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
        <TextInput placeholder="Password" onChangeText={(text)=>setpass(text)} style={{fontSize:18}} secureTextEntry={true}/>
       </View>
       <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
        <Icon name="lock" size={30} color="black"/>
       </View>
     </View>
     {visi?<ActivityIndicator size={50} color="red" style={{position:"absolute"}}/>:console.log("Done")}
     <Button onPress={()=>{Validation()}} title="Login" buttonStyle={{backgroundColor:"red",padding:15,borderRadius:10}} containerStyle={{marginTop:20,width:"100%"}}/>
     <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}} style={{marginTop:10}}>
       <Text style={{fontWeight:"bold"}}>Don't have an Account? Sign-up</Text>
     </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}


