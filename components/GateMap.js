import React, { useEffect } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

const GateMap = (props) => {
    useEffect(() => {
        
    });

    return (
        <View style={styles.mapcontainer} >
            <MapView style={styles.mapStyle}
                initialRegion={{
                    latitude: 15.3243,
                    longitude: 73.9135,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >

                {props.markers.map((item) => {
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
                            onPress={props.markerClick}

                        />
                    );
                })}

                {props.selected ? (<Marker
                    key={Math.random().toString()}
                    coordinate={{
                        latitude: props.selected.lat,
                        longitude: props.selected.lon,
                    }}
                    title={props.selected.title}
                    description=''
                    
                />) : null}


            </MapView>
        </View>
    );
};


export default React.memo(GateMap);

const styles = StyleSheet.create({

    mapcontainer: {
        top: 82,
    },
    mapStyle: {

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

});

