import { View,Text,FlatList } from "react-native";
import QualItem from "./qualitem";
import { QualificationItemInterface } from "./qualinterfaces";
export default function MainBody({style,qualifications,bookmarkchanged,setBookMarkChanged}:any){
    // In bathes of 30
    //<QualificationItemInterface></QualificationItemInterface>
    return(
        <View style={style}>
                <View style={{flex:1,flexDirection:"row",padding:20}}>
                {qualifications &&
                <FlatList
                key={"start"}
                data={qualifications}
                renderItem={({ item,index}) => <QualItem key={index} bookmarkchanged={bookmarkchanged} setBookMarkChanged={setBookMarkChanged} qualification={item} bookmark={true}/>}
      
                contentContainerStyle={{ gap: 30 }}




            />}

             
                
             
                
            </View>
        </View>
    )
    
}