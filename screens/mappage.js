import React, { useState, state, Component, useEffect } from 'react';
import { StyleSheet, Text, Button, View, Dimensions, FlatList, ScrollView, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Panel from 'react-native-panel';
import { Ionicons } from '@expo/vector-icons';
import GatePanel from '../components/GatePanel'
import SearchBar from '../components/SearchBar'
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

class MapPage extends Component {

  state = {
    isShowingText: true,
    isLoaded: false,
    markers: []
  };
  //const [outputText, setOutpotText] = useState(false)
  //toggleDisplayBio = ()=> setOutpotText(!outputText);
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();

  }

  componentDidMount() {

    firebase.database().ref('/stations').once('value').then((resp) => {
      const markers = [];
      Object.keys(resp.val()).forEach(key => {
        markers.push({ ...resp.val()[key], title: key });
      });
      this.setState({
        markers: markers, isLoaded: true
      });

    }).catch((err) => {
      console.log(err);
    });


    // this.listern = firebase.database().ref('/time').on('value', (snapshot) => {
    //   console.log("change" + snapshot.val());
    // });
  }

  componentWillUnmount() {

  }


  render() {
    if (this.state.isLoaded) {
      return (

        <React.Fragment>

          <SearchBar />
          <View style={styles.mapcontainer}>
            <MapView style={styles.mapStyle}
              initialRegion={{
                latitude: 15.3243,
                longitude: 73.9135,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >

              {this.state.markers.map((item) => {
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
                    
                  />
                );
              })}
            </MapView>
          </View>
          <GatePanel item={{title:'tdsd'}}/>
        </React.Fragment>
      );
    }
    else {
      return null;
    }
  }
}

export default MapPage;

const styles = StyleSheet.create({

  mapcontainer: {
    top: 82,
  },
  mapStyle: {

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.75,
  },

});
