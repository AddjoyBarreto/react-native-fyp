import React, { useState, state, Component, useEffect, useRef } from 'react';
import { StyleSheet, Text, Button, View, Dimensions, FlatList, ScrollView, LayoutAnimation, Platform, UIManager, TouchableOpacity, Keyboard } from 'react-native';


import { Ionicons } from '@expo/vector-icons';
import GatePanel from '../components/GatePanel'
import SearchBar from '../components/SearchBar'
import firebase from 'firebase'
import GateMap from '../components/GateMap'


const { width, height } = Dimensions.get('window');



const MapPage = (props) => {

  const [isShowingText, setIsShowingText] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(undefined);
  scrollViewRef = useRef();



  useEffect((() => {
    firebase.database().ref('/stations').once('value').then((resp) => {
      const markers = [];
      Object.keys(resp.val()).forEach(key => {
        markers.push({ ...resp.val()[key], title: key });
      });

      console.log(markers);
      setMarkers(markers);
      setIsLoaded(true);

    }).catch((err) => {
      console.log(err);
    });
  }), []);


  // this.listern = firebase.database().ref('/time').on('value', (snapshot) => {
  //   console.log("change" + snapshot.val());
  // });




  const markerClick = React.useCallback((e) => {
    setSelected(markers.find((item) => {
      if (item.lat === e.nativeEvent.coordinate.latitude) {
        return true;
      }
    }));
  });


  if (isLoaded) {
    return (

      <View style={{backgroundColor:'#F4E0C9'}}>
        <SearchBar />
        <GateMap markerClick={markerClick} markers={markers} selected={selected}/>
        <GatePanel selected={selected} />
      </View>
    );
  }
  else {
    return null;
  }
}

export default MapPage;


