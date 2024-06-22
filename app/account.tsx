import { useEffect, useState } from "react";
import { Alert, View,Text, TouchableOpacity, FlatList} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MainBody from "@/components/qualificationscomponents/mainbody";
import { useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import NavFooter from "@/components/navfooter/navfooter";
export default function Account(){
    const navigation = useNavigation();
    const [account_info,setAccountInfo] = useState(null);
    const [bookmarkchanged,setBookMarkChanged] = useState(false)
    const getaccountinfo =async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
          headers: { Authorization: `Bearer ${access_token}` }
      };
        const response = await axios.get("http://172.20.10.3:8080/api/v1/getuserinfo",config)
        let result = response.data
        console.log(result)
        if ("email" in result){
            setAccountInfo(result)
        }
        else if ("error" in result){
            Alert.alert(result.error)
        }
    }

    useEffect(() =>{
        getaccountinfo()
    },[bookmarkchanged])
    const deletaccount = async () => {
        
    }
    const propmptdeleteaccount =async () => {
        Alert.alert(
            'Delete Account',
            'This is unreversable!!!', // <- this part is optional, you can pass an empty string
            [
              {text: 'Yes', onPress: () => console.log('OK Pressed')},
              {text: 'Cancel', onPress: () => {}}
            ],
            {cancelable: false},
          );
        
    }
    function capitalizeFirstLetter(str:string) {
        return str[0].toUpperCase() + str.slice(1);
      }
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


        {account_info !== null &&
        <NavFooter currentpage={"account"} style={{flex:0.13}}/>}

        </View>
    )
}