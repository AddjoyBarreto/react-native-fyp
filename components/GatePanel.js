import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity, InteractionManager } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
// import ExpoEnd from '../ExpoEnd'

const { width, height } = Dimensions.get('window');
const open = height - height * 0.6
const close = open + height * 0.35
var array = [];

class GatePanel extends Component {

  constructor(props) {
    super(props);
    console.log('props ',this.props.selected)
    this.state = {
      tableHead: ['Train', 'Time'],
      tableData: [
        ['Train', '8:45'],
        ['Train', '9:45'],
        ['Train', '10:50'],
        ['Train', '12:30']
      ],
      slideAnim: new Animated.Value(close),
      expand: false,
      Gatearray:['']
    }

    this.slideVal = this.state.slideAnim.interpolate({
      inputRange: [open, close],
      outputRange: [open, close],
      extrapolate: 'clamp'
    })

    this.gestureHandler = Animated.event(
      [
        {
          nativeEvent: {
            absoluteY: this.state.slideAnim
          }
        }
      ], { useNativeDriver: true })

    this.openAnim = (velocityY) => {


      Animated.timing(this.state.slideAnim, {
        toValue: open,
        duration: velocityY > 0 ? 30000 / velocityY : 500,
        useNativeDriver: true
      }).start()

      setTimeout(() => {
        this.setState({ expand: true });
      }, 100)

    }

    this.closeAnim = (velocityY) => {
      Animated.timing(this.state.slideAnim, {
        toValue: close,
        duration: velocityY < 0 ? 30000 / velocityY : 500,
        useNativeDriver: true
      }).start()


      setTimeout(() => {
        this.setState({ expand: false });
      }, 100)


    }


    this.gestureStateChange = ({ nativeEvent }) => {
      if (nativeEvent.state === State.END) {
        console.log(nativeEvent.translationY)
        if (nativeEvent.translationY > 0) {
          this.closeAnim(nativeEvent.velocityY)
        }
        else if (nativeEvent.translationY < 0) {
          this.openAnim(nativeEvent.velocityY)
        }
      }
    }

    this.registerForPushNotificationsAsync = async () => {
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
      console.log('token', token);
      // POST the token to our backend so we can use it to send pushes from there
      let userid = firebase.auth().currentUser.uid
      console.log('userid', userid);
      var updates = {}
      updates['/expoToken'] = token
      //real time db
      await firebase.database().ref('users/' + userid).update({ expoToken: token })
      //call the push notification 
      // var db = firebase.firestore();
  
      //firestore
      // db.collection("users").doc(userid).update({
      //   expoToken: token,
      // }).then(function () {
      //   console.log("Document successfully written!");
      // }).catch(function (error) {
      //   console.error("Error writing document: ", error);
      // });
      alert('reminder is set');
      console.log('token saved')
    }
  
    this.bookmarkHandler = async() =>{
      try{
        
        let userid = firebase.auth().currentUser.uid
        let selectedGate = this.props.selected.title; //selected gate
        await firebase.database().ref('users/' + userid+'/bookmark').once('value', function(snapshot) {
          array = snapshot.val();
          // ["Bill Gates", "Larry Page", "James Tamplin"]
        });
        //let joined = this.state.Gatearray.concat(selectedGate);
        //this.setState({Gatearray: joined})
        this.setState({Gatearray: {...array,...selectedGate}})
        //array.push( this.props.selected.title )
        console.log('array',array);
        console.log('Gatearray',this.state.Gatearray);
        await firebase.database().ref('users/' + userid+'/bookmark').update({bookmark: this.props.selected.title})
        alert('Bookmark Added')
      }
      catch(err){
        alert(err);
      }
    }

  }

  componentDidUpdate(prevprops) {
    if (!this.props.selected && this.state.expand) {
      this.setState({ expand: false })
    }
  }

  onArrowClick = () => {
    if (!this.state.expand) {
      // this.openAnim.start();
      this.openAnim();
    }
    else {
      // this.closeAnim.start();
      this.closeAnim()
    }

  }

  
  render() {

    if (this.props.selected) {
      return (
        <PanGestureHandler
          onHandlerStateChange={this.gestureStateChange}
          onGestureEvent={this.gestureHandler}>
          <Animated.View style={{
            ...styles.scrollstyles,
            transform: [{ translateY: this.slideVal }],
            position: 'absolute',
            width: '100%'
          }

          }>

            {/* the header section */}
            {/* scroll up button */}

            <View style={styles.Icon}>
              <TouchableOpacity onPress={() => { this.onArrowClick() }}>
                <Ionicons name={this.state.expand ? 'ios-arrow-down' : 'ios-arrow-up'} size={40} color='gray' />
              </TouchableOpacity>
            </View>
            {/* gate details */}
            <View style={styles.header}>
              <Text style={styles.gatetitlesize}>{this.props.selected.title}</Text>
              <View style={styles.leftcontainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.headertimingdata}>Next Arrival:</Text>
                  <Text style={styles.headertimingdata}> 8:30 AM</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.headertimingdata}>Estimate wait:</Text>
                  <Text style={styles.headertimingdata}> 5 MIN</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.headertimingdata}>Gate Status:</Text>
                  <Text style={styles.headertimingdata}> {this.props.selected.status ? 'OPEN' : 'CLOSE'}</Text>
                </View>
              </View>
            </View>

            {/* the hidden section which shows up on button/icon press */}
            <View style={styles.footerStyles}>
              <View style={styles.tablecontainer}>
                <Table>
                  <Row data={this.state.tableHead} style={styles.thead} textStyle={styles.ttext} />
                  <Rows data={this.state.tableData} style={styles.tdatastyle} textStyle={styles.tdatatext} />
                </Table>
              </View>
              <View style={styles.footerbuttonsContainer}>
                <Button title='Bookmark' onPress={()=>this.bookmarkHandler()}></Button>
                <Button title='Remind Me' onPress={()=>this.registerForPushNotificationsAsync()}></Button>
              </View>
            </View>

          </Animated.View>
        </PanGestureHandler>
      );
    }

    else {
      return null;
    }
  }
}


const styles = StyleSheet.create({

  scrollupbtn: {
    height: 30,
    alignItems: 'center',
  },

  Icon: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0
  },

  scrollstyles: {
    backgroundColor: '#F4E0C9',
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'space-evenly',
    padding: 20,
    paddingTop: 0,
    height: height * 0.6,

  },
  header: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gatetitlesize: {
    fontSize: 30,
    marginVertical: 8
  },
  leftcontainer: {
    flexDirection: 'column',
  },
  rightcontainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  headertimingdata: {
    fontSize: 17,
    fontWeight: '400',
    color: 'gray'
  },
  footerStyles: {
    justifyContent: 'space-around',
    flex: 1

  },
  tablecontainer: {
  },
  thead: {
    backgroundColor: 'black',
  },
  ttext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  tdatastyle: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  tdatatext: {
    fontSize: 20,
    textAlign: 'center'
  },
  footerbuttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  footerbtnstyles: {
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
  }
});


export default GatePanel;