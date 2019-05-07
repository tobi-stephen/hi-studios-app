import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  View,
  H4,
} from "native-base";
const routes = [
    { label: "Profile", icon: 'md-calendar'}, 
    { label: "My Location", icon: 'ios-recording'},
    { label: "Circle of Six", icon: 'ios-notifications'},
    //{ label: "Gallery", icon: 'ios-cloud-outline'},
    { label: "Find a member", icon: 'paper'},
    { label: "Help", icon: 'paper'},
];
const bursarImg = './../Assets/Images/bursar-white.png';

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <View
            style={{
              height: 100,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute",
              backgroundColor: "#5b696c",
            }}
          />
          <Text style={{color: 'white', fontSize: 20, display: 'flex', margin: 20, textAlign: 'center'}}>E-Public Safety</Text>
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 100 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.label)}
                >
                    <Icon active name={data.icon} />
                    <Text style={{marginLeft: 12,}}>{data.label}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}