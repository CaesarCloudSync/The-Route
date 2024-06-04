import { Text, View ,FlatList} from "react-native"
import FilterItem from "./filteritem"
import { FilterItemInterface } from "./qualinterfaces"
export default function FilterCarousel({style,careers,chosen_career}:any){

    return(
    <View style={[style,{padding:"2%"}]}>
 
           
           {careers &&
                <FlatList<FilterItemInterface>
                style={{flex:2}}
                data={careers}
                renderItem={({ item ,index}) => <FilterItem index={index} label={item.label} value={item.value} />}
                horizontal={true}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 30 }}




            />}
            <View style={{flex:1.3,justifyContent:"center",alignItems:"center"}} >
                <Text style={{marginTop:10,fontWeight:"bold",fontSize:15}}>{chosen_career}</Text>

            </View>
                
       

    </View>)
}