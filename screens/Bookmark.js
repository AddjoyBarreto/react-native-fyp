import React, { Component } from 'react';
import { StyleSheet, View,Text, Dimensions, ScrollView } from 'react-native'
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



  onArrowClick = (id) => {
    console.log(id);  
      this.setState({ toggleArrow: !this.state.toggleArrow})
  }

      
        
    
render(){
        const mapsbyid = [{
          id:1,
          gatename:'Majorda',
          
        },
        {
          id:2,
          gatename:'Utorda',
          
        },
        {
          id:3,
          gatename:'Majorda',
          
        },
        {
          id:4,
          gatename:'Utorda',
          
        },
      ]

    return(
       
        <View style={styles.screen}>
          <ScrollView>

            { mapsbyid.map(mapobj=>{
              //console.log(mapobj.id); 
              return (<GateStatus onArrowClick={()=>this.onArrowClick(mapobj.id)} 
                                  toggleArrow={this.state.toggleArrow} 
                                  state={this.state}
                                  mapobj={mapobj} />)
            }) }
                       
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