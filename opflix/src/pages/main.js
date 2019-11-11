import React, { Component } from 'react';

import { Text, View, Image, StyleSheet, FlatList, AsyncStorage } from 'react-native';
export default class Main extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/lancamentos.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  constructor() {
    super();
    this.state = {
      lancamentos: [],
      // token: null,
    };
  }

  // _buscarDadosDoStorage = async() => {
  //   try {
  //     const tokenDoStorage = await AsyncStorage.getItem('@opflix:token');
  //     if (tokenDoStorage != null) {
  //       this.setState({ token: tokenDoStorage })
  //     }
  //   } catch (error) {
      
  //   }
  // }

  componentDidMount() {
    this._listarLancamentos();
  }

  _listarLancamentos = async () => {
    await fetch('http://192.168.4.199:5000/api/lancamentos')
      .then(resposta => resposta.json())
      .then(data => this.setState({ lancamentos: data }))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <FlatList  style={styles.body}
        data={this.state.lancamentos}
        keyExtractor={item => item.idLancamento}
        renderItem={({ item }) => (
          <View >
            <Text style={styles.text}>{item.nome}</Text>
            <Text style={styles.text}>{item.sinopse}</Text>
            <Text style={styles.text}>{item.idCategoriaNavigation.nome}</Text>
            <Text style={styles.text}>{item.duracao}</Text>
            <Text style={styles.text}>{item.idTipoNavigation.nome}</Text>
            <Text style={styles.text}>{item.dataLancamento}</Text>
            <Text style={styles.text}>{item.idPlataformaNavigation.nome}</Text>
            <Text>{item.imagem}</Text>
            {/* <Text>{this.state.token}</Text> */}
          </View>
        )}
        />
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 25, height: 25, tintColor: 'white' },
  body: {backgroundColor: '#000000'},
  text: {color: 'white'},
})