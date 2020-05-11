import React, { useState, Component } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import TempScreen from './screens/tempScreen';
import StartPage from './screens/StartPage';
import Mappage from './screens/mappage';
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
const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
};



const App = () => {
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
      // <Mappage />
      // <StartPage />
      //  <Bookmark />
      <NAVIGATOR />
      // <TempScreen />
    );
  }

  export default App;