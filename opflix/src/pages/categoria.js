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
      <View>
        <View style={styles.backgroundImg}>
          <Image source={require('../assets/img/logo.png')} style={styles.imagem}/>
          <Image source={require('../assets/img/sair.png')} style={styles.sair}/>
        </View>
        <View style={styles.backgroundCategoria}>
          <Text>  </Text>
          <Text style={styles.titulo}>Categorias</Text>
          <View style={styles.mainHeaderLine}></View>
          <Text>  </Text>
          <FlatList
            data={this.state.categorias}
            keyExtractor={item => item.idCategoria}
            renderItem={({item}) => ( 
              <View>
                {/* <Text>{item.idCategoria}</Text> */}
                <Text style={styles.text}>{item.idCategoria} - {item.nome}</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 25, height: 25, tintColor: 'white' },
  text: { fontSize: 20, color: 'white', textAlign: 'center' },
  titulo: { fontSize: 40, color: '#fff', textAlign: 'center' },
  backgroundCategoria: { backgroundColor: '#000', paddingBottom: 200 },
  logo: { backgroundColor: 'black' },
  sair: { width: 30, height: 40, tintColor: 'white' },
  backgroundImg: { backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  mainHeaderLine: { width: 170, paddingTop: 2, marginLeft: 122, textAlign: 'center', borderBottomColor: '#ad1923', borderBottomWidth: 2.0 }
})