import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './../App/HomeScreen';
import SignInScreen from './../Auth/SignInScreen';
import AuthLoadingScreen from './../Auth/AuthLoadingScreen';
import IntroScreen from './../Intro/HiIntroScreen';
import SignUpScreen from './../Auth/SignUpScreen';
import AuthLinkScreen from '../Auth/AuthLinkScreen';
import ActivityScreen from '../App/ActivityScreen';
import SideBar from '../App/SideBar';
import { View, Text } from 'react-native';
import BiodataScreen from '../Auth/BiodataScreen';
import AddressScreen from '../Auth/AddressScreen';
import NextOfKinScreen from '../Auth/NextOfKinScreen';
import BankAccountScreen from '../Auth/BankAccountScreen';
import VerifyScreen from '../Auth/VerifyScreen';
import Co6Screen from '../Auth/Co6Screen';
import SelectorModalScreen from '../Auth/SelectorModalScreen';
import MyLocationScreen from '../App/MyLocationScreen';
import MyCirclesScreen from '../App/MyCirclesScreen';
import CircleDetailScreen from '../App/CircleDetailScreen';
import CircleGeofence from '../App/CircleGeofence';
import ChooseOrganizationScreen from '../App/ChooseOrganizationScreen';
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createDrawerNavigator(
  { 
    Home: HomeScreen, 
    Activity: ActivityScreen,
    MyLocation: MyLocationScreen,
    MyCircles: MyCirclesScreen,
    CircleDetail: CircleDetailScreen,
    CircleGeofence: CircleGeofence,
    ChooseOrganization: ChooseOrganizationScreen,
  },
  {
    contentComponent: SideBar,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);
const IntroStack = createStackNavigator({ 
    IntroScreen: IntroScreen 
}, {
    headerMode: 'none'
})
const AuthStack = createStackNavigator({ 
    SignIn: SignInScreen, 
    SignUp: SignUpScreen, 
    AuthLink: AuthLinkScreen, 
    Biodata: BiodataScreen,
    Address: AddressScreen,
    NextOfKin: NextOfKinScreen,
    BankAccount: BankAccountScreen,
    Verify: VerifyScreen,
    Co6: Co6Screen,
  }, 
  { initialRouteName: 'SignIn'}
);

const AuthStackWithModal = createStackNavigator({
  MainAuthStack: AuthStack,
  SelectorModal: SelectorModalScreen,
},
{
  mode: 'modal',
  headerMode: 'none',
});

const BursarNavigator = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStackWithModal,
    Intro: IntroStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default BursarNavigator;