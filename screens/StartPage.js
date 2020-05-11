import React, { Component, useState } from 'react';
import { StyleSheet, StatusBar, View,Text, Dimensions, TextInput, Button,TouchableOpacity,ImageBackground,Keyboard, Alert,TouchableWithoutFeedback } from 'react-native'
// import auth from '@react-native-firebase/auth';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

const { width, height } = Dimensions.get('window');

const StartPage = (props) => {

    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const [verificationCodePromt, setVerificationCodePromt] = useState(false);
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, showMessage] = useState((!firebaseConfig || Platform.OS === 'web')
        ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
        : undefined);
 
    loginHandler = async () => {
            // The FirebaseRecaptchaVerifierModal ref implements the
            // FirebaseAuthApplicationVerifier interface and can be
            // passed directly to `verifyPhoneNumber`.
            try {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              alert("Verification code has been sent to your phone.");
              setVerificationCodePromt(true);
            } catch (err) {
              alert(err)
            }
          }


    otpHandler = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            alert("Phone authentication successful 👍" );
            //saving in the real db
            let userid = firebase.auth().currentUser.uid
            firebase.database().ref('users').child(userid).set({
                PhoneNumber: phoneNumber
              })
              //navigation
            props.navigation.navigate('MapPage');
        } catch (err) {
            alert(err);
        }
    }

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
                <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                    />
                    
                    {/* input phone number */}
                    {(!verificationCodePromt)?(
                        <React.Fragment>
                            <Text style={styles.summtext}>The Railway Gate Status Check App</Text>
                        <TextInput style={styles.inputtextfield}
                                placeholder='Enter the number'
                                autoFocus
                                autoCompleteType="tel"
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                        />
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity = { .5 } style={{ borderRadius:10,width:width*0.25}}>
                            <Button title='login' disabled={!phoneNumber} type='outline' buttonStyle={{backgroundColor:'#F5F1EC'}} onPress={()=>loginHandler()}/>
                            {/* <View style={styles.btns}
                                disabled={!phoneNumber} onPress={()=>loginHandler()}>
                                <Text style={{fontSize:width*0.045}}>Login</Text>
                            </View> */}
                        </TouchableOpacity>
                        </View> 
                        </React.Fragment>): undefined}
                    

            {/* input otp code  */}
            {(verificationCodePromt)?(<React.Fragment>
                <Text style={{ marginTop: 20,fontSize:20 }}>Enter Verification code</Text>
                    <TextInput
                        style={{ marginVertical: 10, fontSize: 17 }}
                        editable={!!verificationId}
                        placeholder="123456"
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        onChangeText={setVerificationCode}
                    />
                    <TouchableOpacity activeOpacity = { .5 } style={{ borderRadius:10}}>
                            <Button title='Confirm Verification Code' disabled={!phoneNumber} type='outline' buttonStyle={{backgroundColor:'#F5F1EC'}} onPress={()=>otpHandler()}/>
                            {/* <View style={styles.btns}
                                disabled={!verificationId} onPress={()=>otpHandler()}>
                                <Text style={{fontSize:width*0.045}}>Confirm Verification Code</Text>
                            </View> */}
                        </TouchableOpacity>
                        
                    {/* <Button
                        title="Confirm Verification Code"
                        disabled={!verificationId}
                        style={{height:10,color:'black'}}
                        onPress={()=>otpHandler()}/> */}
            </React.Fragment>): undefined}
                

                    {message ? (
                        <TouchableOpacity
                        style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
                        onPress={() => alert(undefined)}>
                        <Text style={{color: message.color || "blue", fontSize: 20, textAlign: "center", margin: 20, }}>
                            {message.text}
                        </Text>
                        </TouchableOpacity>
                    ) : undefined}

                </View>
                </ImageBackground>
                </View>
                </TouchableWithoutFeedback>
           
        );
  
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
        alignItems:'center'
    },
    btns:{
        width:width*0.35,
        height:height*0.06,
        backgroundColor:'#F5F1E0',  
        borderRadius:10, 
        borderWidth: 1, 
        borderColor: '#000',
        justifyContent:'center',
        alignItems:'center'
    },
})
