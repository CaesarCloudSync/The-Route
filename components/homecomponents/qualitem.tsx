import { Text, View ,FlatList} from "react-native"
import { QualificationItemInterface } from "./qualinterfaces"

export default function QualItem({qualid,qual_name,qual_icon}:QualificationItemInterface){


    return(
    <View style={{backgroundColor:"#354b53",padding:20,borderRadius:4}}>
        <View style={{flexDirection:"row"}} >
            <View style={{flex:1}}>
                <Text>Logo</Text>
            </View>
            <View style={{flex:3}}>
            <Text>{qual_name}</Text>
            </View>
            <View style={{flex:0.5}}>
                <Text >BookMark</Text>
            </View>

        </View>
    </View>)
}