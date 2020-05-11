import React, { Component } from 'react';
import { StyleSheet, View,Text, Dimensions, Button} from 'react-native';

const { width, height } = Dimensions.get('window');

const tempScreen = (props) => {
    console.log(props)
    return(
        <View style={styles.screen}>
            <Text>the tempScreen page</Text>
            <Button title='press'  onPress={() =>props.navigation.navigate('Bookmark')} />
        </View>
    )
}

export default tempScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})