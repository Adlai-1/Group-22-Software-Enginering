import React, {useState,useContext} from 'react';
import {View,TextInput,StatusBar,ImageBackground,Alert,ActivityIndicator} from 'react-native';
import { Icon,Button,Avatar } from 'react-native-elements';
import { Driver_Context } from "./App";

export default function Login({navigation}) {

  const[user,setuser] = useState('')
  const[pass,setpass] = useState('')
  const[visi,setvisi] = useState(false)
  const{setperson} = useContext(Driver_Context)
 
  const Validation = ()=>{
    setvisi(true)
    fetch('https://powerful-bastion-17180.herokuapp.com/Driver-Login',{
      method : 'POST',
      headers:{
        Accept: 'application/json',
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        Username: user,
        Password : pass
      })
    }).then(res=>res.json())
   .then((res)=>{
     setvisi(false)
     if(res.Login == "True"){
       navigation.navigate("Skynet")
       setperson(user)
     }
     else{
       setvisi(false)
       Alert.alert("Login Error",res.Login)
     }
   })
  }


  return (
    <ImageBackground source={require('./assets/pic.jpg')} style={{justifyContent:"center",flex:1,padding:10,backgroundColor:"white"}}>
        <StatusBar backgroundColor="black"/>
      <View style={{backgroundColor:"#e3e3e3",alignItems:"center",justifyContent:"center",padding:15,borderRadius:5,elevation:35,marginTop:20}}>
      <Avatar rounded={true} icon={{name:"ios-log-in",color:"black",type:"ionicon",size:90}} size="xlarge" iconStyle={{alignItems:"center",justifyContent:"center"}} containerStyle={{backgroundColor:"#eee"}}/>
      <View style={{flexDirection:"row",padding:8,backgroundColor:"#eee",borderRadius:10,marginTop:15}}>
        <View style={{flex:1,padding:10,justifyContent:"center",alignItems:"flex-start"}}>
          <TextInput placeholder="Username" onChangeText={(text)=>setuser(text)} style={{fontSize:18}}/>
        </View>
        <View style={{flex:1,padding:10,justifyContent:"center",alignItems:"flex-end"}}>
         <Icon name="person" color="black"/>
        </View>  
      </View>
      <View style={{flexDirection:"row",padding:8,backgroundColor:"#eee",marginTop:10,borderRadius:10}}>
        <View style={{flex:1,padding:10,justifyContent:"center",alignItems:"flex-start"}}>
          <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(text)=>setpass(text)} style={{fontSize:18}}/>
        </View>
        <View style={{flex:1,padding:10,justifyContent:"center",alignItems:"flex-end"}}>
         <Icon name="lock" color="black"/>
        </View>  
      </View>
      {visi?<ActivityIndicator size={50} color="red" style={{position:"absolute"}}/>:console.log("Done")}
      <Button onPress={()=>{Validation()}} title="Login" buttonStyle={{backgroundColor:"red",padding:15,borderRadius:10}} containerStyle={{marginTop:20,width:"100%"}}/>
      </View>
    </ImageBackground>
  );
}

