import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Chat from '../Screens/Chat';
import AuthLoading from '../Screens/AuthLoading';
import Profil from '../Screens/Profil';
import ProfilUser from '../Screens/ProfilUser';
import Home from '../Screens/Home';
import SplashScreen from '../Screens/SplashScreen';
import ComponentDrawer from './ComponentDrawer';

const CustomDrawer = () => (
  <ComponentDrawer />
)

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Profil: {
    screen: Profil,
  },
  ProfilUser: {
    screen: ProfilUser,
  },
  Chat: {
    screen: Chat,
  },
});

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppStackNavigator,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
},
  { contentComponent: CustomDrawer }
)

const AuthStack = createStackNavigator({
  Login: {
    screen: Login
  },
});
const RegisterStack = createStackNavigator({
  Register: {
    screen: Register
  },
});

export default createAppContainer(createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    AuthLoading: AuthLoading,
    App: AppDrawerNavigator,
    Register: RegisterStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'SplashScreen',
  }
));