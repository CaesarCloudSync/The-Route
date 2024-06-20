import { View,Text,TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function NavFooter({style}:any){
    const router = useRouter();
    return(
        <View style={[style,{flexDirection:"row",gap:50,justifyContent:"center"}]}>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{router.push("/qualifications")}}>
            <Entypo name="home" size={24} color="black" /><Text>Home</Text></TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{router.push("/bookmarks")}}><FontAwesome style={{left:0}} name="bookmark" size={24} color="black" /><Text>Bookmarks</Text></TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{router.push("/foryou")}}><FontAwesome name="bookmark" size={24} color="black" /><Text>For You</Text></TouchableOpacity>
        </View>
    )
}