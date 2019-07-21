import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  StatusBar,
} from 'react-native';
import User from './User'
import firebase from 'firebase'
import { Icon } from 'native-base'
import MapStyle from './MapStyle'
import MapView, { Callout } from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.updateStatus()
    this.state = {
      users: [],
      avatar: '',
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      latitude: -6.270565,
      longitude: 106.759550,
      error: null,
      concat: null,
      coords: [],
      x: 'false',
      cordLatitude: -6.23,
      cordLongitude: 106.75,

    };

    this.mergeLot = this.mergeLot.bind(this);

  }

  updateStatus = async () => {
    await firebase.database().ref('users/' + User.id)
      .onDisconnect().update({
        status: 'offline'
      })
  }

  _refreshGPS() {
    this.setState({ users: null })
    this.setState({
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      latitude: -6.270565,
      longitude: 106.759550,
    })
    firebase.database().ref('users/').on('child_added', (value) => {
      let person = value.val()
      person.userId = value.key
      if (person.userId === User.id) {
        User.name = person.name
        User.email = person.email
        User.birthday = person.birthday
        User.avatar = person.avatar
        User.gender = person.gender
        User.phone = person.phone
        User.info = person.info
        User.status = person.status
        this.setState({ avatar: person.avatar })
      } else {
        this.setState((prevState) => {
          return {
            users: [...prevState.users, person]
          }
        })
      }
    })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let updates = {};
        updates["users/" + User.id + '/latitude'] = position.coords.latitude;
        updates["users/" + User.id + '/longitude'] = position.coords.longitude;
        firebase.database().ref().update(updates);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.mergeLot();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
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

  componentWillMount = async () => {

    await firebase.database().ref('users/' + User.id)
      .update({
        status: 'online'
      })

    this.props.navigation.setParams({ refreshGPS: this._refreshGPS })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let updates = {};
        updates["users/" + User.id + '/latitude'] = position.coords.latitude;
        updates["users/" + User.id + '/longitude'] = position.coords.longitude;
        firebase.database().ref().update(updates);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.mergeLot();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );

    await firebase.database().ref('users/').on('child_added', (value) => {
      let person = value.val()
      person.userId = value.key
      if (person.userId === User.id) {
        User.name = person.name
        User.email = person.email
        User.birthday = person.birthday
        User.avatar = person.avatar
        User.gender = person.gender
        User.phone = person.phone
        User.info = person.info
        User.status = person.status
        this.setState({ avatar: person.avatar })
      } else {
        this.setState((prevState) => {
          return {
            users: [...prevState.users, person]
          }
        })
      }
    })
    
    await firebase.database().ref('users/').on('child_changed', (value) => {
      let person = value.val()
      person.userId = value.key
      if (person.userId !== User.id) {
        this.setState((prevState) => {
          return {
            users: prevState.users.map(user => {
              if (user.userId === person.userId) {
                user = person
              }
              return user
            })
          }
        })
      }
    })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Black Sugar',
      headerTitleStyle: {
        width: '90%',
        textAlign: 'center',
        color: 'white'
      },
      headerStyle: {
        elevation: null,
        backgroundColor: 'black'
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image style={{backgroundColor:'white', borderWidth: 2, borderColor: 'white', borderRadius: 15, height: 32, width: 32, marginLeft: 7 }}
            source={{ uri: User.avatar }} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.getParam('refreshGPS')}>
          <Icon ion-icon name="ios-pin" style={{ color: 'white', marginRight: 10 }} />
        </TouchableOpacity>
      )
    }
  }

  trackingFriend(lat, lon) {
    this.setState({
      region: {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    })
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <MapView style={styles.map}
          customMapStyle={MapStyle}
          region={this.state.region}
          initialRegion={this.state.region}
        >

          {!!this.state.latitude && !!this.state.longitude &&
            <MapView.Marker
              coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
              description={User.email}
            >
              <Image style={{ alignSelf: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 15, height: 35, width: 35 }}
                source={{ uri: User.avatar }} />
              <View style={{ width: 200 }}>
                <Callout tooltip={true} >
                  <Text style={{ padding: 5, borderRadius: 20, borderWidth: 1, borderColor: 'white', textAlign: 'center', backgroundColor: 'grey', fontSize: 12, fontWeight: 'bold', color: 'white' }}>You</Text>
                </Callout>
              </View>

            </MapView.Marker>}

          {this.state.users.map((item, i) =>
            <MapView.Marker key={i}
              coordinate={{ "latitude": item.latitude, "longitude": item.longitude }}
            >
              <Image resizeMode="cover"
                style={{ alignSelf: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 15, height: 35, width: 35 }}
                source={{ uri: item.avatar }} />
              <View style={{ width: 200 }}>
                <Callout tooltip={false} onPress={() => this.props.navigation.navigate('Profil', item)} >
                  <Text style={{ padding: 5, borderRadius: 20, borderWidth: 1, borderColor: 'white', textAlign: 'center', backgroundColor: 'grey', fontSize: 12, fontWeight: 'bold', color: 'white' }}>{item.name}</Text>
                  <Text style={{ textAlign: 'center', color: 'grey', fontWeight: 'bold' }}>tap for detail and chat</Text>
                </Callout>
              </View>
            </MapView.Marker>
          )}

        </MapView>
        <ScrollView style={{ position: 'absolute', bottom: 0 }} horizontal={true}>
          {this.state.users.map((item, i) =>
            <TouchableOpacity key={i}
              onPress={() => this.trackingFriend(item.latitude, item.longitude)}
              style={{ width: 150, marginHorizontal: -20, height: 150, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}
            >
              <Image style={{ width: 80, height: 80, borderRadius: 40, borderColor: 'white', borderWidth: 2 }} source={{ uri: item.avatar }} />
              <Text style={{ textAlign: 'center', padding: 1, backgroundColor: 'grey', borderColor: 'white', borderWidth: 1, borderRadius: 3, color: 'white', fontSize: 12, fontWeight: 'bold' }} numberOfLines={2}>{item.name}</Text>
              <Text style={{ textAlign: 'center', padding: 1, backgroundColor: item.status == 'offline' ? 'black' : 'green', borderColor: 'white', borderWidth: 1, borderRadius: 3, color: 'white', fontSize: 12, fontWeight: 'bold' }} numberOfLines={2}>{item.status}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});