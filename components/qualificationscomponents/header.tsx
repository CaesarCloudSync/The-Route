import { View,Text } from "react-native"
export default function Header({style}:any){
    return(
        <View style={style}>
            <View style={{flex:1,alignItems:"center",flexDirection:"row",padding:20}}>
                <View style={{width:20,flex:3}}>
                    <View>
                        <Text style={{color:"white"}}>Logo</Text>
                    </View>
                </View>

                <View style={{width:20,flex:0.5}}>
                    <View>
                        <Text style={{color:"white",fontSize:9}}>Bookmarks</Text>
                    </View>
                </View>
             
                
             
                
            </View>

        </View>
    )
}