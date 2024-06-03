import { Text, View ,FlatList} from "react-native"

export default function FilterItem({label,kind}:any){


    return(
    <View style={{backgroundColor:"grey",borderRadius:3,minWidth:50,justifyContent:"center",alignItems:"center"}}>
        <Text >{label}</Text>
    </View>)
}