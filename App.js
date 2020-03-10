import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapPage from './screens/mappage';
import StartPage from './screens/StartPage';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import firebase from 'firebase';
import PhoneAuthTest from './components/PhoneAuthTest';
import NAVIGATOR from './navigation/navigator';


//Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNi4HBjKxbE93PcUOQfd62d_IulUGx2j4",
  authDomain: "railgo-23771.firebaseapp.com",
  databaseURL: "https://railgo-23771.firebaseio.com",
  projectId: "railgo-23771",
  storageBucket: "railgo-23771.appspot.com",
  messagingSenderId: "1085946388528",
  appId: "1:1085946388528:web:3571ed1f2f5c7a32404df5",
  measurementId: "G-L8412N9EST"
};

//techproject firebase
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAA1VmnUpFiCg17kD3EvxVoEUmvepMajGM",
//   authDomain: "techproj-6cef0.firebaseapp.com",
//   databaseURL: "https://techproj-6cef0.firebaseio.com",
//   projectId: "techproj-6cef0",
//   storageBucket: "techproj-6cef0.appspot.com",
//   messagingSenderId: "587235964811",
//   appId: "1:587235964811:web:efb2ee24ff97ed7595618e"
// };

firebase.initializeApp(firebaseConfig);







//google fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
};



export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    // <MapPage />
    // <StartPage />
    // <PhoneAuthTest />
    <NAVIGATOR />
  );
}
