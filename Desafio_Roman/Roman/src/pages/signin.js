import React,{Component} from 'react';

import {View, TextInput, TouchableOpacity, AsyncStorage, Text} from 'react-native';

export default class Signin extends Component{

    constructor(){
        super();
        this.state = {
            email: '',
            senha: ''
        };

        _realizarLogin = async () => {
            await fetch('http://192.168.4.199:5000/api/login', {
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
            .then(data => this._pegarToken(data.token))
            .catch(erro => console.warn('Se fudeu' + erro))
        }

        _pegarToken = async tokenRecebido => {
            if(tokenRecebido != null){
                try {
                    //armazena as informações do token no AsyncStorage
                    await AsyncStorage.setItem('@roman:token' + tokenRecebido)
                    //redireciona
                    this.props.navigation.navigate('MainNavigator')
                } catch (error) {
                    
                }
            }
        }
    }

    render(){
        return(
            <View>
                <TextInput 
                    placeholder="email"
                    onChange={this.setState({email})}
                />

                <TextInput 
                    placeholder="senha"
                    onChange={this.setState({senha})}
                />

                <TouchableOpacity onPress={this._pegarToken}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
    }
}