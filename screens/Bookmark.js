import React, { useState } from 'react';
import { StyleSheet, StatusBar, View,Text, Dimensions, TextInput, Button,TouchableOpacity,ImageBackground,Keyboard, Alert,TouchableWithoutFeedback } from 'react-native'
import GatePanel from '../components/GatePanel';


const { width, height } = Dimensions.get('window');

const Bookmark = (props) => {
    const [selected, setSelected] = useState(undefined);

    return(
        <View style={styles.screen}>
            <Text>the bookmark page</Text>
            <Button title='press'  onPress={() =>props.navigation.navigate('MapPage')} />
            <GatePanel selected={selected} />
        </View>
    )
}

export default Bookmark;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})