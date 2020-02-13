import React, {Component} from 'react';
import { StyleSheet, Text, Button ,View, Dimensions, ScrollView, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import Panel from 'react-native-panel';
import MapPage from './screens/mappage';

const { width, height } = Dimensions.get('window'); 


export default function App() {
  return (
    <MapPage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
