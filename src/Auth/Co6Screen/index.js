import React from 'react';
import { View, Button, Container, Content, Text, H1, 
  Input, Form, Item, Label, Picker, List, ListItem, Icon, Left, Right, Body, Header, Title } from 'native-base';
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

class Co6Screen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header transparent>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon name="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Create a Circle</Title>
        </Body>
        <Right />
      </Header>
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      uniqueCode: '',
      co6s: [],
      rules: [],
      members: {},
    }    
  }

 

  static getDerivedStateFromProps(props) {
    //console.log(props);

    return props;
  }

  componentDidMount() {
    //console.log(this.props.signin)
    if(Utility.isset(this.props.signin)) {
      if(this.props.signin.error === false) {
        this.props.navigation.navigate('App');
      } 
    }

    const co6_arr = this.props.auth.onboard.data;
    console.log(this.props.auth);
    const co6s = Utility.isset(co6_arr)? co6_arr.filter( co6 => co6.rules_count === 6 ): [];
    this.setState({
      co6s: co6s,
    });
    
  }

  returnData = (key, usertype, data) => {
    const members = this.state.members;
    const co6_relation_rule_id = this.state['rule_id_' + key.split('_')[1]];

    this.setState({members: {...members, [key]: {...data, usertype, co6_relation_rule_id}}});
  }

  onSelectChange(key, value) {
    this.setState({[key]: value});
console.log('username: ', value)
    this.props.navigation.navigate('SelectorModal', {usertype: +value, key, returnData: this.returnData.bind(this)});
  }

  onCo6Change(key, value) {
    this.setState({[key]: value});
    if(value === 1 || value === 2) {
      this.showSelectDialog(value);
    }

    const selectedCo6 = this.state.co6s.find(item => item.id === value);
    if(selectedCo6.relation_rules.length > 0) {
      this.setState({rules: selectedCo6.relation_rules});
      selectedCo6.relation_rules.map( rule => {
        this.setState({['rule_id_' + rule.id]: rule.id});
      })
    }
    //console.log(selectedCo6, this.state.co6s)
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

    countMember = members => {
      let count = 0;
      for(let i in members) {
        ++count;
      }
      return count;
    }

    returnMembers = members => {
      let m = [];
      for(let i in members) {
        m.push(members[i]);
      }
      return m;
    }

    handleSubmit = () => {
      if(!this.state.name) {
        //alert('Give your new circle a name');
        //return;
      } 
      if(this.countMember(this.state.members) < 6) {
        //alert('Add at least 6 members to your circle.');
        //return;
      }
      //this.props.clearSignin({error: true, message: 'Creating your circle ...'});
      let form = {};
      const members = this.returnMembers(this.state.members);
      form.co6_id = this.state.co6;
      form.user_id = this.props.auth.signup.data? this.props.auth.signup.data.id: '';
      form.name = this.state.name;
      form.members = members;
      Auth.createCo6(form)
        .then( response => {
          console.log(response)
            if(response && !response.error) {
                this.props.navigation.navigate('App');
                //this.props.clearSignin(response);
            } else {
              alert(response.message);
              this.setState({error: response.message});
              //this.props.clearSignin({error: true, message: 'Invalid email or password'});
            }
        } )
        .catch( error => {
          //this.props.clearSignin({error: true, message: 'Invalid email or password'});
          alert(error.message)
          this.setState({error: error.message});
          console.log(error)
        } )
      //this.props.handleSignin(this.state);
    }
  
    render() {
      if(this.props.auth.onboard.error === false) {
        //this.props.navigation.navigate('Signup')
      }
      console.log(this.state.co6s)
      return (
        <Container style={styles.container}>
            <KeyboardAwareScrollView>
              <Content contentContainerStyle={styles.content}>
              <View style={styles.formView}>
                <Text style={styles.errorText}>{Utility.isset(this.state.error)? this.state.error: ''}</Text>
                <List>
                  <ListItem itemDivider>
                    <Label>Select type of circle</Label>
                  </ListItem>
                  <ListItem>
                    <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: '100%' }}
                          placeholder="Circle of Six"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.co6}
                          onValueChange={this.onCo6Change.bind(this, 'co6')}
                          >
                        {
                          this.state.co6s.map( item => <Picker.Item key={item.id} label={item.name} value={item.id} /> )
                        }
                      </Picker>
                  </ListItem>
                </List>
                {this.state.rules.length > 0?
                <Form style={styles.form}>
                  <Item regular>
                    <Input outlined placeholder="Your circle name"
                      onChangeText={this.handleChange('name')}
                      value={this.state.name}
                    />
                  </Item>
                  <ListItem itemHeader>
                    <Text>Specify members of your circle</Text>
                  </ListItem>
                  {
                    this.state.rules.map( (rule, i) => <View key={rule.id} style={styles.memberPicker}><Item fixedLabel style={styles.itemPicker}>
                    <Label>{rule.relation.name}</Label>
                      <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: '50%' }}
                          placeholder="State"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state['rule_' + rule.id ]}
                          onValueChange={this.onSelectChange.bind(this, 'rule_' + rule.id)}
                          >
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Member" value="1" />
                        <Picker.Item label="Guest" value="2" />
                      </Picker>
                      
                  </Item>
                  {Utility.isset(this.state.members['rule_' + rule.id])? <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
            <Text>{Utility.isset(this.state.members['rule_' + rule.id])? (this.state.members['rule_' + rule.id].email? this.state.members['rule_' + rule.id].email: this.state.members['rule_' + rule.id].phone): ''}</Text>
            </Body>
            <Right>
              <Icon name='checkmark-circle' />
            </Right>
                  </ListItem>: <Text></Text>}</View>)
                  }
                </Form>: <Text>No rules defined</Text>
                }
                <View style={styles.controls}>
                  <Button rounded style={styles.loginBtn} 
                    onPress={this.handleSubmit.bind(this)}
                  ><Text style={styles.loginText}>Create</Text></Button>
                </View>
                             
              </View>
              
              </Content>
              </KeyboardAwareScrollView>
         
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
    setLoading: form => {
      dispatch(authActions.setLoading(form));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Co6Screen);

/* 
<Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="ion-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>My Location</Title>
          </Body>
          <Right />
        </Header>
*/