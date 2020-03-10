import React, { Component } from 'react';
import { StyleSheet, StatusBar, View,Text, Dimensions, TextInput, Button,TouchableOpacity,ImageBackground,Keyboard, Alert,TouchableWithoutFeedback } from 'react-native'
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');

const StartPage = (props) => {

    //authcode
// firebase.auth().languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('login', {
//   'size': 'invisible',
//   'callback': function(response) {
//     // reCAPTCHA solved, allow signInWithPhoneNumber.
//     onSignInSubmit();
//   }
// });


    // let phoneNumber = getPhoneNumberFromUserInput();
    // let appVerifier = window.recaptchaVerifier;
    // let phoneNumber = '+919921824197';
    // let appVerifier = '135234';
    // firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    // .then(function (confirmationResult) {
    //   // SMS sent. Prompt user to type the code from the message, then sign the
    //   // user in with confirmationResult.confirm(code).
    //     Alert.alert('code sent','enter the code to authenticate',[{text:'okay', style:'default'}]);
    //   window.confirmationResult = confirmationResult;
    // }).catch(function (error) {
    //   // Error; SMS not sent
    //   // ...
    // });

        return (
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{...styles.repeatStyles , ...styles.mainContainer}}>
            <ImageBackground source={require('../assets/Track.png')} style={{...styles.repeatStyles, ...styles.imageStyle}}>
                <View style={{...styles.repeatStyles , ...styles.outerWhiteContainer}}>
                    <View style={{...styles.repeatStyles , ...styles.bigContainer}}>
                        <View style={{...styles.repeatStyles , ...styles.innerWhiteContainer}}>
                            <View style={{...styles.repeatStyles , ...styles.smallContainer}}>
                                <Text style={styles.rtextstyle}>Rail Go</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.inputcontainer}>
                    <Text style={styles.summtext}>The Railway Gate Status Check App</Text>
                    <TextInput style={styles.inputtextfield}
                            placeholder='Enter the number'
                            keyboardType={"number-pad"}
                     />
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity = { .5 } style={{backgroundColor:'#00BCD4',  borderRadius:10, borderWidth: 1, borderColor: '#fff'}}>
                        <Button title='login' type='outline' buttonStyle={{backgroundColor:'#F5F1EC'}} onPress={() =>props.navigation.navigate('Bookmark')}/>
                     </TouchableOpacity>
                    </View>                   
                </View>
                </ImageBackground>
                </View>
                </TouchableWithoutFeedback>
           
        )
}

export default StartPage;

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,       
        backgroundColor: '#ede6de',
    },
    repeatStyles:{
        justifyContent:'center',
        alignItems:'center',
    },
    imageStyle:{
        width: '100%',
         height: '100%',
         justifyContent:"center",
         alignItems:'center',
    },
    rtextstyle:{
        fontSize:40,
        fontFamily:'Roboto-Bold',
    },
    outerWhiteContainer:{
        backgroundColor: 'white',
        width: 250,
        height: 250,
        borderRadius:125,
    },
    bigContainer:{
        backgroundColor: 'red',
        width: 240,
        height: 240,
        borderRadius:120,
    },
    innerWhiteContainer:{
        backgroundColor: 'white',
        width: 200,
        height: 200,
        borderRadius:100,
    },
    smallContainer:{
        backgroundColor: '#E0A527',
        width: 190,
        height: 190,
        borderRadius:95,
    },
    inputcontainer:{
        alignItems:'center',
    },
    inputtextfield:{
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom:30, 
        borderRadius:10,
        paddingHorizontal:5,
        width:width*0.75, 
    },
    summtext:{     
        textAlign:'center',
        marginVertical:30,
        paddingHorizontal:width*0.10,
        fontSize:28
    },
    buttonContainer:{
        width:width*0.25,
        borderRadius:10,
    },
})
