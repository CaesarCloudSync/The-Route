import { Text,View,TextInput} from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "react-native";
import { useState } from "react";
import { FontAwesome6 } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
export default function CreateAccountFields({index,createaccountdata,accountdatalabel,accountdatavalue,setCreateAccountData}:any){
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (dateiso:any) => {
        let  date = new Date(dateiso);
        createaccountdata[index].value = date.toISOString().substring(0, 10)
        setCreateAccountData(createaccountdata)
      hideDatePicker();
    };
    const onChangeText = (text:any) => {
        createaccountdata[index].value = text
        setCreateAccountData(createaccountdata)
        
    }
    return(
        <View style={{flex:0.1,gap:10}}>
        <Text style={{fontWeight:"bold"}}>{accountdatalabel}</Text>
        {accountdatalabel !== "Date of Birth" ?
        <View style={{flex:0.4,flexDirection:"row",width:"100%",borderWidth:1,justifyContent:"center",alignItems:"center",borderRadius:5,height:50}}>
       
        <TextInput
            placeholder={accountdatalabel}
        style={{
            width:"80%",
            height: 20,

            borderRadius:5
        
        }}

        placeholderTextColor="grey" 
        onChangeText={onChangeText}
     
        />

        <View style={{}}>
        <Text style={{right:"10%"}}>Logo</Text>


        </View>
        
        </View>
        :
        <View style={{flex:0.4,flexDirection:"row",width:"100%",borderWidth:1,justifyContent:"center",alignItems:"center",borderRadius:5,height:50,gap:10}}>
       

       <TouchableOpacity onPress={showDatePicker}>
       <FontAwesome6 name="calendar-days" size={24} color="black" />
       </TouchableOpacity>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <View style={{alignItems:"flex-end"}}>
            <Text>{createaccountdata[index].value}</Text>
        </View>
        
        </View>}
    </View>
    )
}