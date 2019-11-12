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

          <Text style={styles.titulo}>Login</Text>
          <Text style={styles.text}>-----------------</Text>
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
          <TouchableOpacity style={styles.botao}
            onPress={this._realizarLogin}>
            <Text style={styles.text}>Entrar</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: { color: 'white', fontSize: 25 , textAlign: 'center', fontWeight: 'bold' },
  botao: { backgroundColor: 'red',  borderRadius: 25, marginHorizontal: 100},
  titulo: { color: '#ad1923', fontSize: 40, textAlign: 'center', fontWeight: 'bold', marginTop: 120  }
})