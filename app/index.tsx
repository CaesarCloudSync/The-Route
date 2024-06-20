import { FlatList, View,Text,Image } from 'react-native';

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
export default function Index() {
    const netInfo = useNetInfo();
    const router = useRouter();
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const check_loggeed_in =async () => {
        //await AsyncStorage.removeItem("access_token")
        const access_token = await AsyncStorage.getItem("access_token");
    
        console.log(access_token)
        if (access_token){ // This should be just access_token but for testing puproses
            router.push("/qualifications")
            //router.push("/mainhome")
            setIsLoggedIn(true)
        }
        else{
            setIsLoggedIn(false);
            
        }
    }
    

useEffect(() =>{
    // setMangaFeed(mangafeed)
    if (netInfo.isInternetReachable === true){
        check_loggeed_in()
    }
    
},[netInfo])
if (netInfo.isInternetReachable === true && !isLoggedIn){
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
        <View style={{flex:1,padding:30,alignItems:"center",gap:30}}>
            <View style={{marginTop:"20%"}}>
                <Text style={{fontSize:25}}>The Route</Text>
            </View>
            <View style={{padding:20,borderRadius:5}}>
                <Image alt='Image Here' style={{width:300,height:125}} source={{uri:"https://btdmembership.com/wp-content/uploads/2024/03/BTD-Logo-3-1024x446.png"}}></Image>
            </View>
            <View>
                <Text style={{fontSize:20}}>Expand Your future</Text>
            </View>

        </View>
        <View style={{flex:0.3,justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity onPress={() =>{router.push("/choosesignup")}} style={{backgroundColor:"#61edae",width:"90%",justifyContent:"center",alignItems:"center",padding:20,borderRadius:5}}>
                    <Text style={{color:"white"}}>Get Started</Text>
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