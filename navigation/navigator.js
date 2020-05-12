import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import StartPage from '../screens/StartPage';
import MapPage from '../screens/mappage';
import Bookmark from '../screens/Bookmark';
import tempScreen from '../screens/tempScreen';
import firebase from '../firebase'

const LoadingPage = (props) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            props.navigation.navigate('Main')
        }
        else {
            props.navigation.navigate('Startpage')
        }
    })

    return null
}


const sideDrawer = createDrawerNavigator({
    MapPage: {
        screen: MapPage,
    },
    Bookmark: {
        screen: Bookmark,
    },
    SignOut: {
        screen: StartPage,
    }
});



const MySwitchNavigator = createSwitchNavigator({
    LoadingPage: LoadingPage,
    Startpage: {
        screen: StartPage
    },
    Main: sideDrawer

});


export default createAppContainer(MySwitchNavigator);

