import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import StartPage from '../screens/StartPage';
import MapPage from '../screens/mappage';
import Bookmark from '../screens/Bookmark';
import tempScreen from '../screens/tempScreen';


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
    Startpage: {
        screen: StartPage
    },
    MapPage: {
        screen: MapPage
    },
    Bookmark: {
        screen: sideDrawer
    },
    
});


export default createAppContainer(sideDrawer);

