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
      birthdaySave: '',
      gender: 'female',
      name: null,
      email: null,
      avatar: null,
      phone: null,
      info: 'still alive',
      status: 'online',
      latitude: -6.270565,
      longitude: 106.759550,
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
    else if (this.state.email == null) {
      alert('email cannot null')
    }
    else if (this.state.phone == null) {
      alert('phone cannot null')
    }
    else if (this.state.password == null) {
      alert('password cannot null')
    }
    else if (this.state.birthday == null) {
      alert('birthday cannot null')
    }
    else {
      firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (response) => {
          await AsyncStorage.setItem('userId', response.user.uid)
          User.id = await AsyncStorage.getItem('userId')
          User.avatar = this.state.avatar ? this.state.avatar : 'https://i.pinimg.com/originals/c3/02/68/c3026833776069a6f9f49540595c3eb5.png'
          await AsyncStorage.setItem('userAvatar', User.avatar)
          await AsyncStorage.setItem('userPassword', this.state.password)
          let userf = firebase.auth().currentUser;
          userf.updateProfile({ displayName: this.state.name, photoURL: this.state.avatar ? this.state.avatar : 'https://i.pinimg.com/originals/c3/02/68/c3026833776069a6f9f49540595c3eb5.png' })
          firebase.database().ref('users/' + response.user.uid).set({
            name: this.state.name,
            email: this.state.email,
            avatar: this.state.avatar ? this.state.avatar : 'https://i.pinimg.com/originals/c3/02/68/c3026833776069a6f9f49540595c3eb5.png',
            gender: this.state.gender,
            phone: this.state.phone,
            info: this.state.info,
            status: this.state.status,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            birthday: this.state.birthdaySave,
          })

          User.latitude = this.state.latitude,
            User.longitude = this.state.longitude,
            User.email = this.state.email
          User.name = this.state.name
          User.gender = this.state.gender
          User.phone = this.state.phone
          User.info = this.state.info
          User.status = this.state.status
          User.birthday = this.state.birthdaySave

          alert("User " + this.state.name + " was created successfully. Automatic login.")
          this.props.navigation.navigate('App')
        }, function (error) {
          alert("Create account failed. Error: " + error.message);
        })
    }
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPhone = phone => this.setState({ phone });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextName = name => this.setState({ name });
  onChangeTextAvatar = avatar => this.setState({ avatar });

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
        <Container style={{ flex: 1, }}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <Content style={{ backgroundColor: 'grey' }}>
            <Image
              source={require('../Images/21f8ed58-7416-4ef7-8680-bb5eb6b4aeaf_200x200.png')}
              style={{ alignSelf: 'center', width: 150, height: 150 }}
            />
            <Form style={{ alignItems: 'center' }}>
              <Item rounded style={{
                marginVertical: 10,
                paddingHorizontal: 16,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#b3b3b3'
              }}>
                <Input
                  placeholder="Name"
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
                <Input
                  placeholder="Email"
                  placeholderTextColor='white'
                  onChangeText={this.onChangeTextEmail}
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
                <Input
                  placeholder="Phone Number"
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
                <Label style={{ color: 'white' }}>Gender : </Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon style={{ color: 'white' }} name="md-arrow-dropdown" />}
                  placeholder="Select Gender"
                  placeholderStyle={{ color: "white" }}
                  placeholderIconColor="white"
                  style={{ width: undefined }}
                  selectedValue={this.state.gender}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Female" color='black' value="Female" />
                  <Picker.Item label="Male" color='black' value="Male" />
                </Picker>
              </Item>
              <Item rounded style={{
                marginVertical: 10,
                paddingHorizontal: 16,
                alignSelf: 'center',
                flexDirection: 'row',
                width: '90%',
                backgroundColor: '#b3b3b3'
              }}>
                <Label style={{ color: 'white' }}>Birthday : </Label>
                <DatePicker
                  defaultDate={new Date(1995, 4, 4)}
                  minimumDate={new Date(1945, 1, 1)}
                  maximumDate={new Date(2019, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText='Select Date'
                  placeHolderTextStyle={{ color: "black" }}
                  onDateChange={this.setDate}
                  disabled={false}
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
                  onChangeText={this.onChangeTextPassword}
                  placeholderTextColor='white'
                  secureTextEntry={true}
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
                <Input
                  placeholder="Avatar url"
                  placeholderTextColor='white'
                  style={{
                    fontSize: 16,
                    color: 'white',
                    alignSelf: 'center'
                  }}
                  value={this.state.avatar}
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
                <Text >Signup</Text>
              </Button>
            </Form>
            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>

              <Text style={{ color: 'white' }}>Have an account?</Text>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}> Login</Text>
              </TouchableOpacity>

            </View>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}