import { Text, View ,FlatList} from "react-native"
import FilterItem from "./filteritem"
import { FilterItemInterface } from "./qualinterfaces"
export default function FilterCarousel({style,careers}:any){

    return(
    <View style={[style,{padding:"2%"}]}>
 
           
           {careers &&
                <FlatList<FilterItemInterface>
                style={{flex:1}}
                data={careers}
                renderItem={({ item ,index}) => <FilterItem index={index} label={item.label} value={item.value} />}
                horizontal={true}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 30 }}




            />}


    </View>)
}