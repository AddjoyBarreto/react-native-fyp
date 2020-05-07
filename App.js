import React, { useState, Component } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import TempScreen from './screens/tempScreen';
import StartPage from './screens/StartPage';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { AppLoading, Notifications } from 'expo';

import NAVIGATOR from './navigation/navigator';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import firebase from './firebase'

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};




// //google fonts
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
//     'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
//     'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
//   });
// };



export default class App extends Component {
  state = {
    dataLoaded: false,
  }

  //google fonts
  fetchFonts = () => {
    return Font.loadAsync({
      'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
      'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    });
  };

  notificationmodule = async (newuser) => {
    await firebase.auth().signInWithEmailAndPassword(newuser.email, newuser.password).then(user => {
      console.log("noti");
      //console.log(user);
      this.registerForPushNotificationsAsync(user)

    })
  }

  //create user
  createuser = async (newuser) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(newuser.email, newuser.password)
      let userid = firebase.auth().currentUser.uid

      let db = firebase.firestore().collection("users").doc(userid)
      db.set({
        email: newuser.email,
        password: newuser.password,
      });


      firebase.database().ref('users').child(userid).set({
        email: newuser.email,
        password: newuser.password
      })

      console.log("data Saved")
      this.notificationmodule(newuser);
    }
    catch (error) {
      Alert.alert("Error: ", error.message);
    }
  }

  registerForPushNotificationsAsync = async (user) => {
    const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    console.log('generating token')
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log('token', token);
    // POST the token to our backend so we can use it to send pushes from there
    let userid = firebase.auth().currentUser.uid
    console.log('userid', userid);
    var updates = {}
    updates['/expoToken'] = token
    //real time db
    await firebase.database().ref('users/' + userid).update({ expoToken: token })
    //call the push notification 
    var db = firebase.firestore();

    //firestore
    db.collection("users").doc(userid).update({
      expoToken: token,
    }).then(function () {
      console.log("Document successfully written!");
    }).catch(function (error) {
      console.error("Error writing document: ", error);
    });

    console.log('token saved')
  }

  // componentDidMount() {
  //   console.log("component did mount outer");
  //   let newuser = {
  //     email: "luke123@gmail.com",
  //     password: "luke123"
  //   }
  //   this.createuser(newuser)
  //   //this.notificationmodule(newuser);
  // }


  //const [dataLoaded, setDataLoaded] = useState(false);
  render() {
    if (!this.state.dataLoaded) {
      return (
        <AppLoading
          startAsync={this.fetchFonts}
          onFinish={() => this.setState({ dataLoaded: true })}
          onError={(err) => console.log(err)}
        />
      );
    }
    console.log("render")
    return (
      // <MapPage />
      <StartPage />
      //  <Bookmark />
      // <NAVIGATOR />
      // <TempScreen />
    );
  }
}