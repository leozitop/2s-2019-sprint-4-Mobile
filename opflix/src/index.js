import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './pages/main';
import ProfileScreen from './pages/profile'
import LoginScreen from './pages/login';
import CategoriaScreen from './pages/categoria';
import FiltroScreen from './pages/filtro';

// criar a navegaçao com o login = autenticaçao
const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen },
})

const MainNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Categoria: {
      screen: CategoriaScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Filtro: {
      screen: FiltroScreen,
    }
  },
  {
    // define a rota inicial
    initialRouteName: 'Main',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveBackgroundColor: 'red',
      activeBackgroundColor: '#ad1923',
      //b14040
      style: {
        width: '100%',
        height: 50,
      },
    },
  },
);

export default createAppContainer(createSwitchNavigator(
  {
    // define as telas que vão aparecer
    AuthStack,
    MainNavigator,
  },
  {
    initialRouteName: 'AuthStack',
  }
),
);