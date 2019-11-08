import React, { Component } from 'react';

import { Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';

export default class Login extends Component {

  static navigationOptions = {
    header: null,
  };

  // constructor
  // state
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
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
      }catch (error) {

      }
    }
  };

  render() {
    return (
      <View>
        <TextInput placeholder='email'
          onChangeText={email => this.setState({email})}
        />
        <TextInput placeholder='senha'
          // secureTextEntry={true}
          onChangeText={senha => this.setState({senha})}
        />
        <TouchableOpacity onPress={this._realizarLogin}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}