import { View,Text,FlatList } from "react-native";
import QualItem from "./qualitem";
import { QualificationItemInterface } from "./qualinterfaces";
export default function MainBody({style}:any){
    // In bathes of 30
    const qualifications = [{"qualid":"qual-1234","qual_name":"Python Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"}]
    return(
        <View style={style}>
                <View style={{flex:1,flexDirection:"row",padding:20}}>
                {qualifications &&
                <FlatList<QualificationItemInterface>
                data={qualifications}
                renderItem={({ item }) => <QualItem qualid={item.qualid} qual_name={item.qual_name} qual_icon={item.qual_icon} />}
      
                contentContainerStyle={{ gap: 30 }}




            />}

             
                
             
                
            </View>
        </View>
    )
    
}