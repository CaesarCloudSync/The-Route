import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native'
import Header from '@/components/qualificationscomponents/header';
import MainBody from '@/components/qualificationscomponents/mainbody';
import FilterCarousel from '@/components/qualificationscomponents/filtercarousel';
import Search from '@/components/qualificationscomponents/search';
export default function QualificationsScreen() {
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
      <FilterCarousel style={{flex: 0.25, backgroundColor: 'white'}} />
      <MainBody style={{flex: 3, backgroundColor: 'white'}} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});