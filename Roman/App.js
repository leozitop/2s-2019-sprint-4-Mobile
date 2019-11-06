import React, {Component} from 'react';
import {Text, View, ScrollView, Image, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projetos : [],
    };
  }
  componentDidMount() {
    this._buscarListaProjetos();
  }

  _buscarListaProjetos = async () => {
    await fetch('http://192.168.4.183:5000/api/projetos')
      .then(resposta => resposta.json())
      .then(data => this.setState({projetos: data}))
      .catch(erro => console.warn(erro));
  };
  // _buscarListaUsuarios = async () => {
  //   await fetch('http://192.168.4.183:5000/api/usuarios')
  //   .then(resposta => resposta.json())
  //   .then(data => this.setState({usuarios: data}))
  //   .catch(erro => console.warn(erro));
  // }
render(){

  return (
    
      <View>
        <View style={styles.banner}>

        <Text style={styles.titulo}>Roman ☭</Text>
        </View>

      {/* <FlatList
        data={this.state.temas}
        keyExtractor={item => item.idTema}
        renderItem={({item}) => (
          <View>
            <Text style={styles.tema}>{item.tema}</Text>
          </View>
        )}
        />
        <Text>-----------------------------------------------</Text>
        <FlatList
        data={this.state.usuarios}
        keyExtractor={item => item.idUsuario}
        renderItem={({item}) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.email}</Text>
            <Text>{item.senha}</Text>
            <Text>{item.permissao}</Text>
            
          </View>
        )}
        /> */}
        <ScrollView>

        <FlatList
        style={styles.projetos}
        data={this.state.projetos}
        keyExtractor={item => item.idProjeto}
        renderItem={({item}) => (
          <View>
            <Text>Id: {item.idProjeto}</Text>
            <Text>Projeto: {item.Projeto}</Text>
            <Text>Descrição: {item.descricao}</Text>
            <Text>Tema: {item.idTema}</Text>
            <Text>Usuario: {item.idUsuario}</Text>
            <Text>------------------------------------------------------------------------------------------------------------</Text>


          </View>
        )
      } 
      />
      </ScrollView>
        </View>
    
      

    
    
      
  );
}


}
const styles = StyleSheet.create({
  titulo: {
    fontSize: 50,
  },
  banner: {
    backgroundColor: '#FF96F5'
  },
  projetos: {
    backgroundColor: '#B4FF96'
  }
});
export default App;
