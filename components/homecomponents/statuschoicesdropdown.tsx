import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet,Text,View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
export default function StatusChoicesDropDown({status,setSelectedItem}:any){
    const [currentstatus,setCurrentStatus] = useState(status) 
    const statuschoices = [
      {"label":"green","status":"done"},
      {"label":"#6ea1b1","status":"doing"},
      {"label":"grey","status":"not done"}
  ]
  const changestatus =async (selectedItem:any) => {
    // TODO Change status using axios.
    setCurrentStatus(selectedItem.status)
    
  }
    return(
        <SelectDropdown
        data={statuschoices}
        onSelect={(selectedItem, index) => {
          changestatus(selectedItem)
      
        }}
        renderButton={(selectedItem, isOpened) => {
        return (
            <View style={[styles.dropdownButtonStyle,{backgroundColor:currentstatus === "done" ? "green" :currentstatus === "doing" ? "#00e6e6" : "grey"}]}>


            </View>
        );
        }}
        renderItem={(item, index, isSelected) => {
 

          // {...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: 'red'})}
        return (
            <View style={[styles.dropdownItemStyle,{backgroundColor:item.status === "done" ? "green" :item.status === "doing" ? "#00e6e6" : "grey"}]}>

            </View>
        );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
    />
    )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: 40,
      height: 40,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 15,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      height:30,

      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });