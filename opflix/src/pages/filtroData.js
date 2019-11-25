import React, { Component } from 'react';

import { StyleSheet, Image, View, FlatList, Text, TouchableOpacity, Picker, AsyncStorage, ScrollView, TouchableHighlight } from 'react-native';
import logout from '../assets/img/sair.png';
import logo from '../assets/img/logo.png';


export default class FiltroData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lancamentos: [],
      DataEscolhida: null,
      // datas: [
      //   { idData: 1, data: '03-10-19' },
      //   { idData: 2, data: '25-04-19' },
      // ],
      // listaDeDatas = lancamentos.dataLancamento,
    }
  }

  componentDidMount() {
    this._carregarDataLancamento();

  }

  _logout = async () => {
    this.props.navigation.navigate('AuthStack');
  }

  _filtroData = async () => {
    await fetch('http://192.168.4.199:5000/api/lancamentos/filtroData/' + this.state.DataEscolhida, {
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

  _carregarDataLancamento = async () => {
    await fetch('http://192.168.4.199:5000/api/lancamentos', {
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

  render() {
    return (
      <View  style={styles.backgroundFiltro}>
          <View style={styles.backgroundImg}>
          <Image source={logo} style={styles.imagem} />
          <TouchableHighlight onPress={() => this._logout()}>
            <Image source={logout} style={styles.sair} />
          </TouchableHighlight>
          </View>
        <View> 
          <Text>  </Text>
          <Text style={styles.titulo}>Busca por Data</Text>
          <View style={styles.mainHeaderLine}></View>
          <Text>  </Text>
          <Picker style={styles.picker} selectedValue={this.state.DataEscolhida} onValueChange={(itemValue) => this.setState({ DataEscolhida: itemValue })}>
            <Picker.Item label="Escolha a data:" value="0" selectedValue />
            {this.state.lancamentos.map(e => {
              return (<Picker.Item label={e.dataLancamento} value={e.dataLancamento} />
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
              onPress={this._filtroData}>
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
  tabNavigatorIcon: { width: 25, height: 25, tintColor: 'white' },
  backgroundFiltro: { backgroundColor: '#000', paddingBottom: 550},
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
});