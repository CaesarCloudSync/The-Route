import { View,Text,TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function NavFooter({style}:any){
    const router = useRouter();
    return(
        <View style={[style,{flexDirection:"row",gap:50,justifyContent:"center"}]}>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{router.push("/mainhome")}}>
            <Entypo name="home" size={24} color="black" /><Text>Home</Text></TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>{router.push("/bookmarks")}}><FontAwesome name="bookmark" size={24} color="black" /><Text>Bookmarks</Text></TouchableOpacity>
        </View>
    )
}