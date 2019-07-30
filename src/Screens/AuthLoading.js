import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import User from './User'
import firebase from 'firebase'

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount() {
    if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyBMF2Fm_s9yNDoGnb6f0qwe8xiiVh0vfZ0",
      authDomain: "black-sugar.firebaseapp.com",
      databaseURL: "https://black-sugar.firebaseio.com",
      projectId: "black-sugar",
      storageBucket: "black-sugar.appspot.com",
      messagingSenderId: "879779790931",
      appId: "1:879779790931:web:9d6ba30df3570836"
    });
  }
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        this._bootstrapAsync();
      }),
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }

  _bootstrapAsync = async () => {
    User.id = await AsyncStorage.getItem('userId');
    User.avatar = await AsyncStorage.getItem('userAvatar');
    this.props.navigation.navigate(User.id ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}