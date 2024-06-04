import { ScrollView, StyleSheet } from 'react-native';


import { Text,View } from 'react-native';

import Header from '@/components/homecomponents/header';
import MainBody from '@/components/homecomponents/mainbody';
import ProgressTracker from '@/components/homecomponents/progresstracker';
import StatusChoicesDropDown from '@/components/homecomponents/statuschoicesdropdown';
export default function TabOneScreen() {
  const qualifications = [{"qualuuid":"qual-1234","qual_name":"Python Award","qual_icon":"https://qual_icon"},{"qualuuid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualuuid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualuuid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualuuid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualuuid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualuuid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualuuid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualuuid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"}]

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <Header style={{flex: 0.1}} />
      <ProgressTracker progress={90} style={{flex: 0.07}} />
      
      <View style={{flex: 0.03,justifyContent:"center",alignItems:"center"}}>
        <Text>(chosen career path)</Text>


      </View>
      <ScrollView style={{flex:1}}>
     
      <View style={{marginLeft:"5%",flexDirection:"row",marginBottom:"5%"}}>
        <Text style={{marginRight:"2%"}}>Logo</Text>
  
        <Text>Skillset Learning</Text>
      </View>
      <View style={{justifyContent:"center",alignItems:"center",gap:20}} >
        {[{"skillsetuuid":"1245","label":"Python","value":"python","status":"done"},{"skillsetuuid":"1245","label":"React","value":"react","status":"doing"},{"skillsetuuid":"1245","label":"FastAPI","value":"fastapi","status":"not done"}].map((item,index) =>{
          return(
            <View style={{width:"90%",height:60,backgroundColor:index % 2 === 1 ? "black": "#6ea1b1",borderRadius:5,flexDirection:"row",alignItems:"center"}}>
              <Text style={{flex:0.95,marginLeft:"10%",color:index % 2 === 1 ? "white": "black"}}>{item.label}</Text>

              <StatusChoicesDropDown status={item.status} />

            </View>
          )
        })}
      </View>

      <View style={{marginLeft:"5%",flexDirection:"row",marginBottom:"5%"}}>
        <Text style={{marginRight:"2%"}}>Logo</Text>
  
        <Text>Qualification/Uni/Bootcamps/courses</Text>
      </View>
      <View style={{justifyContent:"center",alignItems:"center",gap:20}} >
        {[1,2,3,4].map((item,index) =>{
          return(
            <View style={{width:"90%",height:60,backgroundColor:index % 2 === 1 ? "black": "#6ea1b1",borderRadius:5}}>

            </View>
          )
        })}
      </View>

      <View style={{marginLeft:"5%",flexDirection:"row",marginBottom:"5%"}}>
        <Text style={{marginRight:"2%"}}>Logo</Text>
  
        <Text>Career/Job/Consulting</Text>
      </View>
      <View style={{justifyContent:"center",alignItems:"center",gap:20}} >
        {[1,2,3,4].map((item,index) =>{
          return(
            <View style={{width:"90%",height:60,backgroundColor:index % 2 === 1 ? "black": "#6ea1b1",borderRadius:5}}>

            </View>
          )
        })}
      </View>


     
     
      </ScrollView>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});