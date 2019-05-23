import React from 'react';
import { View, Button, Container, Content, Text, Item, Form, Input, Picker, Icon, Label, Grid, Col} from 'native-base';
import { StyleSheet, Image, ImageBackground, Dimensions, Alert} from 'react-native';
import Auth from '../Services/Auth';
import authActions from '../redux/auth/actions';
import { connect } from 'react-redux';
import Utility from '../Services/Utility';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const loginBg = './../Assets/Images/auth/login-bg.png';
const bursarText = './../Assets/Images/intro/Bursar.png';
const deviceWidth = Dimensions.get("window").width;
const months = {
  0: {label: 'Jan', days: 31}, 1: {label: 'Feb', days: 29}, 2: {label: 'Mar', days: 31}, 
  3: {label: 'Apr', days: 30}, 4: {label: 'May', days: 30}, 5: {label: 'Jun', days: 30}, 
  6: {label: 'Jul', days: 31}, 7: {label: 'Aug', days: 31}, 8: {label: 'Sep', days: 30},
  9: {label: 'Oct', days: 30}, 10: {label: 'Nov', days: 31}, 11: {label: 'Dec', days: 31}
};

class SignUpScreen extends React.Component {
    static navigationOptions = {
      title: '',
    };

    constructor(props) {
      super(props);

      this.state = {
        email: '',
        phone: '',
        password: '',
        firstname: '',
        lastname: '',
        day: '',
        month: '',
        year: '',
        days: 31,
        prevDay: '',
        redirect: false,
      }

      this.renderYears = this.renderYears.bind(this);
    }

    componentDidMount() {
      this.props.clearSignup();
      this.setState({years: this.renderYears(), redirect: false});
      this.setState({organization_id: this.props.navigation.getParam('organization_id')});
    }

    onInputChange(key, value) {
      this.setState({
        [key]: value,
      });
    }

    onSelectChange(key, value) {
      this.setState({[key]: value});
    }

    onDateChange(key, value) {
      let d = 0;
      if(key === 'month' && value !== this.state.month) {
        d = +this.state.day;
      }

      this.setState({
        [key]: value,
      });

      if(key === 'month' && value !== this.state.month) {
        const self = this;
        this.setState({days: months[--value].days});
        setTimeout(function() {
          console.log(d, self.state.days, )
          if(d <= self.state.days)
            self.setState({day: d});
        }, 100)
      }
    }

    renderYears = () => {
      let fullYear = parseInt((new Date()).getFullYear()) -16;
      const years = [...Array(5)].map( i => fullYear-- );
      const pickers = years.map( year => <Picker.Item key={year} label={year} value={`${year}`} />);
      return pickers;
    } 

    signup = () => {
      const { email, password, phone, firstname } = this.state;
      if(!email || !password || !phone) {
        Alert.alert("Missing info", "Please enter all required fields");
        return;
      }
      let data = {};

      data.email = email;
      data.password = password;
      data.phone = phone;
      data.firstname = firstname;
      data.username = '';
      data.organization_id = this.state.organization_id;
      //console.log(data);
      //Auth.signup(data)
      this.setState({redirect: true});
      this.props.handleSignup(data);
      //this.props.navigation.navigate('Biodata');
      //fetch('http://453197b3.ngrok.io/api/create-user').then( resp => console.log(resp)).catch( err => console.log(err));
    };
  
    render() {
      if(this.state.redirect && this.props.auth.signup.error === false) {
        this.props.navigation.navigate('Co6');
      }
      let fullYear = parseInt((new Date()).getFullYear()) -18;
      return (
        <Container style={styles.container}>
          <ImageBackground
              source={require(loginBg)}
              imageStyle={{resizeMode: 'stretch'}}
              style={styles.bgImage}
          >
            <KeyboardAwareScrollView>
              <Content contentContainerStyle={styles.content}>
                
                <View style={{marginVertical: 20,}}>
                  
                    <Text style={styles.title}>Let's get you started!</Text>
                    <Text style={styles.subtitle}>
                      Your account lets you enjoy security at the tap of a button.
                    </Text>
                  
                  <Text style={styles.errorText}>{Utility.isset(this.props.auth.signup)? this.props.auth.signup.message: (this.props.auth.loading === true? 'Signing up ...': '')}</Text>
                  <Form style={styles.form}>
                    <Item style={styles.formItem}>
                      <Input placeholder="Firstname" textContentType="givenName" style={styles.input} value={this.state.firstname} onChangeText={this.onInputChange.bind(this, 'firstname')} />
                    </Item>
                    <Item style={styles.formItem}>
                      <Input placeholder="Email" textContentType="emailAddress" style={styles.input} value={this.state.email} onChangeText={this.onInputChange.bind(this, 'email')} />
                    </Item>
                    <Item style={styles.formItem}>
                      <Input secureTextEntry={true} textContentType="password" placeholder="Password" style={styles.input} value={this.state.password} onChangeText={this.onInputChange.bind(this, 'password')} />
                    </Item>
                    <Item style={styles.formItem}>
                      <Input placeholder="Phone" textContentType="telephoneNumber" style={styles.input} value={this.state.phone} onChangeText={this.onInputChange.bind(this, 'phone')} />
                    </Item>
                  </Form>
                </View>
                <View style={styles.footer}>
                  <View style={styles.footerItem}>
                    <Button full style={styles.signupBtn} onPress={this.signup.bind(this)}>
                      <Text style={styles.signupText}>Sign Up</Text>
                    </Button>
                  </View>
                  <View style={styles.footerItem}>
                    <Button full style={styles.loginBtn}
                    onPress={() => {
                      this.props.navigation.navigate('SignIn');
                    }}>
                      <Text style={styles.loginText}>Login</Text>
                    </Button>
                  </View>
                </View>
              </Content>
              </KeyboardAwareScrollView>
          </ImageBackground>
      </Container>
      );
    }
  
    
  }

const styles = StyleSheet.create({
  content: {
    //justifyContent: 'space-between',
    //height: '100%',
    //width: deviceWidth,
  },
  bgImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
  },
  footerItem: {
    flex: 1,
  },
  signupBtn: {
    backgroundColor: '#5b696c',
  },
  loginBtn: {
    backgroundColor: '#D2D2D2',
  },
  loginText: {
    color: '#5b696c',
    textTransform: 'capitalize',
    fontSize: 20,
  },
  signupText: {
    color: '#ffffff',
    textTransform: 'capitalize',
    fontSize: 20,
  },
  form: {
    margin: 14,
    padding: 0,
    //borderStyle: 'solid',
    //borderWidth: 2,
    overflow: 'hidden',
    marginTop: 20,
    justifyContent: 'center',
  },
  formItem: {
    //margin: 0,
    borderStyle: 'solid',
    borderBottomWidth: 0,
    //flex: 1,
    //marginTop: 40,
    marginBottom: 30,
  },
  formItem1: {
    //margin: 0,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    flex: 1,
    //marginTop: 40,
    marginBottom: 30,
  },
  input: {
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: '#5b696c',
    margin: 0,
  },
  dobLabel: {
    borderBottomWidth: 0,
  },
  dobItem: {
    borderWidth: 0,
  },
  wrapper: {
    //flex: 1,
    padding: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "300",
    color: '#5B4034',
    marginBottom: 12,
  },
  subtitle: {
    color: '#5B4034',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
    fontSize: 18,
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSignup: form => {
      dispatch(authActions.handleSignup(form));
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
    clearSignup: () => {
      dispatch(authActions.addSignup({}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);