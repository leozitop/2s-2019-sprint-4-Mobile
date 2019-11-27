import React, { Component } from 'react';

import { Image, View, StyleSheet } from 'react-native';

export default class SplashPage extends Component {

  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    // var navigator = this.props.navigator;
    setTimeout(() => {
      this.props.navigation.navigate("AuthStack")
    }, 4000);
    //<-- Time until it jumps to "AuthStack" 
  }
  render() {
    return (
      <View style={styles.background}>
        <Image style={{ marginTop: 300, tintColor: 'white', borderColor: 'white' }} source={require('../assets/img/logo.png')}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: { backgroundColor: '#ad1923', alignItems: 'center', justifyContent: 'center', paddingBottom: 550, paddingHorizontal: 20, },
})
