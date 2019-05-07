import React from 'react';
import { View, Button, Container, Content, Text, Item, Form, Input, Picker, Icon, Label, Grid, Col, DatePicker} from 'native-base';
import { StyleSheet, Image, ImageBackground, Dimensions, Alert} from 'react-native';
import Auth from '../Services/Auth';
import DateSelector from '../Components/Widgets/DateSelector/DateSelector';

const loginBg = './../Assets/Images/auth/login-bg.png';
const deviceWidth = Dimensions.get("window").width;

class BiodataScreen extends React.Component {
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
      }

    }

    componentDidMount() {

    }

    onInputChange(key, value) {
      this.setState({
        [key]: value,
      });
    }

    onSelectChange(key, value) {
      this.setState({[key]: value});
    }

    signup = () => {
      
      this.props.navigation.navigate('Address');
          
    };
  
    render() {
      return (
        <Container style={styles.container}>
          <ImageBackground
              source={require(loginBg)}
              imageStyle={{resizeMode: 'stretch'}}
              style={styles.bgImage}
          >
              <Content contentContainerStyle={styles.content}>
                
                <View>
                  <View style={styles.wrapper}>
                    <Text style={styles.title}>About you</Text>
                    <Text style={styles.subtitle}>
                      Tell us a bit about you.
                    </Text>
                  </View>
                  <Form style={styles.form}>
                    <Item style={styles.formItem}>
                      <Grid>
                        <Col>
                          <Item style={styles.innerFormItem}>
                            <Input placeholder="Firstname" textContentType="givenName" 
                              style={styles.inputLeft} value={this.state.email} 
                              onChangeText={this.onInputChange.bind(this, 'firstname')} />
                          </Item>
                        </Col>
                        <Col>
                          <Item style={styles.innerFormItem}>
                            <Input placeholder="Surname" textContentType="familyName" 
                            style={styles.inputRight} value={this.state.email} 
                            onChangeText={this.onInputChange.bind(this, 'lastname')} />
                          </Item>
                        </Col>
                      </Grid>
                    </Item>
                    <Item style={{borderBottomWidth: 0}}>
                      <Text style={{color: '#777'}}>Date of birth</Text>
                    </Item>
                    <Item style={styles.formItem}>
                      <DateSelector />
                    </Item>
                    <Item style={styles.input}>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Gender"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.gender}
                          onValueChange={this.onSelectChange.bind(this, 'gender')}
                          >
                          <Picker.Item label="Gender" value="" />
                          <Picker.Item label="Male" value="Male" />
                          <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </Item>
                    <Item style={styles.input}>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Introduced by"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.introduced_by}
                          onValueChange={this.onSelectChange.bind(this, 'introduced_by')}
                          >
                          <Picker.Item label="Introduced by" value="" />
                          <Picker.Item label="Friend" value="Friend" />
                          <Picker.Item label="Member" value="Member" />
                        </Picker>
                    </Item>
                  </Form>
                </View>
                <View style={styles.footer}>
                  <View style={styles.footerItem}>
                    <Button fab style={styles.signupBtn} onPress={this.signup.bind(this)}>
                      <Text style={styles.signupText}>Next</Text>
                    </Button>
                  </View>
                </View>
              </Content>
          </ImageBackground>
      </Container>
      );
    }
  
    
  }

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    height: '100%',
    width: deviceWidth,
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
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingRight: 20,
  },
  footerItem: {
    //display: 'flex',
    //flexDirection: 'row',
    //justifyContent: 'flex-start',
  },
  signupBtn: {
    backgroundColor: '#64493c',
  },
  loginBtn: {
    backgroundColor: '#D2D2D2',
  },
  loginText: {
    color: '#64493c',
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
    marginTop: 40,
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
  innerFormItem: {
    borderStyle: 'solid',
    borderBottomWidth: 0,
    marginBottom: 0,
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
    borderColor: '#64493c',
    margin: 0,
    marginBottom: 30,
  },
  inputLeft: {
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: '#64493c',
    margin: 0,
    marginRight: 5,
  },
  inputRight: {
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: '#64493c',
    margin: 0,
    marginLeft: 5,
  },
  dobLabel: {
    borderBottomWidth: 0,
  },
  dobItem: {
    borderWidth: 0,
  },
  wrapper: {
    flex: 1,
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
  }
});

export default BiodataScreen;