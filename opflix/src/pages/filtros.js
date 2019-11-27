import React, { Component } from 'react';

import { StyleSheet, Image, View, FlatList, Text, TouchableOpacity, Picker, AsyncStorage, ScrollView, TouchableHighlight } from 'react-native';
import logout from '../assets/img/sair.png';
import logo from '../assets/img/logo.png';


export default class Filtros extends Component {

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
      listaFiltrada: [],
      DataEscolhida: null,
      plataformas: [],
      plataformaEscolhida: null,
      tipos: [],
      tipoEscolhido: null,
      // datas: [
      //   { idData: 1, data: '03-10-19' },
      //   { idData: 2, data: '25-04-19' },
      // ],
      // listaDeDatas = lancamentos.dataLancamento,
    }
  }

  componentDidMount() {
    //this._carregarDataLancamento();
    this._carregarPlataformas();
    this._carregarTipos();
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

  // _carregarDataLancamento = async () => {
  //   await fetch('http://192.168.4.199:5000/api/lancamentos', {
  //     headers: {
  //       "Accept": "application/json",
  //       'Content-Type': 'application/json',
  //       "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
  //     },
  //   })
  //     .then(resposta => resposta.json())
  //     .then(data => this.setState({ lancamentos: data }))
  //     .catch(erro => console.warn(erro))
  // }

  _alterarData = async (item) => {
    // console.warn(item)
    // eu quero que esse lancamento seja armazenado na minha listaFiltrada
    // eu quero que a data buscada seja igual a data do lancamento
    this.setState({ listaFiltrada: this.state.lancamentos.filter(x => x.dataLancamento == item) })
    // console.warn(this.state.lancamentos.filter(x => x.dataLancamento == item))
    // a dataEscolhida sera o meu item
    // this.setState({ DataEscolhida: item })}

  }


  //========================================================================================================================//
  //========================================================================================================================//


  _filtroPlataforma = async () => {
    await fetch('http://192.168.4.199:5000/api/lancamentos/filtroPlataforma/' + this.state.plataformaEscolhida, {
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

  _carregarPlataformas = async () => {
    await fetch('http://192.168.4.199:5000/api/plataformas', {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ plataformas: data }))
      .catch(erro => console.warn(erro));
  };


  //========================================================================================================================//
  //========================================================================================================================//

  
  _filtroTipo = async () => {
    await fetch('http://192.168.4.199:5000/api/lancamentos/filtroTipo/' + this.state.tipoEscolhido, {
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

  _carregarTipos = async () => {
    await fetch('http://192.168.4.199:5000/api/tipos', {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ tipos: data }))
      .catch(erro => console.warn(erro));
  };


  render() {
    return (
      <ScrollView style={styles.backgroundFiltro}>
        <View style={styles.backgroundImg}>
          <Image source={logo} style={styles.imagem} />
          <TouchableHighlight onPress={() => this._logout()}>
            <Image source={logout} style={styles.sair} />
          </TouchableHighlight>
        </View>

        <View style={styles.backgroundFiltro}> 
          <Text>  </Text>
          <Text style={styles.titulo}>Filtro por plataforma</Text>
          <View style={styles.mainHeaderLine}></View>
          <Text>  </Text>
          <Picker style={styles.picker} selectedValue={this.state.plataformaEscolhida} onValueChange={(itemValue) => this.setState({ plataformaEscolhida: itemValue })}>
            <Picker.Item label="Escolha a plataforma:" value="0" selectedValue />
            {this.state.plataformas.map(e => {
              return (<Picker.Item label={e.nome} value={e.idPlataforma} />
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
              onPress={this._filtroPlataforma}>
              <Text style={styles.botaoText}>Buscar</Text>
            </TouchableOpacity>
            <Text> </Text>
          </ScrollView>
        </View>

        <View>
          <Text>  </Text>
          <Text style={styles.titulo}>Busca por Data</Text>
          <View style={styles.mainHeaderLine}></View>
          <Text>  </Text>
          <Picker style={styles.picker} selectedValue={this.state.DataEscolhida} onValueChange={this._alterarData}>
            <Picker.Item label="Escolha a data:" value="0" />
            {this.state.lancamentos.map(e => {
              return (<Picker.Item label={e.dataLancamento} value={e.dataLancamento} />
              )
            })}
          </Picker>
          <Text>  </Text>
          <ScrollView>
            <FlatList style={styles.lancamento}
              data={this.state.listaFiltrada}
              keyExtractor={item => item.idLancamento}
              renderItem={({ item }) => (
                <View>
                  <Image style={styles.img} source={{ uri: item.imagem }} />
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
              
        <View style={styles.backgroundFiltro}> 
          <Text>  </Text>
          <Text style={styles.titulo}>Filtro por tipo</Text>
          <View style={styles.mainHeaderLine}></View>
          <Text>  </Text>
          <Picker style={styles.picker} selectedValue={this.state.tipoEscolhido} onValueChange={(itemValue) => this.setState({ tipoEscolhido: itemValue })}>
            <Picker.Item label="Escolha o tipo:" value="0" selectedValue />
            {this.state.tipos.map(e => {
              return (<Picker.Item label={e.nome} value={e.idTipo} />
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
              onPress={this._filtroTipo}>
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
  backgroundFiltro: { backgroundColor: '#000', },
  text: { fontSize: 20, color: 'white', marginHorizontal: 20 },
  logo: { backgroundColor: 'black' },
  sair: { width: 30, height: 40, tintColor: 'white' },
  backgroundImg: { backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  mainHeaderLine: { width: 170, marginHorizontal: 120, paddingTop: 2, textAlign: 'center', borderBottomColor: '#ad1923', borderBottomWidth: 2.0 },
  titulo: { fontSize: 40, color: '#fff', textAlign: 'center' },
  botao: { backgroundColor: 'red', borderRadius: 25, marginHorizontal: 150 },
  botaoText: { color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' },
  lancamento: { backgroundColor: '#000', marginHorizontal: 20, padding: 10, opacity: 0.7 },
  picker: { color: 'black', fontWeight: 'bold', backgroundColor: 'white', borderRadius: 20, textAlign: 'center', fontSize: 20, marginHorizontal: 20 },
  img: { height: 150, width: 110, opacity: 0.7, marginHorizontal: 20 },
});