import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './pages/main';
import ProfileScreen from './pages/profile'
import LoginScreen from './pages/login';
import CategoriaScreen from './pages/categoria';
//import FiltroScreen from './pages/filtro';
import FiltrosScreen from './pages/filtros';
import SplashScreen from './pages/splashScreen';

// criar a navegaçao com o login = autenticaçao
const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen },
})

const SplashPage = createStackNavigator({
  SplashPage: { screen: SplashScreen }
})

const MainNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Categoria: {
      screen: CategoriaScreen,
    },
    // Filtro: {
      //   screen: FiltroScreen,
      // },
      FiltrosScreen: {
        screen: FiltrosScreen,
      },
      Profile: {
        screen: ProfileScreen,
      },
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
    SplashPage,
    AuthStack,
    MainNavigator,
  },
  {
    initialRouteName: 'SplashPage',
  }
),
);
