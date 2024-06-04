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
                renderItem={({ item }) => <QualItem qualuuid={item.qualuuid} qual_name={item.qual_name} qual_icon={item.qual_icon}  institution={item.institution} online_freq={item.online_freq} in_person_freq={item.in_person_freq} course_length={item.course_length} earning_potential_lower={item.earning_potential_lower} earning_potential_upper={item.earning_potential_upper} earning_potential_description={item.earning_potential_description} description={item.description}/>}
      
                contentContainerStyle={{ gap: 30 }}




            />}

             
                
             
                
            </View>
        </View>
    )
    
}