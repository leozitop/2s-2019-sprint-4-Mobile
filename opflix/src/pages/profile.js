import React, { Component } from 'react';
import { Text, View, AsyncStorage, Image, StyleSheet, TouchableHighlight } from 'react-native';
import logout from '../assets/img/sair.png';
import logo from '../assets/img/logo.png';
import jwt from 'jwt-decode';

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      token: null,
      email: null,
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

  _logout = async () => {
    this.props.navigation.navigate('AuthStack');
  }

  _buscarDadosDoStorage = async () => {
    try {
      // console.warn(jwt(await AsyncStorage.getItem('@opflix:token')).email)
      const dadosDoStorage = jwt(await AsyncStorage.getItem('@opflix:token')).email;
      const tokenDoStorage = await AsyncStorage.getItem('@opflix:token');
      if (tokenDoStorage != null) {
        this.setState({ token: tokenDoStorage });
        this.setState({ email: dadosDoStorage });
      }
    } catch (error) {

    }
  }

  render() {
    return (
      <View>
        <View style={styles.backgroundImg}>
          <Image source={logo} style={styles.imagem} />
          <TouchableHighlight onPress={() => this._logout()}>
            <Image source={logout} style={styles.sair} />
          </TouchableHighlight>
        </View>
        <View style={styles.backgroundProfile}>
          <Text>  </Text>
          <Text style={styles.titulo}>Perfil</Text>
          <View style={styles.mainHeaderLine}></View>
          <Text>  </Text>
          <Text>  </Text>
          <Text style={styles.text}>Usuario: {this.state.email}</Text>
          <Text>  </Text>
          <Text>  </Text>
          <Text style={styles.text}>{this.state.token}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 25, height: 25, tintColor: 'white' },
  text: { fontSize: 15, color: 'white', marginHorizontal: 20 },
  backgroundProfile: { backgroundColor: 'black', paddingBottom: 450 },
  logo: { backgroundColor: 'black' },
  sair: { width: 30, height: 40, tintColor: 'white' },
  backgroundImg: { backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  mainHeaderLine: { width: 170, marginLeft: 122, paddingTop: 2, textAlign: 'center', borderBottomColor: '#ad1923', borderBottomWidth: 2.0 },
  titulo: { fontSize: 40, color: '#fff', textAlign: 'center' },
})

export default Profile;