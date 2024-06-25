import { FlatList, View,Text,Image, Alert } from 'react-native';

import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
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
    const [industrychoices, setIndustryChoices] = useState([])
    const [careerchoices ,setCareerChoices] = useState<any>({})
    const  [studyprefchoices,setStudyPrefChoices] = useState([])
    const [studydaychoices,setStudyDaysChoices] = useState([]);
    const navigate = useNavigation();

    const next_page =async () => {
        // login here

        let personal_info_data = JSON.parse(personal_info)
        const personal_info_json = personal_info_data.map((items:any) =>{
            let dict:any = {}
            dict[items.label.toLowerCase().replaceAll(" ","_")] = items.value
            return(dict)})
        if (industry.value !== "" && career.value !== "" && studypref.value !== "" && studydays.value !== ""){
            console.log(industry.value,career.value,studypref.value,studydays.value)
            console.log(personal_info_json)
            let final_json = {"personal_info":JSON.stringify(personal_info_json),"interests_info":JSON.stringify({"industry":industry.value,"career":career.value,"studypref":studypref.value,"studydays":studydays.value})}
            router.push({ pathname: "/createyourpassword", params: final_json})
            // Store info in DB.
            // Ten navigate to main page
        }
    

    }
    
const getindustrychoices =async () => {
    const response = await axios.get("http://172.20.10.3:8080/api/v1/getindustrychoices")
    let result = response.data
    let careers = result.careers
    let industrys = result.industrys
    let studypref = result.studyprefs
    let studydays = result.studydays
    setCareerChoices(careers)
    setIndustryChoices(industrys)
    setStudyPrefChoices(studypref)
    setStudyDaysChoices(studydays)
    console.log(result)
}
useEffect(() =>{
    getindustrychoices()
},[])
if (netInfo.isInternetReachable === true  ){

  return (
    <View style={{flex:1,backgroundColor:"white"}}>
        <StatusBar  hidden/>
        <View style={{flex:0.03}}>
            <TouchableOpacity onPress={() =>{navigate.goBack()}}>
            <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>

        </View>

        <View style={{flex:1,padding:30,gap:10,alignItems:"center"}}>
            <View style={{flex:0.04}}>
                <Text style={{fontSize:15,fontWeight:"bold"}}>Welcome to The Route</Text>
            </View>
            <View style={{flex:0.05,flexDirection:"row",gap:10}}>
                <View style={{width:50,height:10,backgroundColor:"grey",borderRadius:30}}></View>
                <View style={{width:50,height:10,backgroundColor:"#61edae",borderRadius:30}}></View>
             

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

 
            <TouchableOpacity onPress={() =>{next_page()}}   style={{backgroundColor:"#61edae",width:"90%",justifyContent:"center",alignItems:"center",borderRadius:50}}>
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

            </View>
            



            {/*Navigation Footer*/}
            <NavigationFooter currentpage={"home"}/>

        </View>
    )
    
}
}
