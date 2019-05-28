import React from 'react';
import { View, Button, Container, Content, Text } from 'native-base';
import { StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const signupBg = './../Assets/Images/auth/login-bg.png';
const logo = './../Assets/Images/e-pub-logo.png';
const hilogo = '../Assets/hi-studio/logo.png';

class AuthLinkScreen extends React.Component {
    static navigationOptions = {
      header: null,
    };
  
    render() {
      return (
        <Container style={styles.container}>
          <ImageBackground
              source={require(signupBg)}
              imageStyle={{resizeMode: 'stretch'}}
              style={styles.bgImage}
          >
              <Content contentContainerStyle={styles.content}>
                <View style={styles.topView}>
                  <Image source={require(hilogo)} />
                  <Text style={styles.introText}>Nigeria's First Full HD Television Station</Text>
                </View>
                <View style={styles.controls}>
                  <Button block large onPress={() => this.props.navigation.navigate('SignIn')} style={styles.outlined}>
                    <Text style={{color: '#5b696c', textTransform: 'capitalize'}}>Login</Text>
                  </Button>
                  <Button
                    onPress={() => this.props.navigation.navigate('Verify')}
                    block primary large style={styles.filled}>
                    <Text style={{textTransform: 'capitalize'}}>Sign up</Text>
                  </Button>
                </View>
              </Content>
          </ImageBackground>
      </Container>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };
  }

const styles = StyleSheet.create({
  content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      height: deviceHeight * 0.7,
      width: deviceWidth,
      marginTop: deviceHeight * 0.10,
  },
  bgImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 2,
    flex: 1,
    width: deviceWidth * 0.8,
  },
  outlined: {
    borderColor: '#5b696c',
    borderWidth: 2,
    marginBottom: 10,
    color: '#5b696c',
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
  },
  filled: {
    backgroundColor: '#5b696c',
  },
  topView: {
    alignItems: 'center'
  },
  introText: {
    fontSize: 20,
    marginTop: 20,
  }
});

export default AuthLinkScreen;