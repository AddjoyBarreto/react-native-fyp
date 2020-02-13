import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, Button, View, Dimensions, Animated, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';


const { width, height } = Dimensions.get('window');



class GatePanel extends Component {

  //const [outputText, setOutpotText] = useState(false)
  //toggleDisplayBio = ()=> setOutpotText(!outputText);
  constructor(props) {
    super(props);

    this.state = {
      tableHead: ['Train', 'Time'],
      tableData: [
        ['Train', '8:45'],
        ['Train', '9:45'],
        ['Train', '10:50'],
        ['Train', '12:30']
      ],
      slideAnim: new Animated.Value(0),
      rerender: {}
    }

    this.expand = React.createRef(false);

    this.openAnim = Animated.timing(
      // Animate value over time
      this.state.slideAnim, // The value to drive
      {
        toValue: -height * 0.35, // Animate to final value of 1
        useNativeDriver: true
      },
    );

    this.closeAnim = Animated.timing(
      // Animate value over time
      this.state.slideAnim, // The value to drive
      {
        toValue: 0, // Animate to final value of 1
        useNativeDriver: true
      },
    );

  }




  onArrowClick = () => {
    this.expand.current = !this.expand.current;
    if (this.expand.current) {
      this.openAnim.start();
    }
    else {
      this.closeAnim.start();
    }

    this.setState({ rerender: {} })
  }

  render() {
    return (
      <Animated.View style={{ ...styles.scrollstyles, transform: [{ translateY: this.state.slideAnim }] }}>

        {/* the header section */}
        {/* scroll up button */}

        <View style={styles.Icon}>
          <TouchableOpacity onPress={() => { this.onArrowClick() }}>
            <Ionicons name={this.expand.current ? 'ios-arrow-down' : 'ios-arrow-up'} size={30} color='gray' />
          </TouchableOpacity>
        </View>
        {/* gate details */}
        <View style={styles.header}>
          <Text style={styles.gatetitlesize}>Utorda GATE</Text>
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
              <Text style={styles.headertimingdata}> OPEN</Text>
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
            <Button title='Bookmark'></Button>
            <Button title='Remind Me' ></Button>
          </View>
        </View>

      </Animated.View>
    );
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
    paddingTop:0,
    height: height * 0.6

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
    fontSize: 18,
  },
  footerStyles: {
    justifyContent: 'space-around',
    flex:1

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