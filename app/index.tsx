import { FlatList, View,Text,Image, Alert } from 'react-native';

import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';


import NavFooter from '@/components/navfooter/navfooter';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
export default function Index() {
    const netInfo = useNetInfo();
    const router = useRouter();
    const check_loggeed_in =async () => {
        //await AsyncStorage.removeItem("access_token")
        const access_token = await AsyncStorage.getItem("access_token");
    
        console.log(access_token)
        if (access_token){ // This should be just access_token but for testing puproses
            const config = {
                headers: { Authorization: `Bearer ${access_token}` }
            };
            const response = await axios.get("https://btdtechconnectbe-hrjw5cc7pa-uc.a.run.app/api/v1/getuserinfo",config)
            let result = response.data
            console.log(result)
            if ("error" in result){
                if (result.error.includes("does not exist")){
                    router.push("/getstarted")
                   
                }
                else{
                    Alert.alert(result.error)
                }
            }
            else{
                router.push("/qualifications")
              
            }
            
            //router.push("/mainhome")
            
        }
        else{
        
            router.push("/getstarted")
            
        }
    }
    

useEffect(() =>{
    // setMangaFeed(mangafeed)
    if (netInfo.isInternetReachable === true){
        check_loggeed_in()
    }
    
},[netInfo])

if (netInfo.isInternetReachable === true ){
  return (
    <View>

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