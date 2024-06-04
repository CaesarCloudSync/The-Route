import { useLocalSearchParams } from "expo-router"
import { View,Text, ScrollView,ImageBackground } from "react-native";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
export default function QualInfo(){
    const qual_info_param:any = useLocalSearchParams();
    const navigation = useNavigation();
    const [qual_info,setQualInfo] = useState(JSON.parse(qual_info_param.qual_info_param));
    console.log(qual_info)
    // "course_length": "2 years study", "earning_potential_description": "no experience needed", "earning_potential_lower": "60k", "earning_potential_upper": "180K", "in_person_freq": "In Person 1 day a week", "institution": "Croydon College", "online_freq": "Online 2 days a week", "qual_icon": "https://qual_icon", "qual_name": "Game Development", "qualuuid": "qual-1234"}

    return(
        <View style={{flex:1}}>
            <ImageBackground source={{uri:"https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/Paris_Exterior_4-Edit-e1714649473120.png"}} style={{flex:0.55}}>
                <View style={{flex:0.36,justifyContent:"center",alignItems:"flex-start",marginLeft:20}}>
                <TouchableOpacity onPress={() =>{navigation.goBack()}}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                </View>

                <View style={{flex:0.9,justifyContent:"center",alignItems:"center"}}>


                </View>
          
            <View style={{flex:0.3,marginLeft:20}}>
                <Text style={{color: 'white',fontSize: 20,lineHeight: 24,fontWeight: 'bold',backgroundColor: '#000000c0',maxWidth:180,padding:10}}>{qual_info.institution}</Text>
            </View>
            </ImageBackground>
            <ScrollView style={{flex:1}}>
            <View style={{flex:0.1,margin:20,backgroundColor:"#d9d9d9",padding:20}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>Job Role:</Text>
                <Text >{qual_info.qual_name}</Text>
     
            </View>
            <View style={{flex:0.1,margin:20,backgroundColor:"#d9d9d9",padding:20}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>Schedule:</Text>
            {qual_info.online_freq !== "" &&
                <Text style={{color:"black"}}>
                {qual_info.online_freq}
                </Text>}
                {qual_info.in_person_freq !== "" &&
                <Text style={{color:"black"}}>
                {qual_info.in_person_freq}
                </Text>}


                <Text style={{color:"black"}}>
                {qual_info.course_length}
                </Text>

            </View>
            <View style={{flex:1,margin:20,backgroundColor:"#d9d9d9",padding:20,gap:10}}>
            <Text style={{fontSize:15,fontWeight:"bold"}}>Earning Potential</Text>
            <Text style={{color:"black"}}>{qual_info.earning_potential_lower} - £{qual_info.earning_potential_upper} /yr {qual_info.earning_potential_description !== "" && `(${qual_info.earning_potential_description})`}</Text>
            <Text style={{fontWeight:"bold"}}>About the Qualification</Text>
            <Text>
                {qual_info.description}
            </Text>
            </View>
            </ScrollView>


        </View>
    )
}