import { Text, View ,FlatList} from "react-native"
import FilterItem from "./filteritem"
import { FilterItemInterface } from "./qualinterfaces"
export default function FilterCarousel({style}:any){
    const careers = [{"label":"React","value":"react"},{"label":"Python","value":"python"},{"label":"C#","value":"c#"},{"label":"Angular","value":"angular"},{"label":"C++","value":"cpp"},{"label":"Vue","value":"vue"},{"label":"Vite","value":"vite"}]
    return(
    <View style={[style,{}]}>
 
           
           {careers &&
                <FlatList<FilterItemInterface>
                   
                data={careers}
                renderItem={({ item }) => <FilterItem label={item.label} value={item.value} />}
                horizontal={true}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 30 }}




            />}
            <View style={{flex:2}} >
                <Text>Results: Result</Text>

            </View>
                
       

    </View>)
}