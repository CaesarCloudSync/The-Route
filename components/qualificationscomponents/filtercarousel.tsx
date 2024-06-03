import { Text, View ,FlatList} from "react-native"
import FilterItem from "./filteritem"
import { FilterItemInterface } from "./qualinterfaces"
export default function FilterCarousel({style}:any){
    const careers = [{"label":"React","value":"react"},{"label":"Python","value":"python"},{"label":"C#","value":"c#"},{"label":"Angular","value":"angular"},{"label":"C++","value":"cpp"},{"label":"Vue","value":"vue"},{"label":"Vite","value":"vite"}]
    return(
    <View style={[style,{padding:"2%"}]}>
 
           
           {careers &&
                <FlatList<FilterItemInterface>
                style={{flex:1.5}}
                data={careers}
                renderItem={({ item }) => <FilterItem label={item.label} value={item.value} />}
                horizontal={true}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 30 }}




            />}
            <View style={{flex:0.8}} >
                <Text>Results: Result</Text>

            </View>
                
       

    </View>)
}