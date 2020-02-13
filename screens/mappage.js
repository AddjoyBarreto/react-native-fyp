import React, { useState, state, Component, useEffect } from 'react';
import { StyleSheet, Text, Button, View, Dimensions, FlatList, ScrollView, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Panel from 'react-native-panel';
import { Ionicons } from '@expo/vector-icons';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import GatePanel from '../components/GatePanel'
import SearchBar from '../components/SearchBar'




const { width, height } = Dimensions.get('window');


class MapPage extends Component {

  state = { isShowingText: true };
  //const [outputText, setOutpotText] = useState(false)
  //toggleDisplayBio = ()=> setOutpotText(!outputText);
  constructor(props) {
    super(props);

    this.scrollViewRef = React.createRef();
  }




  render() {
    const state = this.state;
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
            <Marker
              coordinate={{
                latitude: 15.3162,
                longitude: 73.9201,
              }}
              title='Majorda Gate, Goa'
              description=''
            />
            <Marker
              coordinate={{
                latitude: 15.3243,
                longitude: 73.9135,
              }}
              title='Utorda Gate, Goa'
              description=''
            />
          </MapView>
        </View>

        <GatePanel />

      </React.Fragment>
    );
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
