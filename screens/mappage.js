import React, {useState, state,Component} from 'react';
import { StyleSheet, Text, Button ,View, Dimensions, FlatList ,ScrollView, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import Panel from 'react-native-panel';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window'); 
class MapPage extends Component {

    state = { isShowingText: true };
    //const [outputText, setOutpotText] = useState(false)
    //toggleDisplayBio = ()=> setOutpotText(!outputText);

    render(){
    return (
        
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
                <ScrollView>
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
                    <View style={styles.fotterStyles}>
                    <View style={{height:'75%',justifyContent:'center',backgroundColor:'yellow'}}>
                    <Text>hey there</Text>
                    </View>            
                    </View>
            </ScrollView>
            </View> 
      </View>
     
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
        height: '100%',
      },
      scrollupbtn:{
        height: 30,
        alignItems:'center',
      },
      scrollstyles:{
        minHeight:'25%',
        backgroundColor:'#F4E0C9',
      },
      header:{
          marginHorizontal:20,
      },
      gatetitlesize:{
        fontSize:30,
        marginVertical:10
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
      fotterStyles:{
        flex:1,
      },
  });
  