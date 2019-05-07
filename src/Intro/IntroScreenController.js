import React from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import { Container, H1, Text, Content, Button } from 'native-base';
import BackgroundImage from '../Components/BackgroundImage';

const bgGradient = './../Assets/Images/bg-gradient.png';
const logo = './../Assets/Images/e-pub-logo.png';
const bursarText = './../Assets/Images/intro/Bursar.png';

class IntroScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    render() {
        return ( 
            <Container style={styles.container}>
                
                    <Content contentContainerStyle={styles.content}>
                        <Text>E-Pub Safety</Text>                       
                        <Image source={require(logo)} style={styles.logo} />
                    </Content>
               
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    }
})
export default IntroScreen;