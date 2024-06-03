import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet,Text,View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
export default function IndustryChoicesDropDown({dropdowndata,dropdownlabel,setSelectedItem}:any){
    
    return(
        <SelectDropdown
        data={dropdowndata}
        onSelect={(selectedItem, index) => {
        setSelectedItem(selectedItem)
        }}
        renderButton={(selectedItem, isOpened) => {
        return (
            <View style={styles.dropdownButtonStyle}>

            <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.label) || dropdownlabel}
            </Text>
            <Entypo name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
            </View>
        );
        }}
        renderItem={(item, index, isSelected) => {
        return (
            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>

            <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
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
      width: 200,
      height: 40,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
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