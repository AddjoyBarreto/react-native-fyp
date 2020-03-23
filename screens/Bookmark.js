import React, { Component } from 'react';
import { StyleSheet, StatusBar, View,Text, Dimensions,Animated, Button,TouchableOpacity,ImageBackground,Keyboard, Alert,TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';
import GateStatus from '../components/GateStatus';

const { width, height } = Dimensions.get('window');

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
        }
    
    
    
      onArrowClick = () => {   
         this.setState({ toggleArrow: !this.state.toggleArrow})
      }

      
    
render(){

    return(
       
        <View style={styles.screen}>
          <ScrollView>
              
            <GateStatus onArrowClick={this.onArrowClick} 
                        toggleArrow={this.state.toggleArrow} 
                        state={this.state} />

            <GateStatus onArrowClick={this.onArrowClick} 
                        toggleArrow={this.state.toggleArrow} 
                        state={this.state} />

          <GateStatus onArrowClick={this.onArrowClick} 
                      toggleArrow={this.state.toggleArrow} 
                      state={this.state} />

          <GateStatus onArrowClick={this.onArrowClick} 
                      toggleArrow={this.state.toggleArrow} 
                      state={this.state} />
          </ScrollView>                         
        </View>
        
    )
}
}

export default Bookmark;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:height*0.01,
    },
})