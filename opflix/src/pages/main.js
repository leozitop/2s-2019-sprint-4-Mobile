import React, { Component } from 'react';

import { FlatList, Text, View, } from 'react-native';
export default class Main extends Component {

  constructor(){
    super();
    this.state = {
      lancamentos: [{
      idLancamento: 1,
      lancamento: 'Coringa',
      idCategoria: 1,
      duracao: '122',
      idTipo: 1,
      dataLancamento: '03/10/2019',
      idPlataforma: 2
      }]  
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.lancamentos}
        keyExtractor={item => item.idLancamento}
        renderItem={({item}) => (
          <View>
            <Text>Titulo: {item.lancamento}</Text>
            <Text>IdCategoria: {item.idCategoria}</Text>
            <Text>Duração(min): {item.duracao}</Text>
            <Text>IdTipo: {item.idTipo}</Text>
            <Text>Data de Lançamento: {item.dataLancamento}</Text>
            <Text>IdPlataforma: {item.idPlataforma}</Text>
          </View>
        )}
      />
    );
  }
}