import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Auth from '../Services/Auth';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const introViewed = await Auth.introViewed();

    if(introViewed) {
      const userToken = false;
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    } else {
      Auth.setIntroViewed();
      this.props.navigation.navigate('Intro');
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;