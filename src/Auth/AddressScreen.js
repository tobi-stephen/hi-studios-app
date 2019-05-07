import React from 'react';
import { View, Button, Container, Content, Text, Item, Form, Input, Picker, Icon, Label, Grid, Col, DatePicker} from 'native-base';
import { StyleSheet, Image, ImageBackground, Dimensions, Alert} from 'react-native';
import Auth from '../Services/Auth';
import DateSelector from '../Components/Widgets/DateSelector/DateSelector';

const loginBg = './../Assets/Images/auth/login-bg.png';
const deviceWidth = Dimensions.get("window").width;

class AddressScreen extends React.Component {
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
      
      this.props.navigation.navigate('NextOfKin');
          
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
                    <Text style={styles.title}>Address</Text>
                    <Text style={styles.subtitle}>
                    We need a physical address to comply with security measures.  
                    </Text>
                  </View>
                  <Form style={styles.form}>
                    <Item style={styles.formItem}>
                        <Input placeholder="Street address" textContentType="fullStreetAddress" 
                        style={styles.input} value={this.state.street} 
                        onChangeText={this.onInputChange.bind(this, 'street')} />
                    </Item>
                    <Item style={styles.formItem}>
                      <Grid>
                        <Col>
                          
                            <Input placeholder="City" textContentType="addressCity" 
                              style={styles.inputLeft} value={this.state.city} 
                              onChangeText={this.onInputChange.bind(this, 'city')} />
                         
                        </Col>
                        <Col>
                        <Item style={styles.input}>
                            <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="State"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.state}
                            onValueChange={this.onSelectChange.bind(this, 'state')}
                            >
                            <Picker.Item label="State" value="" />
                            <Picker.Item label="Lagos" value="1" />
                            <Picker.Item label="Osun" value="Osun" />
                            </Picker>
                        </Item>
                        </Col>
                      </Grid>
                    </Item>
                    <Item style={styles.input}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Country"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.country}
                            onValueChange={this.onSelectChange.bind(this, 'country')}
                            >
                            <Picker.Item label="Country" value="" />
                            <Picker.Item label="Nigeria" value="1" />
                            <Picker.Item label="UK" value="2" />
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
    //marginBottom: 30,
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

export default AddressScreen;