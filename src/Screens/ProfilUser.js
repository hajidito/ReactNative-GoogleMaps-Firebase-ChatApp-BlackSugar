import React, { Component } from 'react';
import { Dimensions, Alert, StatusBar, AsyncStorage, StyleSheet, Modal, TouchableHighlight, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { Container, Icon, Picker, DatePicker, Header, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import firebase from 'firebase'
import User from './User'
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-navigation';
const { height } = Dimensions.get('window');

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      screenHeight: height,
      birthday: null,
      birthdaySave: User.birthday,
      gender: User.gender,
      name: User.name,
      email: User.email,
      avatar: User.avatar,
      phone: User.phone,
      info: User.info,
      status: User.status,
      latitude: User.latitude,
      longitude: User.longitude,
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ birthdaySave: newDate.toString().substr(4, 12) });
    this.setState({ birthday: newDate })
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
      console.log('masuk fungsi')
      this.setState({ x: "error" })
      return error
    }
  }

  onPressCreate = async () => {
    const password = await AsyncStorage.getItem('userPassword')
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

    if (this.state.name == null) {
      alert('name cannot null')
    }
    if (this.state.phone == null) {
      alert('phone cannot null')
    }
    if (this.state.avatar == null) {
      alert('avatar cannot null')
    }
    else {
      firebase.auth()
        .signInWithEmailAndPassword(this.state.email, password)
        .then(async (response) => {
          await AsyncStorage.setItem('userId', response.user.uid)
          User.id = await AsyncStorage.getItem('userId')
          User.avatar = this.state.avatar
          await AsyncStorage.setItem('userAvatar', User.avatar)
          let userf = firebase.auth().currentUser;
          userf.updateProfile({ displayName: this.state.name, photoURL: this.state.avatar })
          firebase.database().ref('users/' + response.user.uid).update({
            name: this.state.name,
            avatar: this.state.avatar,
            phone: this.state.phone,
            info: this.state.info,
          })

          User.latitude = this.state.latitude,
            User.longitude = this.state.longitude,
            User.name = this.state.name
          User.phone = this.state.phone
          User.info = this.state.info

          alert("User " + this.state.name + " was updated successfully.")
          this.props.navigation.navigate('Home')
        }, function (error) {
          alert("Update user failed. Error: " + error.message);
        })
    }
  };

  onChangeTextPhone = phone => this.setState({ phone });
  onChangeTextName = name => this.setState({ name });
  onChangeTextAvatar = avatar => this.setState({ avatar });
  onChangeTextInfo = info => this.setState({ info });

  onValueChange(value) {
    this.setState({
      gender: value
    });
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Registration',
    headerTintColor: 'white',
    header: null,
    headerTitleStyle: {
      width: '85%',
      textAlign: 'center',
      color: 'white'
    },
    headerStyle: {
      backgroundColor: 'black'
    },
  })
  onContentSizeChange = (contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  render() {
    let scrollEnabled = this.state.screenHeight > (height);
    return (
      <ScrollView
        style={{ flex: 1, width: '100%' }}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
      >
        <Container style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <Content style={{ backgroundColor: 'grey' }}>
            <Image
              source={{ uri: User.avatar }}
              style={{ alignSelf: 'center', marginTop: '5%', width: 150, height: 150, borderRadius: 75 }}
            />
            <Form style={{ alignItems: 'center' }}>
              <Item rounded style={{
                marginVertical: 10,
                paddingHorizontal: 16,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#b3b3b3'
              }}>
                <Label>Name: </Label>
                <Input
                  placeholder={User.name}
                  onChangeText={this.onChangeTextName}
                  placeholderTextColor='white'
                  style={{
                    fontSize: 16,
                    color: 'white',
                    alignSelf: 'center'
                  }} />
              </Item>
              <Item rounded style={{
                marginVertical: 10,
                paddingHorizontal: 16,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#b3b3b3'
              }}>
                <Label>Update Status: </Label>
                <Input
                  placeholder={User.info}
                  onChangeText={this.onChangeTextInfo}
                  placeholderTextColor='white'
                  style={{
                    fontSize: 16,
                    color: 'white',
                    alignSelf: 'center'
                  }} />
              </Item>
              <Item rounded style={{
                marginVertical: 10,
                paddingHorizontal: 16,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#b3b3b3'
              }}>
                <Label>Phone: </Label>
                <Input
                  placeholder={User.phone}
                  placeholderTextColor='white'
                  onChangeText={this.onChangeTextPhone}
                  keyboardType={'numeric'}
                  style={{
                    fontSize: 16,
                    color: 'white',
                    alignSelf: 'center'
                  }} />
              </Item>

              <Item rounded style={{
                marginVertical: 10,
                paddingHorizontal: 16,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#b3b3b3'
              }}>
                <Label>Avatar Url</Label>
                <Input
                  placeholder={User.avatar}
                  placeholderTextColor='white'
                  style={{
                    fontSize: 16,
                    color: 'white',
                    alignSelf: 'center'
                  }}
                  onChangeText={this.onChangeTextAvatar}
                />
              </Item>
              <Button
                onPress={this.onPressCreate}
                style={{
                  justifyContent: 'center', alignSelf: 'center', width: '70%',
                  marginVertical: 10,
                  paddingHorizontal: 16,
                }}
                rounded dark>
                <Text >Change Data</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}