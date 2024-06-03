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
import IndustryChoicesDropDown from '@/components/industrychoicescomponents/industrychoicesdropdown';
import { useLocalSearchParams } from 'expo-router';
export default function IndustryChoices() {
    const netInfo = useNetInfo();
    const {personal_info} = useLocalSearchParams<any>();
    const router = useRouter();

    const [isTyping,setIsTyping] = useState(false)
    const [industry,setIndustry] = useState({"label":"","value":""})
    const [career,setCareer] = useState({"label":"","value":""});
    const [studypref,setStudyPref] = useState({"label":"","value":""});
    const [studydays,setStudyDays] = useState({"label":"","value":""});
    const industrychoices = [
        {"label":"Gaming","value":"gaming"},
        {"label":"Finance","value":"finance"},
        {"label":"Technology","value":"tech"},
        
      ];
    const careerchoices :any= {"gaming":
    [
        {"label":"Game developer","value":"game_developer"},
        {"label":"Game designer","value":"game_designer"},
        {"label":"Games content creator","value":"game_content_creator"},
        {"label":"Game tester","value":"game_tester"},
        {"label":"Market research","value":"marhet_research"},
        {"label":"Games blogger","value":"game_blogger"}
        
      ],
    "finance":
    [
        {"label":"Accountant","value":"accountant"},
        
      ]
      ,
      "tech":
      [
        {"label":"Software Developer","value":"software_developer"},
        {"label":"Software Designer","value":"software_designer"},

        
      ]
};
    const studyprefchoices = [
        {"label":"Online","value":"online"},
        {"label":"In person","value":"in_person"},
        {"label":"Hybrid","value":"hybrid"}
    ]
    const studydaychoices = [
        {"label":"1 Study Days","value":"1"},
        {"label":"3 Study Days","value":"3"},
        {"label":"5 Study Days","value":"5"}
    ]
    const navigate = useNavigation();

    const next_page =async () => {
        // login here

        let personal_info_data = JSON.parse(personal_info)
        const personal_info_json = personal_info_data.map((items:any) =>{
            let dict:any = {}
            dict[items.label.toLowerCase().replace(" ","_")] = items.value
            return(dict)})
        if (industry.value !== "" && career.value !== "" && studypref.value !== "" && studydays.value !== ""){
            console.log(industry.value,career.value,studypref.value,studydays.value)
            console.log(personal_info_json)
            // Store info in DB.
            // Ten navigate to main page
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

        <View style={{flex:1,padding:30,gap:10,alignItems:"center"}}>
            <View style={{flex:0.04}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>Welcome to BTDTechConnect</Text>
            </View>
            <View style={{flex:0.05,flexDirection:"row",gap:10}}>
                <View style={{width:50,height:10,backgroundColor:"grey",borderRadius:30}}></View>
                <View style={{width:50,height:10,backgroundColor:"#3ec7f3",borderRadius:30}}></View>
             

            </View>
            <View style={{flex:0.05}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>Industry Interests:</Text>
            </View>
            <View style={{flex:0.04,alignSelf:"flex-start"}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>What industry would you like to work in?</Text>
            </View>
            <View style={{flex:0.08,alignSelf:"flex-start"}}>
                <IndustryChoicesDropDown dropdowndata={industrychoices} dropdownlabel={"Select Your Industry"} setSelectedItem={setIndustry}/>
            </View>
            <View style={{flex:0.04,alignSelf:"flex-start"}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>What is your prefered {industry.value !== "" && industry.label} career choice?</Text>
            </View>
            <View style={{flex:0.08,alignSelf:"flex-start"}}>
                <IndustryChoicesDropDown dropdowndata={industry.label !== "" && careerchoices[industry.value]} dropdownlabel={"Select Your Career"} setSelectedItem={setCareer}/>
            </View>
            <View style={{flex:0.04,alignSelf:"flex-start"}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>What's your studying preference?</Text>
            </View>
            <View style={{flex:0.08,alignSelf:"flex-start"}}>
                <IndustryChoicesDropDown dropdowndata={studyprefchoices} dropdownlabel={"Select Your Study Preference"} setSelectedItem={setStudyPref}/>
            </View>
            <View style={{flex:0.04,alignSelf:"flex-start"}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>How many days a week would you like to study?</Text>
            </View>
            <View style={{flex:0.5,alignSelf:"flex-start"}}>
                <IndustryChoicesDropDown dropdowndata={studydaychoices} dropdownlabel={"Select Your Num of Study Days"} setSelectedItem={setStudyDays}/>
            </View>

 
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
