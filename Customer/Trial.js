import React,{useState} from 'react';
import {Text, View,TextInput,ScrollView,Alert,ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from "react-native-elements";
import Axios from 'axios';

export default function Trial({navigation}) {


    //......Variable for Input...
  const[name,setname] = useState('')
  const[mail,setmail] = useState('')
  const[contact,setcontact] = useState('')
  const[usern,setusern] = useState('')
  const[word,setword] = useState('')
  const[location,setlocation] = useState('')
  const[visi,setvisi] = useState(false)

 const Signup = ()=>{
   Axios.post('https://powerful-bastion-17180.herokuapp.com/User-Signup',{
    Name : name,
    Email : mail,
    Contact : contact,
    Username : usern,
    Password : word,
    Address : location
   })
   .then(res=>{
       console.log(res.status)
       if(res.status == "200"){
           Alert.alert("Skynet","Welcome to Skynet Ghana"+name+"as Username"+usern)
           setname('')
           setmail('')
           setcontact('')
           setusern('')
           setword('')
           setlocation('')
           navigation.navigate('Login')
       }
   })
   .catch((err)=>{
       setvisi(false)
       Alert.alert("Network Error","Unable to store Data due to network problems")
       setname('')
       setmail('')
       setcontact('')
       setusern('')
       setword('')
       setlocation('')
       console.log(err)
   })
 }
console.log(contact)

 return(
    <View style={{flex:1,justifyContent:"center",backgroundColor:"white "}}>
    <ScrollView>
     <View style={{flex:1,alignItems:"center",justifyContent:"center",padding:10}}>
      <Icon name="person" size={120}/>
      <Text style={{fontWeight:"bold"}}>Set up your Account</Text>

     <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
      <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
      <TextInput placeholder="Name" style={{fontSize:18}} onChangeText={(text)=>{
        setname(text)
      }}/>
     </View>
     <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
      <Icon name="person" size={30} color="black"/>
     </View>
     </View>

     <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
      <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
      <TextInput placeholder="Email" style={{fontSize:18}} onChangeText={(text)=>{
        setmail(text)
      }}/>
     </View>
     <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
      <Icon name="mail" size={30} color="black"/>
     </View>
     </View>

     <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
      <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
      <TextInput placeholder="Contact"  style={{fontSize:18}} onChangeText={(text)=>{
        if(text.length == 10){setcontact(text)}
      }}/>
     </View>
     <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
      <Icon name="phone" size={30} color="black"/>
     </View>
     </View>

     <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
      <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
      <TextInput placeholder="Username" style={{fontSize:18}} onChangeText={(text)=>{
        setusern(text)
      }}/>
     </View>
     <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
      <Icon name="person" size={30} color="black"/>
     </View>
     </View>

     <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
      <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
      <TextInput placeholder="Password" style={{fontSize:18}} secureTextEntry={true} onChangeText={(text)=>{
        setword(text)
      }}/>
     </View>
     <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
      <Icon name="lock" size={30} color="black"/>
     </View>
     </View>

     <View style={{flexDirection:"row",padding:10,borderWidth:1.2,borderColor:"#e3e3e3",marginTop:10}}>
      <View style={{flex:2,alignItems:"flex-start",justifyContent:"center",padding:5}}>
      <TextInput placeholder="Location Address" style={{fontSize:18}} onChangeText={(text)=>{
        setlocation(text)
      }}/>
     </View>
     <View style={{flex:1,alignItems:"flex-end",justifyContent:"center",padding:5}}>
      <Icon name="navigation" size={30} color="black"/>
     </View>
     </View>
      {visi?<ActivityIndicator color="red" size={50} style={{position:"absolute"}}/>:console.log("Done")}
      <Button onPress={()=>{setvisi(true),Signup()}} title="Signup" containerStyle={{marginTop:10,width:"100%"}} buttonStyle={{backgroundColor:"red",padding:20}}/>
     </View>
     </ScrollView>
  </View>
)  
}