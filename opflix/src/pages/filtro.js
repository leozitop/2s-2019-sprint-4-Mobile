import React, { Component } from 'react';

import { StyleSheet, Image, View, FlatList, Fragment, Text, TouchableOpacity, Picker, AsyncStorage } from 'react-native';

export default class Filtro extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/filtro.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  constructor(props){
    super(props);
    this.state = {
        lancamentos: [
            // {idLancamento: 1, titulo: 'filme 1', sinopse: 'sinopse filme 1', dataLancamento: '2019-11-11T00:00.000', genero: 'nb', categoria: 'gay', plataforma: '15 ou mais'}
        ],
        categoriaEscolhida: null,
        categorias: []   
    }
}

componentDidMount(){
    this._carregarLancamentos();
    this._carregarPlataformas();
}

_carregarLancamentos = async () =>{
    await fetch('http://192.168.4.183:5000/api/lancamentos/listar/categoria/' + this.state.categoriaEscolhida, {
        headers:{
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await AsyncStorage.getItem("opflix-token")
        },
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({lancamentos: data}))
      .catch(erro => console.warn(erro))
}
_carregarPlataformas = async () => {
    await fetch('http://192.168.4.183:5000/api/categorias', {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + await AsyncStorage.getItem("opflix-token")
    }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({categorias: data}))
      .catch(erro => console.warn(erro));
  };

render() {
    return (
        <Fragment>
            <View>
                <Text>Filtrar lançamentos por categoria</Text>
                <Picker selectedValue={this.state.categoriaEscolhida} onValueChange={(itemValue) => this.setState({categoriaEscolhida: itemValue})}>
                    <Picker.Item label="Escolha a plataforma:" value="0" selectedValue/>
                        {this.state.categorias.map(e => {
                            return( <Picker.Item label={e.nome} value={e.idCategoria}/>
                                )})}
                </Picker>
                <TouchableOpacity onPress={this._carregarLancamentos}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.lancamentos}
                    keyExtractor={item => item.idLancamento}
                    renderItem={({ item }) => (
                        <View>
                            
                            <Text>Titulo: {item.lancamento}</Text>
                            <Text>Sinopse: {item.sinopse}</Text>
                           
                        </View>
                    )}
                />
            </View>
        </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   justifyContent: 'flex-start'
  // },
  // emailItem:{
  //   borderBottomWidth: 0.5,
  //   borderColor: 'rgba(0,0,0,0.3)',
  //   padding: 10
  // },
  // emailSubject: {
  //   color: 'rgba(0,0,0,0.5)'
  // },
  // searchInput:{
  //   padding: 10,
  //   borderColor: '#CCC',
  //   borderWidth: 1
  // },
  tabNavigatorIcon: {width: 25, height: 25, tintColor: 'white'}
});
