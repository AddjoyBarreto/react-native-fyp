import React, {useState, state,Component} from 'react';
import { StyleSheet, Text, Button ,View, Dimensions, FlatList ,ScrollView, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import Panel from 'react-native-panel';
import { Ionicons } from '@expo/vector-icons';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const { width, height } = Dimensions.get('window'); 
class MapPage extends Component {

    state = { isShowingText: true };
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
          ]
        }
      }

    render(){
        const state = this.state;
    return (
        <ScrollView>
      <View style={styles.container}>
        <View style={styles.mapcontainer}>
            <MapView style={styles.mapStyle}
                initialRegion={{
                latitude: 15.3243,
                longitude: 73.9135,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                />
        </View>
        {/* end of map */}
            <View style={styles.scrollstyles}>           
                
                    {/* the header section */}
                    {/* scroll up button */}
                    <View style={styles.scrollupbtn}>
                        <Ionicons name='ios-arrow-up' size={30} color='black' onPress={()=>console.log('scroll up')} />                      
                    </View>
                    {/* gate details */}
                    <View style={styles.header}>
                        <Text style={styles.gatetitlesize}>Utorda GATE</Text>
                        <View style={styles.leftcontainer}>
                            <View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.headertimingdata}>Next Arrival:</Text> 
                                    <Text style={styles.headertimingdata}> 8:30 AM</Text> 
                                </View> 
                                <View style={{flexDirection:'row'}}>  
                                    <Text style={styles.headertimingdata}>Estimate wait:</Text> 
                                    <Text style={styles.headertimingdata}> 5 MIN</Text> 
                                </View>
                            </View>
                            <View style={styles.rightcontainer}>
                                <Text style={styles.headertimingdata}>Gate Status:</Text> 
                                <Text style={styles.headertimingdata}> OPEN</Text>
                            </View> 
                        </View>
                    </View>

                    {/* the hidden section which shows up on button/icon press */}
                    <View style={styles.footerStyles}>
                        <View style={{height:'75%',justifyContent:'center'}}>
                            <View style={styles.tablecontainer}>
                                <Table>
                                <Row data={state.tableHead} style={styles.thead} textStyle={styles.ttext}/>
                                <Rows data={state.tableData} style={styles.tdatastyle} textStyle={styles.tdatatext}/>
                                </Table>
                            </View>
                            <View style={styles.footerbuttonsContainer}>
                                <Button title='Bookmark'></Button>
                                <Button title='Remind Me' ></Button>
                            </View>
                        </View>            
                    </View>
            


            </View> 
      </View>
      </ScrollView>
    );
  }
}

  export default MapPage;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapcontainer:{
        flex:1,
    },
    mapStyle: {
        justifyContent:'flex-start',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.75,
      },
      scrollupbtn:{
        height: 30,
        alignItems:'center',
      },
      scrollstyles:{
        backgroundColor:'#F4E0C9',
        borderRadius:15,
        top:-10,
      },
      header:{
          marginHorizontal:20,
      },
      gatetitlesize:{
        fontSize:30,
        marginVertical:8
      },
      leftcontainer:{
        flexDirection:'row',
      },
      rightcontainer:{
        flexDirection:'row',
        marginLeft:10,
      },
      headertimingdata:{
          fontSize:18,
      },
      footerStyles:{
        flex:1,
      },
      tablecontainer:{
          marginHorizontal:50,
          marginTop:60,
      },
      thead:{
          backgroundColor:'black',
      },
      ttext:{
          fontSize:20,
          color:'white',
          textAlign:'center'
      },
      tdatastyle:{
        backgroundColor:'white',
        borderBottomWidth: 0.5,
        borderBottomColor:'gray',
      },
      tdatatext:{
        fontSize:20,
        textAlign:'center'
    },
    footerbuttonsContainer:{
        marginVertical:20,
        marginHorizontal:40,
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between'
    },
    footerbtnstyles:{
        backgroundColor:'white',
        color:'black',
        borderColor:'black',
        borderWidth:0.5,
        borderRadius:5,
    }
  });
  
