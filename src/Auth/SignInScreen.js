import React from 'react';
import { View, Button, Container, Content, Text, H1, Input, Form, Item } from 'native-base';
import { StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import authActions from '../redux/auth/actions';
import { connect } from 'react-redux';
import Auth from '../Services/Auth';
import Utility from '../Services/Utility';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const loginBg = './../Assets/Images/auth/login-bg.png';
const bursarText = './../Assets/Images/intro/Bursar.png';
// 0.58.5 - rn version
// distributionUrl=https\://services.gradle.org/distributions/gradle-4.7-all.zip

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }    
  }

  static getDerivedStateFromProps(props) {
    //console.log(props);

    return props;
  }

  componentDidMount() {
    console.log(this.props.signin)
    if(Utility.isset(this.props.signin)) {
      if(this.props.signin.error === false) {
        this.props.navigation.navigate('App');
      } 
    }
  }

    handleChange = name => value => {
      this.setState({[name]: value});
      console.log(this.state)
    }

    handleLogin = () => {
      if(!this.state.username || !this.state.password) {
        alert('Please fill in required fields.');
        return;
      }
      this.props.clearSignin({error: true, message: 'Signing in...'});
      Auth.login(this.state)
        .then( response => {
            if(response && !response.error) {
                this.props.navigation.navigate('App');
                this.props.clearSignin(response);
            } else {
              this.props.clearSignin({error: true, message: 'Invalid email or password'});
            }
        } )
        .catch( error => {
          this.props.clearSignin({error: true, message: 'Invalid email or password'});
          console.log(error)
        } )
      //this.props.handleSignin(this.state);
    }
  
    render() {
      console.log('Signin: ', this.props.signin)
      
      return (
        <Container style={styles.container}>
          <ImageBackground
              source={require(loginBg)}
              imageStyle={{resizeMode: 'stretch'}}
              style={styles.bgImage}
          >
              <Content contentContainerStyle={styles.content}>
              <View style={styles.formView}>
                <Text style={styles.errorText}>{Utility.isset(this.props.signin)? this.props.signin.message: 'error holder'}</Text>
                <Form style={styles.form}>
                  <Item style={styles.inputItem}>
                    <Input bordered placeholder="Email" textContentType="emailAddress" style={{color: '#5b696c',}}
                      onChangeText={this.handleChange('username')}
                      value={this.state.username}
                    />
                  </Item>
                  <Item style={styles.inputPassword}>
                    <Input outlined placeholder="Password"  style={{color: '#5b696c',}}
                      onChangeText={this.handleChange('password')}
                      value={this.state.password}
                    />
                  </Item>
                </Form> 
                <View style={styles.controls}>
                  <Button rounded style={styles.loginBtn} 
                    onPress={this.handleLogin.bind(this)}
                  ><Text style={styles.loginText}>Login</Text></Button>
                  <TouchableOpacity style={{cursor: 'pointer'}}>
                    <Text style={{color: '#5b696c',}}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>                 
              </View>
              <View style={styles.register}>
                <Button full large 
                  onPress={() => this.props.navigation.navigate('SignUp')}
                  style={styles.registerBtn}><Text style={styles.registerText}>Register</Text></Button>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    padding: 0,
    margin: 0,
    width: deviceWidth,
  },
  bgImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  formView: {
    width: deviceWidth * 0.9,
    //borderColor: '#64493c',
    //borderStyle: 'solid',
    //borderWidth: 1,
    //padding: 10,
    //borderRadius: 20,
  },
  form: {
    //flex: 1,
    borderColor: '#5b696c',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  inputItem: {
    margin: 0,
    borderBottomColor: '#5b696c',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    color: '#5b696c',
  },
  inputPassword: {
    margin: 0,
    borderBottomColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 0,
    color: '#5b696c',
  },
  register: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  registerBtn: {
    width: '100%',
    backgroundColor: '#5b696c',
  },
  registerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  controls: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  loginBtn: {
    backgroundColor: '#5b696c',
    paddingLeft: 20,
    paddingRight: 20,
  },
  loginText: {
    color: '#ffffff',
    fontWeight: '400',
    textTransform: 'capitalize',
    display: 'flex',
    zIndex: 20,
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
    fontSize: 20,
  }
  
});

const mapStateToProps = state => {
  return {
    signin: state.auth.signin,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSignin: form => {
      dispatch(authActions.handleSignin(form));
    },
    clearSignin: form => {
      dispatch(authActions.signin(form));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);