import { FlatList, View,Text,Image, Alert } from 'react-native';

import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Header from '@/components/header/header';
import NavigationFooter from './footer';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
export default function CreateYourPassword() {
    const netInfo = useNetInfo();
    const router = useRouter();
    const {personal_info,interests_info} = useLocalSearchParams<any>();
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const [isTyping,setIsTyping] = useState(false)
    const navigate = useNavigation();
    const signup=async () => {
        // login here
        if (password !== "" && confirmpassword !== ""){
          console.log("login here",password,password)
          if (confirmpassword !== password){
            Alert.alert("Passwords are not the same.")
          }
          else{
            // Turn key email_address to email
            let signup_info = JSON.parse(personal_info)
            let final_interests_info = JSON.parse(interests_info)
    
            const final_signup_json  = {"first_name": signup_info[0]["first_name"], "last_name": signup_info[1]["last_name"], "email": signup_info[2]["email_address"], "date_of_birth": signup_info[3]["date_of_birth"],"password":password}
            //console.log(final_signup_json)
            //console.log(interests_info)
              
            const response = await axios.post("http://172.20.10.3:8080/api/v1/signupapi",final_signup_json)

            let resultsignup = response.data
            console.log(resultsignup)
     
            if ("access_token" in resultsignup){
                let access_token = resultsignup.access_token
                const config = {
                    headers: { Authorization: `Bearer ${access_token}` }
                };
                const responsestore = await axios.post("http://172.20.10.3:8080/api/v1/storeuserinterests",final_interests_info,config)
                let result = responsestore.data
          

                if ("message" in result){
                    await AsyncStorage.setItem("access_token",access_token)
                    router.push("/qualifications")

                }
                else{
                    Alert.alert(result.error)
                }
                
            }
            else{
                Alert.alert(resultsignup.message)
            }
            /*

            let result = response.data
            console.log(result)
            if ("access_token" in result){
                await AsyncStorage.setItem("access_token",result.access_token)
                router.push("/qualifications")
                //router.push("/mainhome")

            }
            else if ("message" in result){
                Alert.alert(result.message)
            }*/

          }
        }

    

    }
    


if (netInfo.isInternetReachable === true  ){
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
        <View style={{flex:0.03}}>
            <TouchableOpacity onPress={() =>{navigate.goBack()}}>
            <Text>Back</Text>
            </TouchableOpacity>

        </View>
        <View style={{flex:!isTyping? 0.5 :0.25,justifyContent:"center",alignItems:"center"}}>
                <Image alt='Image Here' style={{width:200,height:200}} source={{uri:"data:image/png;base64,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"}}></Image>
        </View>
        <View style={{flex:0.2,padding:30,gap:10}}>
            <View style={{}}>
                <Text style={{fontSize:25}}>Create Your Password</Text>
            </View>
            <TextInput
            placeholder='*Password'
        style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius:5
          
          }}
          secureTextEntry={true} 
          onTouchEnd={() =>{setIsTyping(true)}}
          onEndEditing={() =>{}}
          placeholderTextColor="black" 
            onChangeText={setPassword}
            value={password}
        />
                    <TextInput
            placeholder='*Confirm your password'
        style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius:5
          
          }}
          secureTextEntry={true} 
          onTouchEnd={() =>{setIsTyping(true)}}
          onEndEditing={() =>{setIsTyping(false)}}
          placeholderTextColor="black" 
            onChangeText={setConfirmPassword}
            value={confirmpassword}
        />
        <TouchableOpacity onPress={() =>{signup()}} style={{backgroundColor:"#61edae",width:"100%",justifyContent:"center",alignItems:"center",padding:10,borderRadius:50}}>
                    <Text style={{color:"white"}}>Create Your Password</Text>
            </TouchableOpacity>


        </View>


  

    </View>
  );
}
else if (netInfo.isInternetReachable === null){
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
        <Header style={{flex:1}}/>
        {<View style={{flex:1}}></View>}
        <NavigationFooter currentpage={"home"}></NavigationFooter>

  

    </View>
    )
}
else if (netInfo.isInternetReachable === false){
    return(
        <View style={{flex:1}}>
            {/*Header */}
            <Header style={{flex:1}}/>
            {/* No Internet Main Body */}
            <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30,color:"white"}}>No Internet Connection</Text>
                <Text style={{color:"white"}}>
                Read your Downloads
                </Text>
            </View>
            



            {/*Navigation Footer*/}
            <NavigationFooter currentpage={"home"}/>

        </View>
    )
    
}
}