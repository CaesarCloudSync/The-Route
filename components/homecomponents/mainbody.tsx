import { View,Text,FlatList } from "react-native";
import QualItem from "./qualitem";
import { QualificationItemInterface } from "./qualinterfaces";
export default function MainBody({style,qualifications}:any){

    return(
        <View style={style}>
                <View style={{flex:1,flexDirection:"row",padding:20}}>
                {qualifications &&
                <FlatList<QualificationItemInterface>
                data={qualifications}
                renderItem={({ item }) => <QualItem qualuuid={item.qualuuid} qual_name={item.qual_name} qual_icon={item.qual_icon} />}
      
                contentContainerStyle={{ gap: 30 }}




            />}
            

             
                
             
                
            </View>
        </View>
    )
    
}