import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import GateStatus from '../components/GateStatus';
import { DrawerActions } from 'react-navigation-drawer';
import * as firebase from 'firebase';
const { width, height } = Dimensions.get('window');

const arr = []
class Bookmark extends Component {

  state = {
    tableHead: ['Train', 'Time'],
    tableData: [
      ['Train', '8:45'],
      ['Train', '9:45'],
      ['Train', '10:50'],
      ['Train', '12:30']
    ],
    toggleArrow: false,
    array: []
  }


  componentDidMount() {
    let userid = firebase.auth().currentUser.uid
    try {
      firebase.database().ref('users/' + userid + '/bookmark').on('value', async (snapshot) => {
        console.log('bookmarked in DB', Object.values(snapshot.val()));
        //arr = Object.values(snapshot.val())
        const bookmarkStationNames = Object.values(snapshot.val())
        const bookmarkStationObjects = []
        console.log(bookmarkStationNames, 'statio names')
        for (stationName of bookmarkStationNames) {
          const stationObj = (await firebase.database().ref('/stations/').orderByChild('name').equalTo(stationName).once("value")).val().filter(item => !!item)[0]
          bookmarkStationObjects.push(stationObj)
          console.log(stationObj, 'stationobj')
        }
        console.log(bookmarkStationObjects)
        this.setState({ array: bookmarkStationObjects })
        console.log(this.state.array)
      });
    }
    catch (err) {
      console.log(err)
    }
  }


  onArrowClick = (id) => {
    console.log(id);
    this.setState({ toggleArrow: !this.state.toggleArrow })
  }



  render() {
    const mapsbyid = [{
      id: 1,
      gatename: 'Majorda',

    },
    {
      id: 2,
      gatename: 'Utorda',

    },
    ]

    return (

      <View style={styles.screen}>
        <TouchableOpacity style={{ marginTop: 20, width: width }} onPress={() => {
          this.props.navigation.dispatch(DrawerActions.toggleDrawer());
        }}>
          <EvilIcons name="navicon" size={40} color="black" />
        </TouchableOpacity>
        <ScrollView>

          {this.state.array.map(mapobj => {
            //console.log(mapobj.id); 
            return (<React.Fragment key={mapobj.name}>
              <GateStatus onArrowClick={() => this.onArrowClick(mapobj.id)}
                toggleArrow={this.state.toggleArrow}
                state={this.state}
                mapobj={mapobj} />
            </React.Fragment>)
          })}

        </ScrollView>
      </View>

    )
  }
}

export default Bookmark;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.01,
  },
})