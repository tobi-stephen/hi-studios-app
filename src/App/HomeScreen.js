import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  H6,
  View,
} from "native-base";
import { StyleSheet, Image } from 'react-native';
import authActions from '../redux/auth/actions';

const bursarImg = './../Assets/Images/Bursar.png';

class HomeScreen extends React.Component {
    static navigationOptions01 = {
      //title: 'Welcome to the app!',
      drawerLabel: 'Home',
      drawerIcon: () => (
        <Image
          source={require(bursarImg)}
          style={[styles.icon]}
        />
      ),
    };
  
    render() {
      return (
        <Container>
        <Header info>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Security Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <View style={styles.content}>
          <Button
            full
            rounded
            primary
            large
            style={{ marginTop: 20, marginHorizontal: '10%', }}
            onPress={() => this.props.navigation.navigate('MyLocation')}
          >
            <Text>My Location</Text>
          </Button>
          <Button
            full
            rounded
            info
            large
            style={{ marginTop: 20, marginHorizontal: '10%', }}
            onPress={() => this.props.navigation.navigate('MyCircles')}
          >
            <Text>Circle of Six</Text>
          </Button>
          <Button
            full
            rounded
            success
            large
            style={{ marginTop: 20, marginHorizontal: '10%', }}
            onPress={() => alert("Notifications will be available shortly!")}
          >
            <Text>Notifications</Text>
          </Button>
          </View>
        </Content>
      </Container>
      );
    }
  
    _showMoreApp = () => {
      this.props.navigation.navigate('Other');
    };
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActions.signin({}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    flexGrow: 1,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
  