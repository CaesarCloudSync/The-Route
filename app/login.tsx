import { FlatList, View,Text,Image, Alert,ImageBackground } from 'react-native';

import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';


import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
export default function Index() {
    const netInfo = useNetInfo();
    const router = useRouter();
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isTyping,setIsTyping] = useState(false)
    const navigate = useNavigation();
    const login =async () => {
        // login here
        if (email !== "" && password !== ""){
          //console.log("login here",email,password)
          const response = await axios.post("http://192.168.0.28:8080/api/v1/loginapi",{"email":email,"password":password})

          let result = response.data
          console.log(result)
          if ("access_token" in result){
              await AsyncStorage.setItem("access_token",result.access_token)
              router.push("/qualifications")
              //router.push("/mainhome")

          }
          else if ("message" in result){
              Alert.alert(result.message)
          }
        }
    

    }
    


if (netInfo.isInternetReachable === true  ){
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
           <ImageBackground source={{uri:"data:image/jpeg;base64,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"}} style={{flex:!isTyping? 0.5 :0.25}}>
            <TouchableOpacity onPress={() =>{navigate.goBack()}}>
            <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>

        


        </ImageBackground>

        <View style={{flex:0.2,padding:30,gap:10}}>
            <View style={{}}>
                <Text style={{fontSize:25}}>Log in</Text>
            </View>
            <TextInput
            textContentType="emailAddress"
            autoCapitalize='none'
            placeholder='Email'
        style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius:5
          
          }}
          onTouchEnd={() =>{setIsTyping(true)}}
          placeholderTextColor="black" 
            onChangeText={setEmail}
            value={email}
        />
                    <TextInput
            placeholder='Password'
            secureTextEntry={true}
        style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius:5
          
          }}
          onTouchEnd={() =>{setIsTyping(true)}}
          onEndEditing={() =>{setIsTyping(false)}}
          placeholderTextColor="black" 
            onChangeText={setPassword}
            value={password}
        />
        <TouchableOpacity onPress={() =>{login()}} style={{backgroundColor:"#61edae",width:"100%",justifyContent:"center",alignItems:"center",padding:10,borderRadius:50}}>
                    <Text style={{color:"black"}}>Login</Text>
            </TouchableOpacity>


        </View>


  

    </View>
  );
}
else if (netInfo.isInternetReachable === false){
    return(
        <View style={{flex:1}}>
            {/*Header */}
            
            {/* No Internet Main Body */}
            <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30,color:"black"}}>No Internet Connection</Text>
                <Text>Please connect to enjoy your journey</Text>

            </View>
            



            {/*Navigation Footer*/}
    

        </View>
    )
}
}