import React from 'react';
import { View, Button, Container, Content, Text, H1, Input, Form, Item, Picker, Icon, Header, Left, Title, Body, Right } from 'native-base';
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

class ChooseOrganizationScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <Header info>
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate.goBack()}
            >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Choose your organization</Title>
          </Body>
          <Right />
        </Header>
    )
  })

  constructor(props) {
    super(props);

    this.state = {
      uniqueCode: '',
      redirect: false,
      organizations: [],
      organization_code: '',
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
    this.getOrganizations();
    if(Utility.isset(this.props.signin)) {
      if(this.props.signin.error === false) {
        //this.props.navigation.navigate('App');
      } 
    }
  }

    handleChange (name, value) {
      this.setState({[name]: value});
      this.props.addVerifyCode(value);
      console.log(this.state, name, value)
    }

    handleVerify = () => {
      this.setState({redirect: true});
      this.props.getVerifyCode(this.state.organization_code);
    }

    getOrganizations = () => {
      this.setState({loading: true});
      Auth.getMemberOrgs(this.props.auth.access_token)
        
        .then( response => {
          console.log(response)
            if(response && !response.error) {
                this.setState({organizations: response.data})
            }
            this.setState({loading: false});
        } )
        .catch( error => {
          this.setState({loading: false});
          console.log(error)
        } )
      //this.props.handleSignin(this.state);
    }
  
    render() {
      if(this.state.redirect && this.props.auth.onboard.error === false) {
        this.props.navigation.navigate('Co6')
      }
      
      return (
        <Container style={styles.container}>
         <Header info>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Choose your organization</Title>
          </Body>
          <Right />
        </Header>
            
              <Content contentContainerStyle={styles.content}>
              
              <KeyboardAwareScrollView>
              <View style={styles.formView}>
                <Text style={styles.errorText}>{Utility.isset(this.props.auth.onboard)? this.props.auth.onboard.message: (this.props.auth.loading? 'Verifying ...': '')}</Text>
                {this.state.organizations? <Form style={styles.form}>
                  <Item style={styles.inputItem}>
                  <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: '100%' }}
                      placeholder="Your organization"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.organization_code}
                      onValueChange={this.handleChange.bind(this, 'organization_code')}
                      >
                    <Picker.Item label="Select" value="" />
                    {this.state.organizations.map( org => <Picker.Item key={org.id} label={org.name} value={org.uniqueCode} /> )}
                  </Picker>
                    
                  </Item>
                </Form>: <Text>No organization found!</Text>}
                <View style={styles.controls}>
                  <Button rounded style={styles.loginBtn} 
                    onPress={this.handleVerify.bind(this)}
                  ><Text style={styles.loginText}>Continue</Text></Button>
                </View>
                             
              </View>
              </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseOrganizationScreen);