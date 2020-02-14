import React, { useState, state, Component, useEffect, useRef } from 'react';
import { StyleSheet, Text, Button, View, Dimensions, FlatList, ScrollView, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Panel from 'react-native-panel';
import { Ionicons } from '@expo/vector-icons';
import GatePanel from '../components/GatePanel'
import SearchBar from '../components/SearchBar'
import firebase from 'firebase'
import Hoc from '../components/Hoc'

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




  const markerClick = (e) => {
    let seleced = markers.find((item) => {
      if (item.lat === e.nativeEvent.coordinate.latitude) {
        return true;
      }
    });
    setSelected(seleced);
  }


  if (isLoaded) {
    return (

      <React.Fragment>
        
          <SearchBar />
          <Hoc>
          <View style={styles.mapcontainer}>
            <MapView style={styles.mapStyle}
              initialRegion={{
                latitude: 15.3243,
                longitude: 73.9135,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >

              {markers.map((item) => {
                return (
                  <Marker
                    key={Math.random().toString()}
                    coordinate={{
                      latitude: item.lat,
                      longitude: item.lon,
                    }}
                    title={item.title}
                    description=''
                    image={require('../assets/train.png')}
                    onPress={markerClick}

                  />
                );
              })}
            </MapView>
          </View>
        </Hoc>

        <GatePanel selected={selected} />
      </React.Fragment>
    );
  }
  else {
    return null;
  }
}

export default MapPage;

const styles = StyleSheet.create({

  mapcontainer: {
    top: 82,
  },
  mapStyle: {

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

});
