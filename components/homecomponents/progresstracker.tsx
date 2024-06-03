import { View,Text } from "react-native"
export default function ProgressTracker({style,progress}:any){
    return(
        <View style={style}>
            <View style={{flex:1,alignItems:"center",flexDirection:"row",justifyContent:"center",padding:10}}>
                    <View style={{width:`${progress}%`,backgroundColor:"#6ea1b1",height:"80%",borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                        
                    </View>
                    <View style={{width:`${100 - progress}%`,backgroundColor:"black",height:"80%",borderTopRightRadius:5,borderBottomRightRadius:5}}>
                        
                    </View>
            
                
             
                
            </View>

        </View>
    )
}