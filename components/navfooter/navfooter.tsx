import { View,Text,TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
export default function NavFooter({style}:any){
    const router = useRouter();
    return(
        <View style={[style,{flexDirection:"row",gap:30}]}>
            <TouchableOpacity onPress={()=>{router.push("/mainhome")}}><Text>Home</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{router.push("/qualifications")}}><Text>Qualifications</Text></TouchableOpacity>
        </View>
    )
}