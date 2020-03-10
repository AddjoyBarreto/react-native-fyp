import React, { Component } from 'react';
import { StyleSheet, StatusBar, View,Text, Dimensions, TextInput, Button,TouchableOpacity,ImageBackground,Keyboard, Alert,TouchableWithoutFeedback } from 'react-native'

const { width, height } = Dimensions.get('window');

const tempScreen = (props) => {
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