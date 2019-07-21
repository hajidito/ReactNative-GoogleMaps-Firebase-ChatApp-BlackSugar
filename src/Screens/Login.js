import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Modal,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import firebase from 'firebase'
import Spinner from "react-native-loading-spinner-overlay";
import User from './User'
import MapView from 'react-native-maps';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      latitude: -6.270565,
      longitude: 106.759550,
    };
  }

  mergeLot() {
    if (this.state.latitude != null && this.state.longitude != null) {
      let concatLot = this.state.latitude + "," + this.state.longitude
      this.setState({
        concat: concatLot
      }, () => {
        this.getDirections(concatLot, "-6.270565,106.759550");
      });
    }

  }

  async getDirections(startLoc, destinationLoc) {

    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
      this.setState({ x: "true" })
      return coords
    } catch (error) {
      this.setState({ x: "error" })
      return error
    }
  }

  onPressLogin = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.mergeLot();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );

    await firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((async (response) => {
        let userf = firebase.auth().currentUser;
        await AsyncStorage.setItem('userAvatar', userf.photoURL);
        await AsyncStorage.setItem('userId', userf.uid)
        await AsyncStorage.setItem('userPassword', this.state.password)
        User.id = await AsyncStorage.getItem('userId');
        User.avatar = await AsyncStorage.getItem('userAvatar');
        User.latitude = this.state.latitude
        User.longitude = this.state.longitude
        await firebase.database().ref('users/' + userf.uid)
          .update({
            status: 'online'
          })
        let updates = {};
        updates["users/" + userf.uid + '/latitude'] = User.latitude;
        updates["users/" + userf.uid + '/longitude'] = User.longitude;
        firebase.database().ref().update(updates);

        alert('login successful, welcome to black sugar.');
        this.props.navigation.navigate('App');
      }),
        function (error) {
          alert('Login failure. Please tried again. Error: ' + error.message)
        })
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Welcome',
    header: null,
    headerTitleStyle: {
      width: '95%',
      textAlign: 'center',
      color: 'white'
    },
    headerStyle: {
      elevation: null,
      backgroundColor: 'black'
    },
  })

  render() {
    return (
      <ScrollView>
        <Container style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <Content style={{ backgroundColor: 'grey' }}>
            <Image
              source={require('../Images/00f0380e-a223-49e8-bf23-d2f42cf4fbeb_200x200.png')}
              style={{ alignSelf: 'center', marginTop: '5%' }}
            />
            <Form style={{ alignItems: 'center' }}>
              <KeyboardAvoidingView style={{
                margin: 20,
                padding: 20,
                alignSelf: "stretch"
              }}>
                <Item rounded style={{
                  marginVertical: 10,
                  paddingHorizontal: 16,
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: '#b3b3b3'
                }}>
                  <Input
                    placeholder="Email"
                    placeholderTextColor='white'
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'white',
                      alignSelf: 'center'
                    }}
                    value={this.state.email}
                    onChangeText={this.onChangeTextEmail}
                  />
                </Item>
                <Item rounded style={{
                  marginVertical: 10,
                  paddingHorizontal: 16,
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: '#b3b3b3'
                }}>
                  <Input
                    placeholder="Password"
                    placeholderTextColor='white'
                    secureTextEntry={true}
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'white',
                      alignSelf: 'center'
                    }}
                    onChangeText={this.onChangeTextPassword}
                  />
                </Item>
                <Button
                  onPress={this.onPressLogin}
                  style={{
                    justifyContent: 'center', alignSelf: 'center', width: '70%',
                    marginVertical: 10,
                    paddingHorizontal: 16,
                  }}
                  rounded dark>
                  <Text >Login</Text>
                </Button>
              </KeyboardAvoidingView>
            </Form>
            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>

              <Text style={{ color: 'white' }}>Dont have an account yet?</Text>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}> Signup</Text>
              </TouchableOpacity>
            </View>
          </Content>
          <Spinner visible={this.state.loading} />
        </Container>
      </ScrollView>
    );
  }
}