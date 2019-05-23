import React from 'react';
import { View, Button, Container, Content, Text, H1, 
  Input, Form, Item, Label, Picker, List, ListItem, Icon, Spinner } from 'native-base';
import { StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import authActions from '../../redux/auth/actions';
import { connect } from 'react-redux';
import Auth from '../../Services/Auth';
import Utility from '../../Services/Utility';
import styles from './styles';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const loginBg = './../../Assets/Images/auth/login-bg.png';
// 0.58.5 - rn version
// distributionUrl=https\://services.gradle.org/distributions/gradle-4.7-all.zip

class SelectorModalScreen extends React.Component {
  static navigationOptions = {
    title: 'Create a Circle',
  };

  constructor(props) {
    super(props);

    this.state = {
      uniqueCode: '',
      show: false,
      error: '',
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

  onSelectChange(key, value) {
    this.setState({[key]: value});
    if(value === 1 || value === 2) {
      this.showSelectDialog(value);
    }
  }

  showSelectDialog = index => {
    
  }

    handleChange = name => value => {
      this.setState({[name]: value});
      //this.props.addVerifyCode(value);
    }

    handleVerify = () => {
      this.props.getVerifyCode(this.props.auth.verifyCode);
    }

    handleAddMember = () => {
      const usertype = this.props.navigation.getParam('usertype');
      // get what to send to the server
      let form = {
        username: this.state.username,
        email: this.state.email,
        phone: this.state.phone,
        name: this.state.name,
      };
      form.usertype = usertype;
      this.getMemberUser(form);
    }

    getMemberUser = (form) => {
      const usertype = this.props.navigation.getParam('usertype');
      const key = this.props.navigation.getParam('key');
      if(usertype === 1 && !this.state.username) {
        alert('Please fill in required fields.');
        return;
      }
      if(usertype === 2 && (!this.state.name || !this.state.phone || !this.state.email)) {
        alert('Please fill in required fields.');
        return;
      }
      //this.props.clearSignup({error: true, message: 'Signing in...'});
      //this.props.setLoading(true);
      this.setState({error: 'Processing ...'});
      Auth.getMemberUser(form)
        .then( response => {
          //this.props.setLoading(false);
          console.log(response)
          this.setState({error: response.message});
            if(response && !response.error) {
              this.props.navigation.state.params.returnData(key, form.usertype, response.data);
              this.props.navigation.goBack();
                //this.props.navigation.navigate('App');
                //this.props.clearSignin(response);
            } else {
              //this.setState({error: ''});
              //this.props.clearSignin({error: true, message: 'Invalid email or password'});
            }
        } )
        .catch( error => {
          this.setState({error: ''});
          //this.props.setLoading(true);
          //this.props.clearSignin({error: true, message: 'Invalid email or password'});
          console.log(error);
        } )
      //this.props.handleSignin(this.state);
      // contentContainerStyle={styles.content}
    }
  
    render() {
      
      return (
        <Container style={styles.container}>
            <Content>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {this.props.auth.loading && <Spinner />}
            <Text style={{fontSize: 25, margin: 25}}>Provide user details</Text>
            <Text style={styles.errorText}>{Utility.isset(this.state.error)? this.state.error: ''}</Text>
            {this.props.navigation.getParam('usertype') === 1? <View style={{flex: 0, width: 300,}}>
            <Item regular>
              <Input  placeholder='Enter phone or email'
                onChangeText={this.handleChange('username')}
                value={this.state.username} />
            </Item>
            <Item underline={false} style={{borderBottomWidth: 0,}}>
                <Button rounded info style={{marginTop: 20,}}
                onPress={this.handleAddMember.bind(this)}
              ><Text>Submit</Text>
              </Button>
              <Button rounded danger style={{marginTop: 20, marginLeft: 20}}
                onPress={() => this.props.navigation.goBack()}
              ><Text>Close</Text>
              </Button></Item>
              </View>: <View style={{width: 300,}}>
                <Item fixedLabel style={{marginBottom: 10,}}>
                  <Label>Name</Label>
                  <Input outlined style={{color: '#5b696c',}}
                      onChangeText={this.handleChange('name')}
                      value={this.state.name}
                    />
                </Item>
                <Item fixedLabel style={{marginBottom: 10,}}>
                  <Label>Email</Label>
                  <Input outlined textContentType="emailAddress"  style={{color: '#5b696c',}}
                      onChangeText={this.handleChange('email')}
                      value={this.state.email}
                    />
                </Item>
                <Item fixedLabel style={{marginBottom: 10,}}>
                  <Label>Phone</Label>
                  <Input outlined textContentType="telephoneNumber" style={{color: '#5b696c',}}
                      onChangeText={this.handleChange('phone')}
                      value={this.state.phone}
                    />
                </Item>
                <Item style={{borderBottomWidth: 0,}}>
                <Button rounded info style={{marginTop: 20,}}
                onPress={this.handleAddMember.bind(this)}
              ><Text>Submit</Text>
              </Button>
              <Button rounded danger style={{marginTop: 20, marginLeft: 20}}
                onPress={() => this.props.navigation.goBack()}
              ><Text>Close</Text>
              </Button></Item>
              </View>}
            </View>
            </Content>
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
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectorModalScreen);

/*
handleSignin: form => {
      dispatch(authActions.handleSignin(form));
    },
    setLoading: form => {
      dispatch(authActions.setLoading(form));
    },
    addSignup: data => {
      dispatch(authActions.addSignup(data));
    },
    getVerifyCode: code => {
      dispatch(authActions.getVerifyCode(code));
    } */