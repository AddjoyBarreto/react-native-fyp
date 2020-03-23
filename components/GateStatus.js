import React, { Component } from 'react';
import { StyleSheet, StatusBar, View,Text, Dimensions,Animated, Button,TouchableOpacity,ImageBackground,Keyboard, Alert,TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';

const { width, height } = Dimensions.get('window');

const GateStatus = (props) => {
  const gatetable = props.state.toggleArrow ? ( <View style={styles.tablecontainer}>
                                          <Table>
                                              <Row data={props.state.tableHead} style={styles.thead} textStyle={styles.ttext} />
                                              <Rows data={props.state.tableData} style={styles.tdatastyle} textStyle={styles.tdatatext} />
                                          </Table>
                                        </View>) : null;


    return(
       
            <View style={styles.gatecontainers}>
                <View style={styles.gatetopsection}>
                    <Text style={styles.gatename}>Majorda Gate</Text>
                    <View style={styles.topcontainersview}>
                        <Text style={styles.topcontainerstext}>Next Arrival: </Text>
                        <Text style={styles.topcontainerstext}>10:20 min</Text>
                    </View>
                    <View style={styles.topcontainersview}>
                        <Text style={styles.topcontainerstext}>Estimate wait time: </Text>
                        <Text style={styles.topcontainerstext}>10 min</Text>
                    </View>
                    <View style={styles.topcontainersview}>
                        <Text style={styles.topcontainerstext}>Gate Status: </Text>
                        <Text style={styles.topcontainerstext}>OPEN</Text>
                    </View>
                    {/* on press dropdown */}
                     {gatetable}
                    {/* the button */}
                    <View style={styles.Icon}>
                        <TouchableOpacity onPress={props.onArrowClick}>
                            <Ionicons name={!props.state.toggleArrow ? 'ios-arrow-down' : 'ios-arrow-up'} size={30} color='gray' />
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View> 

            
        
    )
}


export default GateStatus;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:height*0.01,
    },
    gatecontainers:{
        width:width*0.8,
        flexDirection:'row',
        backgroundColor:'#F4E0C9',
        borderRadius: 20,
        paddingVertical:5,
        marginVertical: 10,
    },
    gatetopsection:{
        width:width*0.8,
        alignItems:'center',
    },
    gatename:{
        fontSize:30,
        paddingVertical:10,
    },
    topcontainersview:{
        flexDirection:'row',
        marginBottom:5,
    },
    topcontainerstext:{
        fontSize:20,
        alignItems:'center',
    },
    Icon: {
        paddingVertical:5,
        alignSelf: 'center',
    },
      tablecontainer: {       
        width:width*0.7,
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
})