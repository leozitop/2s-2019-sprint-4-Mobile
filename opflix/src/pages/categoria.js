import React, { Component } from 'react';

import { StyleSheet, Image, View, FlatList, Text, TouchableOpacity, Picker, AsyncStorage, ScrollView, TouchableHighlight } from 'react-native';
import logout from '../assets/img/sair.png';
import logo from '../assets/img/logo.png';

export default class Categoria extends Component {

  constructor(){
    super();
    this.state = {
      categorias: [],  
      lancamentos: [],
      categoriaEscolhida: null,
      categorias: [],
      listaFiltrada: [],
      dataEscolhida: null,
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
    this._carregarCategorias();
  }

  _logout = async () => {
    this.props.navigation.navigate('AuthStack');
  }

  _listarCategorias = async () => {
    await fetch('http://192.168.3.160:5000/api/Categorias')
      .then(resposta => resposta.json())
      .then(data => this.setState({categorias: data}))
      .catch(erro => console.warn(erro));
  };

  // filtro por categoria

  _filtroCategoria = async () => {
    await fetch('http://192.168.3.160:5000/api/lancamentos/filtroCategoria/' + this.state.categoriaEscolhida, {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      },
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ lancamentos: data }))
      .catch(erro => console.warn(erro))
  }

  _carregarCategorias = async () => {
    await fetch('http://192.168.4.199:5000/api/categorias', {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ categorias: data }))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.backgroundImg}>
          <Image source={logo} style={styles.imagem} />
          <TouchableHighlight onPress={() => this._logout()}>
            <Image source={logout} style={styles.sair} />
          </TouchableHighlight>
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
                <Text style={styles.textCategoria}>{item.idCategoria} - {item.nome}</Text>
              </View>
            )}
          />
        </View>
        
        <View style={styles.backgroundFiltro}> 
          <Text>  </Text>
          <Text style={styles.titulo}>Filtro por categoria</Text>
          <View style={styles.mainHeaderLine}></View>
          <Text>  </Text>
          <Picker style={styles.picker} selectedValue={this.state.categoriaEscolhida} onValueChange={(itemValue) => this.setState({ categoriaEscolhida: itemValue })}>
            <Picker.Item label="Escolha a categoria:" value="0" selectedValue />
            {this.state.categorias.map(e => {
              return (<Picker.Item label={e.nome} value={e.idCategoria} />
              )
            })}
          </Picker>
          <Text>  </Text>
          <ScrollView>
            <FlatList style={styles.lancamento}
              data={this.state.lancamentos}
              keyExtractor={item => item.idLancamento}
              renderItem={({ item }) => (
                <View>
                  <Image style={styles.img} source={{uri:item.imagem}}/>
                  <Text style={styles.text}>Titulo: {item.nome}</Text>
                  <Text style={styles.text}>Sinopse: {item.sinopse}</Text>
                  <Text> </Text>
                  <Text> </Text>
                  <Text> </Text>
                </View>
              )}
            />
            <TouchableOpacity style={styles.botao}
              onPress={this._filtroCategoria}>
              <Text style={styles.botaoText}>Buscar</Text>
            </TouchableOpacity>
            <Text> </Text>
          </ScrollView>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 25, height: 25, tintColor: 'white' },
  backgroundCategoria: { backgroundColor: 'black' },
  backgroundFiltro: { backgroundColor: '#000', },
  text: { fontSize: 20, color: 'white', marginHorizontal: 20 },
  logo: { backgroundColor: 'black' },
  sair: { width: 30, height: 40, tintColor: 'white' },
  backgroundImg: { backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  mainHeaderLine: { width: 170, marginLeft: 122, paddingTop: 2, textAlign: 'center', borderBottomColor: '#ad1923', borderBottomWidth: 2.0 },
  titulo: { fontSize: 40, color: '#fff', textAlign: 'center' },
  botao: { backgroundColor: 'red', borderRadius: 25, marginHorizontal: 150 },
  botaoText: { color: '#fff', fontSize: 20 , textAlign: 'center', fontWeight: 'bold' },
  lancamento: { backgroundColor: '#000', marginHorizontal: 20, padding: 10, opacity: 0.7 },
  picker: { color: 'black', fontWeight: 'bold', backgroundColor: 'white', borderRadius: 20,  textAlign: 'center', fontSize: 20, marginHorizontal: 20 },
  img: { height: 150, width: 110, opacity: 0.7, marginHorizontal: 20 },
  textCategoria: { fontSize: 20, color: 'white', marginHorizontal: 20, textAlign: 'center' },
})