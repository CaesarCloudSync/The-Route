import { useLocalSearchParams } from "expo-router"
import { View,Text, ScrollView,ImageBackground, Image } from "react-native";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import * as Linking from 'expo-linking';


export default function QualInfo(){
    const qual_info_param:any = useLocalSearchParams();
    const navigation = useNavigation();
    const [qual_info,setQualInfo] = useState(JSON.parse(qual_info_param.qual_info_param));
    //console.log(qual_info)
    // "course_length": "2 years study", "earning_potential_description": "no experience needed", "earning_potential_lower": "60k", "earning_potential_upper": "180K", "in_person_freq_label": "In Person 1 day a week", "institution": "Croydon College", "online_freq": "Online 2 days a week", "qual_icon": "https://qual_icon", "qual_name": "Game Development", "qualuuid": "qual-1234"}

    return(
        <View style={{flex:1}}>
            <ImageBackground source={{uri:qual_info.qual_image}} style={{flex:0.55}}>
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
            <View style={{flex:0.08,padding:20,flexDirection:"row",gap:10}}>
                <Image style={{width:35,height:35,borderRadius:3}} source={{uri:qual_info.qual_icon}}></Image>
                <Text style={{top:5,fontWeight:"bold",fontSize:25,textDecorationLine: 'underline'}}>
                    {qual_info.institution}
                </Text>

            </View>
            <ScrollView style={{flex:1,gap:10}}>
            <View style={{flex:0.04,margin:10,padding:10}}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>Job Role:</Text>
                <Text style={{fontSize:15}} >{qual_info.qual_name}</Text>
     
            </View>
            <View style={{flex:0.08,margin:10,padding:10}}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>Schedule:</Text>
                <View style={{flex:1,gap:10}}>
                {qual_info.online_freq !== "" &&
                <View style={{flex:1,flexDirection:"row",gap:2}}>
                <Text style={{fontWeight:"bold"}}>
                Online: 
                </Text>
                 <Text style={{color:"black"}}>
                {qual_info.online_freq_label}
                </Text>
                </View>
             }
                {qual_info.in_person_freq_label !== "" &&
                <View style={{flexDirection:"row"}}>
                <Text style={{color:"black",fontWeight:"bold"}}>
                In Person:
                </Text>
                <Text style={{color:"black"}}>
                {qual_info.in_person_freq_label}
                </Text>
                </View>
                }
                {qual_info.course_length_label !== "" &&
                <View style={{flexDirection:"row"}}>
                <Text style={{color:"black",fontWeight:"bold"}}>
                Course Length:
                </Text>
                <Text style={{color:"black"}}>
                {qual_info.course_length_label}
                </Text></View>}

       
                </View>

            </View>
            <View style={{flex:1,margin:10,padding:10,gap:10}}>
            <Text style={{fontSize:20,fontWeight:"bold"}}>Earning Potential:</Text>
            <Text style={{color:"black"}}>{qual_info.earning_potential_lower} - £{qual_info.earning_potential_upper} /yr {qual_info.earning_potential_description !== "" && `(${qual_info.earning_potential_description})`}</Text>
            <Text style={{fontWeight:"bold"}}>About the Qualification</Text>
            <Text>
                {qual_info.description}
            </Text>
            </View>
            </ScrollView>
            <View style={{position:"absolute",bottom:0,width:"100%",height:50,justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={() =>{Linking.openURL(qual_info.link);}} style={{width:200,height:30,backgroundColor:"#61edae",borderRadius:20,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"white",fontWeight:"bold",fontSize:15}}>Apply</Text>

                </TouchableOpacity>

            </View>


        </View>
    )
}