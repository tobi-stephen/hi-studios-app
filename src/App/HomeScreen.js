import React from 'react';
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
} from "native-base";
import { StyleSheet, Image } from 'react-native';

const bursarImg = './../Assets/Images/Bursar.png';

class HomeScreen extends React.Component {
    static navigationOptions = {
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
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Welcome!</Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 10 }}
            onPress={() => alert("Creating Circle of Six is in the works!")}
          >
            <Text>Create Circle of Six</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => alert("Geo fencing info coming shortly!")}
          >
            <Text>My Geo Fences</Text>
          </Button>
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

export default HomeScreen;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
  