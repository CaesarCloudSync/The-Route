import { Text, View ,FlatList} from "react-native"
import { QualificationItemInterface } from "./qualinterfaces"
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
export default function QualItem({qualuuid,qual_name,institution,qual_icon,online_freq,in_person_freq,course_length,earning_potential_lower,earning_potential_upper,earning_potential_description,description}:any){ // :QualificationItemInterface
    const router = useRouter();
    const navqualinfopage = () =>{
        router.push({ pathname: "/qualinfo", params: {"qual_info_param":JSON.stringify({qualuuid:qualuuid,qual_name:qual_name,institution:institution,qual_icon:qual_icon,online_freq:online_freq,in_person_freq:in_person_freq,course_length:course_length,earning_potential_lower:earning_potential_lower,earning_potential_upper:earning_potential_upper,earning_potential_description:earning_potential_description,description:description})}})

    }

    return(
    <TouchableOpacity onPress={() =>{navqualinfopage()}} style={{backgroundColor:"#354b53",padding:20,borderRadius:4}}>
        <View style={{flexDirection:"row",gap:10}} >
            <View style={{flex:0.2,top:"15%"}}>
                <View style={{width:35,height:35,backgroundColor:"#36b2db",borderRadius:2}}></View>
            </View>
            <View style={{flex:1,marginTop:5}}>
     
            <Text style={{color:"white"}}>
            {institution}
            </Text>
            <Text style={{color:"white"}}>{qual_name}</Text>
            {online_freq !== "" &&
            <Text style={{color:"grey"}}>
            {online_freq}
            </Text>}
            {in_person_freq !== "" &&
            <Text style={{color:"grey"}}>
            {in_person_freq}
            </Text>}


            <Text style={{color:"grey"}}>
            {course_length}
            </Text>
            <Text style={{color:"grey"}}>Earning Potential: {earning_potential_lower} - £{earning_potential_upper} /yr {earning_potential_description !== "" && `(${earning_potential_description})`}</Text>
            </View>
            <View style={{flex:0.1}}>
            <FontAwesome style={{color:"#d9d9d9"}} name="bookmark" size={27} />
            </View>

        </View>
    </TouchableOpacity>)
}