import React, { Component } from 'react';
import { 
  Text, 
  View,
  AsyncStorage,
  Image,
  StyleSheet,
 } from 'react-native';

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      token: null
    }
  }

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/profile.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  // quando eu abrir a tela de perfil, eu quero buscar os dados do asyncstorage
  componentDidMount() {
    this._buscarDadosDoStorage();
  }

  _buscarDadosDoStorage = async() => {
    try {
      const tokenDoStorage = await AsyncStorage.getItem('@opflix:token');
      if (tokenDoStorage != null) {
        this.setState({ token: tokenDoStorage })
      }
    } catch (error) {
      
    }
  }

  render() {
    return (
      <View style={styles.backgroundProfile}> 
        <Text style={styles.text}>[---Código de Segurança---]</Text>
        <Text style={styles.text}>.................................................................................................</Text>
        <Text style={styles.text}>{this.state.token}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: {width: 25, height: 25, tintColor: 'white'},
  text: { fontSize: 15, color: 'white' },
  backgroundProfile: { backgroundColor: 'black', paddingBottom: 450 },
})

export default Profile;