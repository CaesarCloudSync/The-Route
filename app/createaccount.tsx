import { FlatList, View,Text,Image, Alert } from 'react-native';

import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MangaCover from '@/components/homecomponents/MangaCover';
import { mangatest } from '@/components/homecomponents/test';
import Header from '@/components/header/header';
import NavigationFooter from './footer';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import CreateAccountFields from '@/components/createaccountcomponents/createaccountfields';

export default function CreatAccount() {
    const netInfo = useNetInfo();
    const router = useRouter();
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isTyping,setIsTyping] = useState(false)
    const [createaccountdata,setCreateAccountData] = useState<any>([{"label":"First Name","value":"","type":"text"},{"label":"Last Name","value":"","type":"text"},{"label":"Email Address","value":"","type":"text"},{"label":"Date of Birth","value":"","type":"date"}])
    const navigate = useNavigation();
    const next_page =async () => {
        // login here
        const any_empty_fields = createaccountdata.map((items:any) =>{return(items.value !== "")}).filter((bool:boolean) =>{return(bool === true)})
        console.log(any_empty_fields)
        if (any_empty_fields.length === createaccountdata.length){
            router.push({ pathname: "/industrychoices", params: {"personal_info":JSON.stringify(createaccountdata)} })
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

        <View style={{flex:1,padding:30,gap:10,justifyContent:"center",alignItems:"center"}}>
            <View style={{flex:0.04}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>Welcome to BTDTechConnect</Text>
            </View>
            <View style={{flex:0.05,flexDirection:"row",gap:10}}>
                <View style={{width:50,height:10,backgroundColor:"#3ec7f3",borderRadius:30}}></View>
                <View style={{width:50,height:10,backgroundColor:"grey",borderRadius:30}}></View>

            </View>
            <View style={{flex:0.05}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>Fill in your Info:</Text>
            </View>
            <FlatList
            style={{flex:1,height:200}}
            data={createaccountdata}
            renderItem={({item,index}) =>{
                return(
                    <CreateAccountFields createaccountdata={createaccountdata} index={index} accountdatalabel={item.label} setCreateAccountData={setCreateAccountData} accountdatavalue={item.value}></CreateAccountFields>
                )
            }}>
                
            </FlatList>
            <TouchableOpacity onPress={() =>{next_page()}}   style={{backgroundColor:"#3ec7f3",width:"90%",justifyContent:"center",alignItems:"center",borderRadius:50}}>
                    <Text style={{color:"white",padding:20,fontWeight:"bold"}}>Next</Text>
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