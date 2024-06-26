import { useEffect, useState } from "react";
import { Alert, View,Text, TouchableOpacity, FlatList} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MainBody from "@/components/qualificationscomponents/mainbody";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import NavFooter from "@/components/navfooter/navfooter";
import { useNetInfo } from '@react-native-community/netinfo';
import TransitionPage from "@/components/transitionanimation/transitionpage";
export default function Account(){
    const router = useRouter();
    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const [account_info,setAccountInfo] = useState(null);
    const [bookmarkchanged,setBookMarkChanged] = useState(false)
    const getaccountinfo =async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
          headers: { Authorization: `Bearer ${access_token}` }
      };
        const response = await axios.get("https://btdtechconnectbe-hrjw5cc7pa-uc.a.run.app/api/v1/getuserinfo",config)
        let result = response.data
        //console.log(result)
        if ("email" in result){
            setAccountInfo(result)
        }
        else if ("error" in result){
            Alert.alert(result.error)
        }
    }

    useEffect(() =>{
        if (netInfo.isInternetReachable === true){      
        const timer = setTimeout(() =>{
            getaccountinfo()
            },300)
            return () => clearTimeout(timer);
            
        }
    },[bookmarkchanged,netInfo])
    const deleteaccount = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
          headers: { Authorization: `Bearer ${access_token}` }
      };
        const response = await axios.delete("https://btdtechconnectbe-hrjw5cc7pa-uc.a.run.app/api/v1/deleteuser",config)
        let result = response.data
        if ("message" in result){
            await AsyncStorage.removeItem("access_token")
            router.push("/getstarted")
        }
        else{
            Alert.alert(result.error)
        }
        
    }
    const propmptdeleteaccount =async () => {
        Alert.alert(
            'Delete Account',
            'This is Unreversable!!!', // <- this part is optional, you can pass an empty string
            [
              {text: 'Yes', onPress: () => {deleteaccount()}},
              {text: 'Cancel', onPress: () => {}}
            ],
            {cancelable: false},
          );
        
    }
    const logout =async () => {
        await AsyncStorage.removeItem("access_token")
        router.push("/")
        
    }
    function capitalizeFirstLetter(str:string) {
        return str[0].toUpperCase() + str.slice(1);
      }
    
    if (netInfo.isInternetReachable === true && account_info === null){
        return(
          <TransitionPage currentpage={"account"}/>
          
        )
      }
      if (netInfo.isInternetReachable === true){ 
    return(
        <View style={{flex:1,padding:20}}>

        {account_info !== null &&
        <View style={{flex:0.1}}>
            <Text style={{fontSize:25,fontWeight:"bold",textDecorationLine:"underline"}}>
                Account Info
            </Text>
        </View>}
        {account_info !== null &&
        <FlatList
        style={{flex:0.5,height:200}}
        contentContainerStyle={{gap:30}}
        data={Object.keys(account_info)}
        ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "grey", height: 2 }} />
          )}
        renderItem={({item,index}) =>{
            return(
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight:"bold",fontSize:20}}>
                    {capitalizeFirstLetter(item).replaceAll("_"," ")}:
                </Text>
                <Text style={{fontSize:20}}> {account_info[item]}</Text>
                </View>

            )
        }}>
            
        </FlatList>}
        <View style={{alignSelf:"center",flexDirection:"row",gap:20}}>
        {account_info !== null &&
        <TouchableOpacity onPress={() =>{logout()}} style={{backgroundColor:"grey",width:100,height:50,justifyContent:"center",alignItems:"center",borderRadius:10}}>
        <Text style={{color:"white"}}>Log Out</Text>    
        </TouchableOpacity>}
        {account_info !== null &&
        <TouchableOpacity onPress={() =>{propmptdeleteaccount()}} style={{backgroundColor:"red",width:100,height:50,justifyContent:"center",alignItems:"center",borderRadius:10,padding:5}}>
        <Text style={{color:"white"}}>Delete Account</Text>    
        </TouchableOpacity>}
        </View>

        {account_info !== null &&
        <NavFooter currentpage={"account"} style={{flex:0.13}}/>}



        </View>
    )}
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
                <NavFooter currentpage={"account"}/>
    
            </View>
        )
    }
}