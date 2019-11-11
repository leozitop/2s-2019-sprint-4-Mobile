import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, Image } from 'react-native';
export default class Categoria extends Component {

  constructor(){
    super();
    this.state = {
      categorias: [],  
    };
  }

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/categorias.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  componentDidMount(){
    this._listarCategorias();
  }

  _listarCategorias = async () => {
    await fetch('http://192.168.4.199:5000/api/Categorias')
      .then(resposta => resposta.json())
      .then(data => this.setState({categorias: data}))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <FlatList
        data={this.state.categorias}
        keyExtractor={item => item.idCategoria}
        renderItem={({item}) => (
          <View>
            {/* <Text>{item.idCategoria}</Text> */}
            <Text>{item.idCategoria}- {item.nome}</Text>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: {width: 25, height: 25, tintColor: 'white'}
})