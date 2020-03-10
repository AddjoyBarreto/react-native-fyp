import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, StatusBar, Modal, Alert, Text, TouchableHighlight } from 'react-native';


import { Ionicons } from '@expo/vector-icons';
import GatePanel from '../components/GatePanel'
import SearchBar from '../components/SearchBar'
import firebase from 'firebase'
import GateMap from '../components/GateMap'


const { width, height } = Dimensions.get('window');



const MapPage = (props) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(undefined);
  scrollViewRef = useRef();

  useEffect((() => {
    firebase.database().ref('/stations').once('value').then((resp) => {
      const markers = [];

      Object.values(resp.val()).forEach(((element) => {
        markers.push({ title: element.name, lat: element.lat, lon: element.lon, status: element.status });
      }))
      setMarkers(markers);
      setIsLoaded(true);

    }).catch((err) => {
      console.log(err);
    });
  }), []);


  const markerClick = React.useCallback((e) => {
    setSelected(markers.find((item) => {
      if (item.lat === e.nativeEvent.coordinate.latitude) {
        return true;
      }
    }));
  });

  const itemSelect = (e) => {
    setSelected(markers.find((item) => {
      if (item.lat === e.lat) {
        return true;
      }
    }));
  }

  const mapClick = () => {
    setSelected(undefined);
  }


  if (isLoaded) {
    return (

      <View style={{ backgroundColor: '#F4E0C9' }}>
        <SearchBar markers={markers} itemSelect={itemSelect} />
        <GateMap markerClick={markerClick}
          markers={markers}
          selected={selected}
          mapClick={mapClick} />
        <GatePanel selected={selected} />
      </View>
    );
  }
  else {
    return null;
  }
}

export default MapPage;


