import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './pages/main';
import ProfileScreen from './pages/profile'
import LoginScreen from './pages/login';

// criar a navegaçao com o login = autenticaçao
const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen },
})

const MainNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Profile: {
      screen: ProfileScreen,
    }
  },
  {
    // define a rota inicial
    initialRouteName: 'Profile',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveBackgroundColor: '#b14040',
      activeBackgroundColor: '#C60909',
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
),
);