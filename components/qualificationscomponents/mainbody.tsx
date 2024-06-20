import { View,Text,FlatList } from "react-native";
import QualItem from "./qualitem";
import { QualificationItemInterface } from "./qualinterfaces";
export default function MainBody({style,qualifications}:any){
    // In bathes of 30
    //<QualificationItemInterface></QualificationItemInterface>
    return(
        <View style={style}>
                <View style={{flex:1,flexDirection:"row",padding:20}}>
                {qualifications &&
                <FlatList
                data={qualifications}
                renderItem={({ item }) => <QualItem qualification={item}/>}
      
                contentContainerStyle={{ gap: 30 }}




            />}

             
                
             
                
            </View>
        </View>
    )
    
}