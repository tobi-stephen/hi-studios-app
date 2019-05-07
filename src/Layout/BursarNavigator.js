import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './../App/HomeScreen';
import SignInScreen from './../Auth/SignInScreen';
import AuthLoadingScreen from './../Auth/AuthLoadingScreen';
import IntroScreen from './../Intro/IntroScreen';
import SignUpScreen from './../Auth/SignUpScreen';
import AuthLinkScreen from '../Auth/AuthLinkScreen';
import ActivityScreen from '../App/ActivityScreen';
import SideBar from '../App/SideBar';
import { View, Text } from 'react-native';
import BiodataScreen from '../Auth/BiodataScreen';
import AddressScreen from '../Auth/AddressScreen';
import NextOfKinScreen from '../Auth/NextOfKinScreen';
import BankAccountScreen from '../Auth/BankAccountScreen';
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createDrawerNavigator(
  { 
    Home: HomeScreen, 
    Activity: ActivityScreen 
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
const IntroStack = createStackNavigator({ IntroScreen: IntroScreen })
const AuthStack = createStackNavigator({ 
    SignIn: SignInScreen, 
    SignUp: SignUpScreen, 
    AuthLink: AuthLinkScreen, 
    Biodata: BiodataScreen,
    Address: AddressScreen,
    NextOfKin: NextOfKinScreen,
    BankAccount: BankAccountScreen,
  }, 
  { initialRouteName: 'AuthLink'}
);

const BursarNavigator = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Intro: IntroStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default BursarNavigator;