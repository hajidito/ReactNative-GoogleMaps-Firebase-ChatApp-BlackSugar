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
    Text,
    View,
    KeyboardAvoidingView,
    AsyncStorage,
    StatusBar,
    FlatList,
    Dimensions,
    SafeAreaView
} from 'react-native';
import { Content, Item, Icon } from 'native-base';
import User from './User'
import firebase from 'firebase'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.navigation.getParam("name"),
            email: props.navigation.getParam("email"),
            gender: props.navigation.getParam("gender"),
            birthday: props.navigation.getParam("birthday"),
            avatar: props.navigation.getParam("avatar"),
            userId: props.navigation.getParam("userId"),
            status: props.navigation.getParam("status"),
            info: props.navigation.getParam("info"),
            phone: props.navigation.getParam("phone"),
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Profile',
            headerTintColor: "white",
            headerTitleStyle: {
                width: '80%',
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                elevation: null,
                backgroundColor: 'black'
            },
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', borderColor: 'white', borderWidth: 2 }}>
                    <View style={{ flex: 3 }}>
                        <Image
                            style={{ height: '100%', width: '100%' }}
                            source={require('../Images/philadelphia-skyline-silhouette-000000-lg.png')} />
                    </View>
                    <View style={{ flex: 2, paddingBottom: 50, backgroundColor: 'black', borderColor: 'white', borderWidth: 1 }}></View>
                    <View style={{ flexDirection: 'column', alignSelf: 'center', flex: 1, position: 'absolute' }}>
                        <Image style={{ height: 100, width: 100, borderRadius: 50, borderColor: 'white', borderWidth: 2 }}
                            source={{ uri: this.state.avatar }} />

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Chat',
                                {
                                    name: this.state.name,
                                    email: this.state.email,
                                    gender: this.state.gender,
                                    birthday: this.state.birthday,
                                    avatar: this.state.avatar,
                                    userId: this.state.userId,
                                    status: this.state.status,
                                    info: this.state.info,
                                    phone: this.state.phone
                                }
                            )} >
                            <Icon ion-icon name="ios-send" style={{ color: 'white', alignSelf: 'center', bottom: 0, fontSize: 50 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <Content style={{ backgroundColor: 'grey' }}>
                        <Item rounded style={{
                            borderColor: 'grey',
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '90%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: 'white',
                                fontWeight: "bold"
                            }}>{this.state.status}</Text>
                        </Item>
                        <Item rounded style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '90%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#b3b3b3'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: 'black',
                                fontWeight: "bold"
                            }}>{this.state.info}</Text>
                        </Item>
                        <Item rounded style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '90%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#b3b3b3'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: 'black',
                                fontWeight: "bold"
                            }}>{this.state.name}</Text>
                        </Item>
                        <Item rounded style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '90%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#b3b3b3'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: 'black',
                                fontWeight: "bold"
                            }}>{this.state.email}</Text>
                        </Item>
                        <Item rounded style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '90%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#b3b3b3'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: 'black',
                                fontWeight: "bold"
                            }}>{this.state.phone}</Text>
                        </Item>
                        <Item rounded style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '90%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#b3b3b3'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: 'black',
                                fontWeight: "bold"
                            }}>{this.state.gender}</Text>
                        </Item>
                        <Item rounded style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '90%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#b3b3b3'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: 'black',
                                fontWeight: "bold"
                            }}>{this.state.birthday}</Text>
                        </Item>
                    </Content>
                </ScrollView>
            </View>
        );
    }
}