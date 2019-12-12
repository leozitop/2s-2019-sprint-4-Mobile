import React, { Component } from 'react';

import { Text, View, Image, StyleSheet, FlatList, TouchableHighlight, ScrollView  } from 'react-native';
import logout from '../assets/img/sair.png';
import logo from '../assets/img/logo.png';

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

  _logout = async () => {
    this.props.navigation.navigate('AuthStack');
  }

  _listarLancamentos = async () => {
    await fetch('http://192.168.3.160:5000/api/lancamentos')
      .then(resposta => resposta.json())
      .then(data => this.setState({ lancamentos: data }))
      .catch(erro => console.warn(erro));
  };



  render() {
    return (
      <View>
        <View style={styles.backgroundImg}>
          <Image source={logo} style={styles.imagem} />
          <TouchableHighlight 
          onPress={() => this._logout()}
          >
            <Image source={logout} style={styles.sair} />
          </TouchableHighlight>
        </View>
        <ScrollView className='container' style={styles.body}>
          <Text>  </Text>
          <Text style={styles.titulo}>Lançamentos</Text>
          <View style={styles.mainHeaderLine}></View>
          <Text>  </Text>
          <Text>  </Text>
          <FlatList
            data={this.state.lancamentos}
            keyExtractor={item => item.idLancamento}
            renderItem={({ item }) => (
              <View >
                <Text style={styles.tituloLancamento}>{item.nome}</Text>
                {/* <Text> </Text> */}
                <Image style={styles.img}
                  source={{ uri: item.imagem }}
                />
                <Text>  </Text>
                <Text style={styles.text}>Sinopse: {item.sinopse}</Text>
                <Text style={styles.text}>Categoria: {item.idCategoriaNavigation != undefined ? item.idCategoriaNavigation.nome : 'Não tem categoria.'}</Text>
                <Text style={styles.text}>Duração: {item.duracao}</Text>
                <Text style={styles.text}>Tipo: {item.idTipoNavigation != undefined ? item.idTipoNavigation.nome : 'Não tem tipo.'}</Text>
                <Text style={styles.text}>Data de Lançamento: {item.dataLancamento}</Text>
                <Text style={styles.text}>Plataforma: {item.idPlataformaNavigation != undefined ? item.idPlataformaNavigation.nome : 'Não tem plataforma.'}</Text>
                <Text> </Text>
                {/* <Text>{this.state.token}</Text> */}
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 25, height: 25, tintColor: 'white' },
  body: { backgroundColor: '#000', paddingBottom: 100 },
  text: { color: 'white', fontSize: 15, marginHorizontal: 20, paddingBottom: 2 },
  logo: { backgroundColor: 'black' },
  sair: { width: 30, height: 40, tintColor: 'white' },
  backgroundImg: { backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  mainHeaderLine: { width: 170, marginLeft: 122, paddingTop: 2, textAlign: 'center', borderBottomColor: '#ad1923', borderBottomWidth: 2.0 },
  titulo: { fontSize: 40, color: '#fff', textAlign: 'center' },
  img: { height: 150, width: 110, marginHorizontal: 20 },
  tituloLancamento: { color: 'red', fontSize: 20, marginHorizontal: 20, paddingBottom: 6 }
})