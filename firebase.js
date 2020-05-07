import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/app"
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCNi4HBjKxbE93PcUOQfd62d_IulUGx2j4",
    authDomain: "railgo-23771.firebaseapp.com",
    databaseURL: "https://railgo-23771.firebaseio.com",
    projectId: "railgo-23771",
    storageBucket: "railgo-23771.appspot.com",
    messagingSenderId: "1085946388528",
    appId: "1:1085946388528:web:3571ed1f2f5c7a32404df5",
    measurementId: "G-L8412N9EST"
};

firebase.initializeApp(firebaseConfig);

export default firebase