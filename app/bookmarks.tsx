import { useEffect, useState } from "react";
import { Alert, View,Text, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MainBody from "@/components/qualificationscomponents/mainbody";
import { useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import NavFooter from "@/components/navfooter/navfooter";
export default function BookMarks(){
    const navigation = useNavigation();
    const [bookmarked_quals,setBookMarkedQuals] = useState([]);
    const [bookmarkchanged,setBookMarkChanged] = useState(false)
    const getbookmarkedquals =async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
          headers: { Authorization: `Bearer ${access_token}` }
      };
        const response = await axios.get("http://192.168.0.12:8080/api/v1/getbookmarkedqualifications",config)
        let result = response.data
        //console.log(result)
        if ("qual_bookmarks" in result){
            setBookMarkedQuals(result["qual_bookmarks"])
        }
        else if ("error" in result){
            Alert.alert(result.error)
        }
    }

    useEffect(() =>{
        getbookmarkedquals()
    },[bookmarkchanged])
    return(
        <View style={{flex:1,padding:20}}>

        <View style={{flex:0.1}}>
            <Text style={{fontSize:20,fontWeight:"bold"}}>
                Bookmarked Qualifications
            </Text>
        </View>
        {bookmarked_quals.length !== 0 && <MainBody  qualifications={bookmarked_quals}bookmarkchanged={bookmarkchanged} setBookMarkChanged={setBookMarkChanged} style={{flex: 3, backgroundColor: 'white'}} />}
        {bookmarked_quals.length !== 0 &&<NavFooter currentpage={"bookmarks"} style={{flex:0.13}}/>}
        </View>
    )
}