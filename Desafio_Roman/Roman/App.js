import React, {Component} from 'react';
import {Text, View, ScrollView, Image, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class App extends Component {
render(){

  return (
    <View>
      <View  style={styles.fundo}>

      <Text style={styles.sectionTitle}>☭</Text>
      </View>
      <ScrollView>

        <View>
          <Text style={styles.letra}>Soyuz nyerushimij ryespublik svobodnykh
Splotila navyeki vyelikaya Rus';
Da zdravstvuyet sozdannyj volyej narodov
Yedinyj, moguchij Sovyetskij Soyuz!

Slav'sya, otyechyestvo
Nashye svobodnoye,
Druzhby narodov nadyozhnyj oplot!
Partiya Lyenina
Sila narodnaya
Nas k torzhyestvu Kommunizma vyedyot!

Skvoz' grozi siyalo
Nam solntsye svobody
I Lyenin vyelikij nam put' ozaril
Na pravoye dyelo on podnyal narody
Na trud i na podvigi nas vdokhnovil!

Slav'sya, otyechyestvo
Nashye svobodnoye
Druzhby narodov nadyozhnyj oplot!
Partiya Lyenina
Sila narodnaya
Nas k torzhyestvu Kommunizma vyedyot!

V pobyedye byessmyertnykh idyej Kommunizma
My vidim gryadussheye nashyej strany
I krasnomu znamyeni slavnoj Otchizny
My budyem vsyegda bezzavyetno vyerny!

Slav'sya, otyechyestvo
Nashye svobodnoye
Druzhby narodov nadyozhnyj oplot!
Partiya Lyenina
Sila narodnaya
Nas k torzhyestvu Kommunizma vyedyot!</Text>
        </View>
</ScrollView>
    </View>
    
      
  );
}


}
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 240,
    color: 'yellow',
    // color: Colors.yellow,
  },
  fundo: {
    backgroundColor: 'red',
  },
  letra: {
    fontSize: 30,
  }
});
export default App;
