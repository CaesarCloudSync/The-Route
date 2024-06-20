import { View,Text,TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default function NavFooter({style,currentpage}:any){
    const router = useRouter();
    return(
        <View style={[style,{flexDirection:"row",gap:50,justifyContent:"center"}]}>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{router.push("/qualifications")}}>
            <Entypo name="home" size={24} color={currentpage === "home" ? "#61edae" : "black"} /><Text style={{color:currentpage === "home" ? "#61edae" : "black",fontWeight:"bold"}}>Home</Text></TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{router.push("/bookmarks")}}><FontAwesome style={{left:0}} name="bookmark" size={24} color={currentpage === "bookmarks" ? "#61edae" : "black"} /><Text style={{color:currentpage === "bookmarks" ? "#61edae" : "black",fontWeight:"bold"}}>Bookmarks</Text></TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{router.push("/foryou")}}><Ionicons name="people" size={24} color={currentpage === "foryou" ? "#61edae" : "black"} /><Text style={{color:currentpage === "foryou" ? "#61edae" : "black",fontWeight:"bold"}}>For You</Text></TouchableOpacity>
        </View>
    )
}