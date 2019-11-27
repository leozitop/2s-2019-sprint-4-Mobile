import React, { Component } from 'react';

import { Image, View, StyleSheet } from 'react-native';

export default class SplashPage extends Component {

  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'AuthStack',
        //<-- This is the View you go to
      });
    }, 20);
    //<-- Time until it jumps to "AuthStack" 
  }
  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.img} source={require('../assets/img/logo.png')}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' },
  img: { textAlign: 'center' }
})
