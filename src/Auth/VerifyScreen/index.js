import React from 'react';
import { View, Button, Container, Content, Text, H1, Input, Form, Item } from 'native-base';
import { StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import authActions from '../../redux/auth/actions';
import { connect } from 'react-redux';
import Auth from '../../Services/Auth';
import Utility from '../../Services/Utility';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const loginBg = './../../Assets/Images/auth/login-bg.png';
// 0.58.5 - rn version
// distributionUrl=https\://services.gradle.org/distributions/gradle-4.7-all.zip

class VerifyScreen extends React.Component {
  static navigationOptions = {
    title: 'Enter code',
  };

  constructor(props) {
    super(props);

    this.state = {
      uniqueCode: '',
      redirect: false,
    }    
  }

  static getDerivedStateFromProps(props) {
    //console.log(props);

    return props;
  }

  componentDidMount() {
    this.setState({redirect: false});
    this.props.addOnboard({});
    this.props.addVerifyCode("");
    if(Utility.isset(this.props.signin)) {
      if(this.props.signin.error === false) {
        //this.props.navigation.navigate('App');
      } 
    }
  }

    handleChange = name => value => {
      this.setState({[name]: value});
      this.props.addVerifyCode(value);
    }

    handleVerify = () => {
      this.setState({redirect: true});
      this.props.getVerifyCode(this.props.auth.verifyCode);
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
      if(this.state.redirect && this.props.auth.onboard.error === false) {
        this.props.navigation.navigate('SignUp', {organization_id: this.props.auth.onboard.organization_id});
      }
      
      return (
        <Container style={styles.container}>
          <ImageBackground
              source={require(loginBg)}
              imageStyle={{resizeMode: 'stretch'}}
              style={styles.bgImage}
          >
            
              <Content contentContainerStyle={styles.content}>
              <KeyboardAwareScrollView>
              <View style={styles.formView}>
                <Text style={styles.errorText}>{Utility.isset(this.props.auth.onboard)? this.props.auth.onboard.message: (this.props.auth.loading? 'Verifying ...': '')}</Text>
                <Form style={styles.form}>
                  <Item style={styles.inputItem}>
                    <Input bordered placeholder="Orginazation code" textContentType="nickname" style={{color: '#5b696c',}}
                      onChangeText={this.handleChange('uniqueCode')}
                      value={this.state.uniqueCode}
                    />
                  </Item>
                </Form> 
                <View style={styles.controls}>
                  <Button rounded style={styles.loginBtn} 
                    onPress={this.handleVerify.bind(this)}
                  ><Text style={styles.loginText}>Verify</Text></Button>
                </View>
                             
              </View>
              </KeyboardAwareScrollView>
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSignin: form => {
      dispatch(authActions.handleSignin(form));
    },
    clearSignin: form => {
      dispatch(authActions.signin(form));
    },
    addVerifyCode: code => {
      dispatch(authActions.verify(code));
    },
    getVerifyCode: code => {
      dispatch(authActions.getVerifyCode(code));
    },
    addOnboard: data => {
      dispatch(authActions.addOnboard({}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyScreen);