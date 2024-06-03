import { ScrollView, StyleSheet } from 'react-native';


import { Text,View } from 'react-native';

import Header from '@/components/homecomponents/header';
import MainBody from '@/components/homecomponents/mainbody';
import ProgressTracker from '@/components/homecomponents/progresstracker';
export default function TabOneScreen() {
  const qualifications = [{"qualid":"qual-1234","qual_name":"Python Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"},{"qualid":"qual-2222","qual_name":"React Award","qual_icon":"https://qual_icon"}]

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <Header style={{flex: 0.2, backgroundColor: 'red'}} />
      <ProgressTracker progress={90} style={{flex: 0.07, backgroundColor: 'yellow'}} />
      
      <View style={{flex: 0.03,backgroundColor: 'blue',justifyContent:"center",alignItems:"center"}}>
        <Text>(chosen career path)</Text>


      </View>
      <ScrollView style={{flex:1}}>
     
      <View style={{marginLeft:"5%",flexDirection:"row",marginBottom:"5%"}}>
        <Text style={{marginRight:"2%"}}>Logo</Text>
  
        <Text>Skillset Learning</Text>
      </View>
      <View style={{justifyContent:"center",alignItems:"center",gap:20}} >
        {[{"trackitemid":"1245","trackitemname":"Python"},{"trackitemid":"1245","trackitemname":"React"},{"trackitemid":"1245","trackitemname":"Python"}].map(() =>{
          return(
            <View style={{width:"80%",height:60,backgroundColor:"red"}}>

            </View>
          )
        })}
      </View>

      <View style={{marginLeft:"5%",flexDirection:"row",marginBottom:"5%"}}>
        <Text style={{marginRight:"2%"}}>Logo</Text>
  
        <Text>Qualification/Uni/Bootcamps/courses</Text>
      </View>
      <View style={{justifyContent:"center",alignItems:"center",gap:20}} >
        {[1,2,3,4].map(() =>{
          return(
            <View style={{width:"80%",height:60,backgroundColor:"red"}}>

            </View>
          )
        })}
      </View>

      <View style={{marginLeft:"5%",flexDirection:"row",marginBottom:"5%"}}>
        <Text style={{marginRight:"2%"}}>Logo</Text>
  
        <Text>Career/Job/Consulting</Text>
      </View>
      <View style={{justifyContent:"center",alignItems:"center",gap:20}} >
        {[1,2,3,4].map(() =>{
          return(
            <View style={{width:"80%",height:60,backgroundColor:"red"}}>

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