import React, { useState, Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import TempScreen from './screens/tempScreen';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { AppLoading, Notifications } from 'expo';

import * as firebase from 'firebase';
import NAVIGATOR from './navigation/navigator';
import { YellowBox } from 'react-native';
import _ from 'lodash';
require("firebase/firestore");

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCNi4HBjKxbE93PcUOQfd62d_IulUGx2j4",
//   authDomain: "railgo-23771.firebaseapp.com",
//   databaseURL: "https://railgo-23771.firebaseio.com",
//   projectId: "railgo-23771",
//   storageBucket: "railgo-23771.appspot.com",
//   messagingSenderId: "1085946388528",
//   appId: "1:1085946388528:web:3571ed1f2f5c7a32404df5",
//   measurementId: "G-L8412N9EST"
// };

//techproject firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA1VmnUpFiCg17kD3EvxVoEUmvepMajGM",
  authDomain: "techproj-6cef0.firebaseapp.com",
  databaseURL: "https://techproj-6cef0.firebaseio.com",
  projectId: "techproj-6cef0",
  storageBucket: "techproj-6cef0.appspot.com",
  messagingSenderId: "587235964811",
  appId: "1:587235964811:web:efb2ee24ff97ed7595618e"
};

firebase.initializeApp(firebaseConfig);







// //google fonts
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
//     'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
//     'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
//   });
// };



export default class App extends Component {
  state={
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

  componentDidMount(){
    console.log("component did mount outer");
    let newuser = {
      email:"keane123@gmail.com",
      password:"keane123"
    }
    //this.createuser(newuser)
    this.notificationmodule(newuser);
  }

  notificationmodule = async(newuser)=>{
    await firebase.auth().signInWithEmailAndPassword(newuser.email, newuser.password).then(user=>{
      console.log("noti");
      //console.log(user);
      this.registerForPushNotificationsAsync(user)

    })
  }

  //create user
  createuser = async(newuser) => {   
    try {
      await firebase.auth().createUserWithEmailAndPassword(newuser.email, newuser.password)
      let userid = firebase.auth().currentUser.uid
      let db = firebase.firestore().collection("users").doc(userid)
      db.set({
          email: newuser.email,
          password: newuser.password,
      });
      console.log("data Saved")
      this.notificationmodule(newuser); 
  }
  catch(error){
      alert("Error: ",error);
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
    console.log('token',token);
    // POST the token to our backend so we can use it to send pushes from there
    let userid = firebase.auth().currentUser.uid
    var updates = {}
    updates['/expoToken'] = token
    await firebase.database().ref('/users/' + userid).update(updates)
    //call the push notification 
}

 //const [dataLoaded, setDataLoaded] = useState(false);
 render(){
    if (!this.state.dataLoaded) {
      return (
        <AppLoading
          startAsync={this.fetchFonts}
          onFinish={() => this.setState({dataLoaded:true})}
          onError={(err) => console.log(err)}
        />
      );
    }
    console.log("render")
    return (
      // <MapPage />
      // <StartPage />
      //  <Bookmark />
      // <NAVIGATOR />
      <TempScreen />
    );
  }
}