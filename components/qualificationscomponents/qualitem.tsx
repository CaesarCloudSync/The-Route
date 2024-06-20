import { Text, View ,FlatList, Alert} from "react-native"
import { QualificationItemInterface } from "./qualinterfaces"
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

export default function QualItem({qualification}:any){ // :QualificationItemInterface
    const router = useRouter();

    const navqualinfopage = () =>{
        router.push({ pathname: "/qualinfo", params: {"qual_info_param":JSON.stringify(qualification)}})

    }
    const bookmarkqualification =async () => {
        
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
          headers: { Authorization: `Bearer ${access_token}` }
      };
      const qual_uuid = qualification.qual_uuid
      const response = await axios.post("http://192.168.0.12:8080/api/v1/storequalificationbookmark",{"qual_uuid":qual_uuid},config)
      let result = response.data
      if (!("message" in result)){
        Alert.alert(result.error)
      }
      else{
        router.push("/bookmarks")
      }


    }
    return(
    <TouchableOpacity onPress={() =>{navqualinfopage()}} style={{backgroundColor:"#354b53" ,padding:20,borderRadius:4}}>
        <View style={{flexDirection:"row",gap:10}} >
            <View style={{flex:0.2,top:"15%"}}>
                <Image style={{width:35,height:35,borderRadius:3}} source={{uri:qualification.qual_icon}}></Image>
            </View>
            <View style={{flex:1,marginTop:5}}>
     
            <Text style={{color:"white"}}>
            {qualification.institution}
            </Text>
            <Text style={{color:"white"}}>{qualification.qual_name}</Text>
            {qualification.online_freq_label !== "" &&
            <Text style={{color:"grey"}}>
            {qualification.online_freq_label}
            </Text>}
            {qualification.in_person_freq_label !== "" &&
            <Text style={{color:"grey"}}>
            {qualification.in_person_freq_label}
            </Text>}


            <Text style={{color:"grey"}}>
            {qualification.course_length_label}
            </Text>
            <Text style={{color:"grey"}}>Earning Potential: {qualification.earning_potential_lower} - £{qualification.earning_potential_upper} /yr {qualification.earning_potential_description !== "" && `(${qualification.earning_potential_description})`}</Text>
            </View>
            <View style={{flex:0.1,justifyContent:"center"}}>
            <TouchableOpacity onPress={() =>{bookmarkqualification()}}>
                <FontAwesome style={{color:"#61edae"}} name="bookmark" size={27} />
            </TouchableOpacity>
            </View>

        </View>
    </TouchableOpacity>)
}