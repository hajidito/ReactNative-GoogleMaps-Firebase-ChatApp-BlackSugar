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
      apiKey: '<your-api-key>',
      authDomain: '<your-auth-domain>',
      databaseURL: 'https://<your-db-url>.firebaseio.com',
      projectId: '<your-project-id>',
      storageBucket: '<your-storage-bucket>.appspot.com',
      messagingSenderId: '<your-sender-id>',
      appId: '<your-appfirebase-id>'
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
