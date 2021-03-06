import React from 'react';
import { Icon, Header, Title, Left, Body, Right, View, Button, Label, Container, Content, Text, H1, Input, Form, Item } from 'native-base';
import { StatusBar, StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
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

class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
	
	return {
		header: (
			<View 
				style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#000", height: "15%"}}
				>
				<View style={{ justifyContent: 'center', width: "15%", }}>
						<Button
							transparent
							onPress={() => navigation.goBack()}>
							<Icon style={{color: '#fff'}} name="md-arrow-back" />
						</Button>
				</View>
				<View style={{ width: "60%", paddingTop: 40}}>
					<Image style={{ alignSelf: 'center', }} resizeMode={'stretch'}  source={require('../../Assets/hi-studio/logo.png')} />

				</View>
				<View style={{ width: 100, justifyContent: 'center',}}>
					<Button onPress={() => alert("HELP COMING SOON")} style={{alignSelf: 'center', backgroundColor: "#000"}}>
						<Text style={{paddingTop: 20, fontSize: 20,  color: "white"}}>Help</Text>
					</Button>
				</View>
			</View>
		)
	}
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
      Auth.requestToken(this.state)
      .then( resp => {
        this.props.setAccessToken(resp.access_token);
        return resp.access_token
       } )
      .then( token => Auth.signin(token).then( sign => sign) )
        .then( response => {
            if(response && !response.error) {
                this.props.navigation.navigate('App');
                const o = {
                    error: false,
                    data: response.onboard
                }
                this.props.addOnboard(o);
                this.props.addSignup({error: false, data: response.user});
                this.props.addCo6s(response.co6s);
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
          {/* <ImageBackground
              source={require(loginBg)}
              imageStyle={{resizeMode: 'stretch'}}
              style={styles.bgImage}
		  > */}
		  {/* <KeyboardAwareScrollView> */}
              <Content contentContainerStyle={styles.content}>

              <View style={styles.formView}>
                <Text style={styles.errorText}>{Utility.isset(this.props.signin)? this.props.signin.message: 'error holder'}</Text>
                <Form style={styles.form}>
                  <Item floatingLabel rounded  style={styles.input}>
					  <Label style={styles.label}>Email or Phone number</Label>
                    <Input selectionColor={"black"}  keyboardType={'email-address'} style={styles.textInput}
                      onChangeText={this.handleChange('username')}
                      value={this.state.username}
                    />
                  </Item>
                  <Item floatingLabel rounded style={styles.input}>
					  <Label style={styles.label}>Password</Label>
                    <Input selectionColor={"black"} secureTextEntry={true} style={{color: '#fff',}}
                      onChangeText={this.handleChange('password')}
                      value={this.state.password}
                    />
                  </Item>
                </Form> 
                <View style={styles.controls}>
                  <Button rounded style={styles.loginBtn} 
                    onPress={this.handleLogin.bind(this)}
                  >
					  <Text style={styles.loginText}>Sign In</Text>
				  </Button>
				  <Button rounded style={styles.forgotPass} 
                    onPress={this.handleLogin.bind(this)}
                  >
					  <Text style={styles.loginText}>Forgot Password</Text>
				  </Button>
                </View>                
              </View>
              </Content>
              {/* </KeyboardAwareScrollView> */}
          {/* </ImageBackground>  */}
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
    },
    addOnboard: data => {
      dispatch(authActions.addOnboard(data));
    },
    addSignup: data => {
      dispatch(authActions.addSignup(data));
    },
    setAccessToken: token => {
      dispatch(authActions.setAccessToken(token));
    },
    addCo6s: co6s => {
      dispatch(authActions.addCo6s(co6s));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);