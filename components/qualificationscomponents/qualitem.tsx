import { Text, View ,FlatList} from "react-native"
import { QualificationItemInterface } from "./qualinterfaces"
import { FontAwesome } from '@expo/vector-icons';
export default function QualItem({qualid,qual_name,qual_icon}:QualificationItemInterface){


    return(
    <View style={{backgroundColor:"#354b53",padding:20,borderRadius:4}}>
        <View style={{flexDirection:"row"}} >
            <View style={{flex:0.2}}>
                <View style={{width:35,height:35,backgroundColor:"#36b2db",borderRadius:2}}></View>
            </View>
            <View style={{flex:1,marginTop:5}}>
            <Text style={{color:"white"}}>{qual_name}</Text>
            </View>
            <View style={{flex:0.1}}>
            <FontAwesome style={{color:"#d9d9d9"}} name="bookmark" size={27} />
            </View>

        </View>
    </View>)
}