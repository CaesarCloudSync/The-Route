import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native'
import NavFooter from '@/components/navfooter/navfooter';
import Header from '@/components/qualificationscomponents/header';
import MainBody from '@/components/qualificationscomponents/mainbody';
import FilterCarousel from '@/components/qualificationscomponents/filtercarousel';
import Search from '@/components/qualificationscomponents/search';
import { description } from '@/components/qualificationscomponents/desctiption_lorem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function QualificationsScreen() {
  const chosen_career = "Game Development"
  const careers_info = {"filters":[{"label":"Game Development","value":"game_development"},{"label":"Python","value":"python"},{"label":"C#","value":"c#"},{"label":"Angular","value":"angular"},{"label":"C++","value":"cpp"},{"label":"Vue","value":"vue"},{"label":"Vite","value":"vite"}]}
  const [qualifications,setQualifications] = useState([]);
  const [user_interests,setUserInterests] = useState<any>(null);
  const getqualifications =async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const config = {
      headers: { Authorization: `Bearer ${access_token}` }
  };
    const response= await axios.get("http://192.168.0.12:8080/api/v1/getqualifications?page=1")
    let result = response.data
    setQualifications(result["qualifications"])
    const responseinterests = await axios.get("http://192.168.0.12:8080/api/v1/getuserinterests",config)
    let resultinterests = responseinterests.data
    setUserInterests(resultinterests)
  }
  useEffect(() =>{
    getqualifications()
  },[])
  console.log(user_interests)
  //const qualifications = [{"qual_name":"Game Development","link":"https://croydon.ac.uk/","description":description,"qual_icon":"https://qual_icon","qualuuid":"qual-1234","institution":"Croydon College","online_freq":"Online 2 days a week","in_person_freq":"In Person 1 day a week","course_length":"2 years study","earning_potential_lower":"60k","earning_potential_upper":"180K","earning_potential_description":"no experience needed"},{"qualuuid":"qual-1234","institution":"GAMES ARE US","link":"https://www.universitygames.com/","description":description,"online_freq":"Online 4 days a week","in_person_freq":"","course_length":"18 months study","qual_name":"Game Designer","qual_icon":"https://qual_icon","earning_potential_lower":"75k","earning_potential_upper":"120K","earning_potential_description":"3 months training provided before job offer"},{"qualuuid":"qual-1234","institution":"GAMES . STUDY","link":"https://classmaster.io/learning-games/online-games-for-studying/","description":description,"online_freq":"2 days a week","in_person_freq":"In person 3 days a week","course_length":"18 months study","qual_name":"Game Content Creator","qual_icon":"https://qual_icon","earning_potential_lower":"60k","earning_potential_upper":"80K","earning_potential_description":"full stack developer"}]
  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
          backgroundColor: 'white'
        },
      ]}>
      {qualifications.length !== 0 &&<Header style={{flex: 0.1, backgroundColor: 'white'}} />}
      {qualifications.length !== 0 &&<Search style={{flex: 0.3, backgroundColor: 'white'}} />}
      {qualifications.length !== 0 && user_interests !== null &&<FilterCarousel careers={careers_info.filters} style={{flex: 0.20, backgroundColor: 'white'}} />}
      {qualifications.length !== 0 && user_interests !== null &&
                <View style={{flex:0.23,justifyContent:"center",alignItems:"center",marginTop:10}} >
                  <Text style={{fontWeight:"bold",fontSize:20}}>{user_interests.careers_label}</Text>
                  <Text style={{fontWeight:"bold",fontSize:15}}>{user_interests.industry_label}</Text>
  
              </View>
                  }
      {qualifications.length !== 0 && <MainBody qualifications={qualifications} style={{flex: 3, backgroundColor: 'white'}} />}
      {qualifications.length !== 0 &&<NavFooter style={{flex:0.13}}/>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});