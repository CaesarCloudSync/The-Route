import { View,Text } from "react-native"
import { AntDesign } from '@expo/vector-icons';
export default function Search({style}:any){
    return(
        <View style={[style,{justifyContent:"center",alignItems:"center"}]}>
            <View style={{width:"95%",height:"50%",backgroundColor:"#6ea1b1",justifyContent:"center",alignItems:"flex-end",borderRadius:2,padding:5}}>
                <AntDesign name="search1" size={20} color="black" />

            </View>
        </View>
    )
}