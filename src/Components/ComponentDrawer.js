import React, { Component } from 'react';
import { AsyncStorage, Modal, Alert, Image, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Text, Item, View, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase'
import { withNavigation } from 'react-navigation';
import User from '../Screens/User'

class ComponentDrawer extends Component {
    _logOut = async () => {
        Alert.alert(
            ' Options ',
            'Do you want to Log Out From Black Sugar ?',
            [
                {
                    text: 'Yes', onPress: async() => {
                        await firebase.database().ref('users/' + User.id).update({
                            status: 'offline'
                        })
                        await AsyncStorage.clear();
                        User.email = null
                        User.name = null
                        User.avatar = null
                        User.gender = null
                        User.birthday = null
                        User.id = null
                        this.props.navigation.navigate('Auth');
                    }
                },
                { text: 'No', onPress: () => console.log('NO Pressed') }
            ],
            { cancelable: false },
        );

        return true;
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'grey' }}>
                <View style={styles.profilTemplate}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilUser')}>
                        <Image source={{ uri: User.avatar }} style={styles.profilImage} />
                        <Text style={styles.profilName}>Profile</Text>
                        <Text style={{ fontSize: 10, alignSelf: 'center' }}>tap to edit...</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    <ScrollView >
                        <ListItem style={{ flex: 1 }}>
                            <Icon name='ios-person' style={{ color: 'white', flex: 1 }} />
                            <Text style={styles.textIcon}>{User.name}</Text>
                        </ListItem>
                        <ListItem style={{ flex: 1 }}>
                            <Icon name='ios-information-circle' style={{ color: 'white', flex: 1 }} />
                            <Text style={styles.textIcon}>{User.info}</Text>
                        </ListItem>
                        <ListItem>
                            <Icon name='ios-mail' style={{ color: 'white', flex: 1 }} />
                            <Text style={styles.textIcon}>{User.email}</Text>
                        </ListItem>
                        <ListItem>
                            <Icon name='ios-phone-portrait' style={{ color: 'white', flex: 1 }} />
                            <Text style={styles.textIcon}>{User.phone}</Text>
                        </ListItem>
                        <ListItem>
                            <Icon name='md-transgender' style={{ color: 'white', flex: 1 }} />
                            <Text style={styles.textIcon}>{User.gender}</Text>
                        </ListItem>
                        <ListItem>
                            <Icon name='ios-egg' style={{ color: 'white', flex: 1 }} />
                            <Text style={styles.textIcon}>{User.birthday}</Text>
                        </ListItem>
                        <TouchableOpacity onPress={this._logOut}>
                            <ListItem >
                                <Icon name='ios-log-out' style={{ color: 'white', flex: 1 }} />
                                <Text style={styles.textIcon}>Log Out</Text>
                            </ListItem>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

            </SafeAreaView>
        );
    }
}

export default withNavigation(ComponentDrawer)

const styles = StyleSheet.create({
    textIcon: {
        flex: 7,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 32,
        fontSize: 15
    },
    profilTemplate: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%'
    },
    profilImage: {
        height: 120,
        width: 121,
        borderRadius: 54,
        alignSelf: 'center',
    },
    profilName: {
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        paddingTop: '5%',
        fontSize: 25
    }
})