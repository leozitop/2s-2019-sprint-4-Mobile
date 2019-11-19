import React, { Component } from 'react';

import { StyleSheet, Image, View, FlatList, Text, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Filtro extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/filtro.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      lancamentos: [],
      categoriaEscolhida: null,
      categorias: [],
    }
  }

  componentDidMount() {
    //this._carregarLancamentos();
    this._carregarCategorias();
  }

  _filtroCategoria = async () => {
    await fetch('http://192.168.4.199:5000/api/lancamentos/filtroCategoria/' + this.state.categoriaEscolhida, {
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
      <View  style={styles.backgroundFiltro}>
          <View style={styles.backgroundImg}>
            <Image source={require('../assets/img/logo.png')} style={styles.imagem}/>
            <Image source={require('../assets/img/sair.png')} style={styles.sair}/>
          </View>
        <View> 
          <Text>  </Text>
          <Text style={styles.titulo}>Filtro por categoria</Text>
          <View style={styles.mainHeaderLine}></View>
          <Text>  </Text>
          <Picker style={styles.text} selectedValue={this.state.categoriaEscolhida} onValueChange={(itemValue) => this.setState({ categoriaEscolhida: itemValue })}>
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
                  <Text style={styles.text}>{item.nome}</Text>
                  <Text style={styles.text}>{item.sinopse}</Text>
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
      </View>
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
  tabNavigatorIcon: { width: 25, height: 25, tintColor: 'white' },
  backgroundFiltro: { backgroundColor: '#000', paddingBottom: 550},
  text: { fontSize: 20, color: 'white', textAlign: 'center' },
  logo: { backgroundColor: 'black' },
  sair: { width: 30, height: 40, tintColor: 'white' },
  backgroundImg: { backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  mainHeaderLine: { width: 170, marginLeft: 122, paddingTop: 2, textAlign: 'center', borderBottomColor: '#ad1923', borderBottomWidth: 2.0 },
  titulo: { fontSize: 40, color: '#fff', textAlign: 'center' },
  botao: { backgroundColor: 'red', borderRadius: 25, marginHorizontal: 150 },
  botaoText: { color: '#fff', fontSize: 20 , textAlign: 'center', fontWeight: 'bold' },
  lancamento: { backgroundColor: '#000000', marginHorizontal: 20, padding: 10, opacity: 0.5 },
});
