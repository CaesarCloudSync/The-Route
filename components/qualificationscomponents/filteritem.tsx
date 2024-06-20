import { Text, View ,FlatList} from "react-native"

export default function FilterItem({index,label,kind}:any){


    return(
    <View style={{backgroundColor:index % 2 ==0 ? "#354b53":"#61edae",borderRadius:3,minWidth:50,justifyContent:"center",alignItems:"center",padding:5}}>
        <Text style={{color:index % 2 ==0 ? "white":"black"}} >{label}</Text>
    </View>)
}