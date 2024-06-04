import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native'
import Header from '@/components/qualificationscomponents/header';
import MainBody from '@/components/qualificationscomponents/mainbody';
import FilterCarousel from '@/components/qualificationscomponents/filtercarousel';
import Search from '@/components/qualificationscomponents/search';
import { description } from '@/components/qualificationscomponents/desctiption_lorem';
export default function QualificationsScreen() {
  const chosen_career = "Game Development"
  const careers_info = {"filters":[{"label":"Game Development","value":"game_development"},{"label":"Python","value":"python"},{"label":"C#","value":"c#"},{"label":"Angular","value":"angular"},{"label":"C++","value":"cpp"},{"label":"Vue","value":"vue"},{"label":"Vite","value":"vite"}]}
  const qualifications = [{"qual_name":"Game Development","link":"https://croydon.ac.uk/","description":description,"qual_icon":"https://qual_icon","qualuuid":"qual-1234","institution":"Croydon College","online_freq":"Online 2 days a week","in_person_freq":"In Person 1 day a week","course_length":"2 years study","earning_potential_lower":"60k","earning_potential_upper":"180K","earning_potential_description":"no experience needed"},{"qualuuid":"qual-1234","institution":"GAMES ARE US","link":"https://www.universitygames.com/","description":description,"online_freq":"Online 4 days a week","in_person_freq":"","course_length":"18 months study","qual_name":"Game Designer","qual_icon":"https://qual_icon","earning_potential_lower":"75k","earning_potential_upper":"120K","earning_potential_description":"3 months training provided before job offer"},{"qualuuid":"qual-1234","institution":"GAMES . STUDY","link":"https://classmaster.io/learning-games/online-games-for-studying/","description":description,"online_freq":"2 days a week","in_person_freq":"In person 3 days a week","course_length":"18 months study","qual_name":"Game Content Creator","qual_icon":"https://qual_icon","earning_potential_lower":"60k","earning_potential_upper":"80K","earning_potential_description":"full stack developer"}]
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
      <Header style={{flex: 0.3, backgroundColor: 'white'}} />
      <Search style={{flex: 0.3, backgroundColor: 'white'}} />
      <FilterCarousel chosen_career={chosen_career} careers={careers_info.filters} style={{flex: 0.40, backgroundColor: 'white'}} />
      <MainBody qualifications={qualifications} style={{flex: 3, backgroundColor: 'white'}} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});