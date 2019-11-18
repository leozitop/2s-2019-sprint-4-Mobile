import React, { Component } from 'react';

import { Text, View, TextInput, TouchableOpacity, AsyncStorage, ImageBackground, StyleSheet } from 'react-native';
import image from '../assets/img/background.png'

export default class Login extends Component {

  static navigationOptions = {
    header: null,
  };

  // constructor
  // state
  constructor() {
    super();
    this.state = {
      email: 'helena@email.com',
      senha: '123456',
    };
  }

  // pegar informaçao e enviar para a api
  _realizarLogin = async () => {
    // console.warn(this.state.email + ' - ' + this.state.senha);
    fetch('http://192.168.4.199:5000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
      }),
    })
      .then(resposta => resposta.json())
      .then(data => this._irParaNome(data.token))
      .catch(erro => console.warn('vishhh' + erro));
  };

  _irParaNome = async tokenRecebido => {
    if (tokenRecebido != null) {
      try {
        // salvar essa informacao no AsyncStorage
        await AsyncStorage.setItem('@opflix:token', tokenRecebido);
        // redirecionar
        this.props.navigation.navigate('MainNavigator');
      } catch (error) {

      }
    }
  };

  render() {
    return (

      <View>
        <ImageBackground  source={image} style={{width: '100%', height: '100%', opacity: 0.9}}>

          <View style={styles.backgroundLogin}>
            <Text style={styles.titulo}>Login</Text>
            <View style={styles.mainHeaderLine}></View>
            <Text>  </Text>
            <TextInput style={styles.text} 
              placeholder='email'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput style={styles.text}
              placeholder='senha'
              value={this.state.senha}
              // secureTextEntry={true}
              onChangeText={senha => this.setState({ senha })}
            />
            <Text> </Text>
            <TouchableOpacity style={styles.botao}
              onPress={this._realizarLogin}>
              <Text style={styles.botaoText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: { color: '#d6d6d6', fontSize: 25 , textAlign: 'center', fontWeight: 'bold' },
  botao: { backgroundColor: 'red', borderRadius: 25, marginHorizontal: 100 },
  titulo: { color: '#fff', fontSize: 60, textAlign: 'center', fontWeight: 'bold', marginTop: 120  },
  backgroundLogin: { backgroundColor: 'black', paddingBottom: 300, paddingTop: 25, opacity: 0.9},
  mainHeaderLine: { width: 170, marginLeft: 122, paddingTop: 2, textAlign: 'center', borderBottomColor: '#ad1923', borderBottomWidth: 2.0 },
  botaoText: { color: '#fff', fontSize: 25 , textAlign: 'center', fontWeight: 'bold' },
})