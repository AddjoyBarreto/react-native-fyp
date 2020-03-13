import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Dimensions, View, StatusBar } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

const GateMap = (props) => {
    const mapref = useRef();
    const markerRefs = useRef({})
    useEffect(() => {
        if (props.selected) {
            mapref.current.animateCamera({
                center: {
                    latitude: props.selected.lat,
                    longitude: props.selected.lon,
                }
            });
            markerRefs.current[props.selected.title].showCallout();
        }

    }, [props.selected])

    return (
        <View style={styles.mapcontainer} >
            <MapView
                moveOnMarkerPress={false}
                ref={mapref}
                onPress={() => { props.mapClick() }}
                style={styles.mapStyle}
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
                            key={item.title}
                            ref={ (ref)=>{markerRefs.current[item.title] = ref}}
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

                {/* {props.selected ? (<Marker
                    coordinate={{
                        latitude: props.selected.lat,
                        longitude: props.selected.lon,
                    }}
                    title={props.selected.title}
                    description=''
                />) : null} */}


            </MapView>
        </View>
    );
};


export default React.memo(GateMap);

const styles = StyleSheet.create({

    mapcontainer: {
        // top: StatusBar.currentHeight,
    },
    mapStyle: {

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - StatusBar.currentHeight,
    },

});

