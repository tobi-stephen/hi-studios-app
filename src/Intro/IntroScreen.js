import React from 'react';
import { StyleSheet, ImageBackground, Image, TouchableOpacity, View, Dimensions } from 'react-native';
import { Container, H1, Text, Content, Button, Right,  } from 'native-base';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const bgGradient = './../Assets/Images/bg-gradient.png';
const logo = './../Assets/Images/e-pub-logo.png';
const bursarText = './../Assets/Images/intro/Bursar.png';
const introScreenBg = './../Assets/Images/intro/intro-screen-bg.png';
const nextButton = './../Assets/Images/intro/next.png';
const screenIcon1 = './../Assets/Images/intro/intro-screen-icon1.png';
const screenIcon2 = './../Assets/Images/intro/intro-screen-icon2.png';
const screenIcon3 = './../Assets/Images/intro/intro-screen-icon3.png';
const introScreens = {
    0: {
        screenIcon: require('./../Assets/Images/intro/Bursar.png'),
        introText: '',
        index: 0,
    },
    1: {
        screenIcon: require('./../Assets/Images/intro/intro-screen-icon3.png'),
        introText: 'E- Public Safety, an app that automates the process of identifying, reporting and resolving public safety issues.',
        index: 1,
    },
    2: {
        screenIcon: require('./../Assets/Images/intro/intro-screen-icon3.png'),
        introText: 'E- Public Safety, an app that automates the process of identifying, reporting and resolving public safety issues.',
        index: 2,
    },
    3: {
        screenIcon: require('./../Assets/Images/intro/intro-screen-icon3.png'),
        introText: 'E- Public Safety, an app that automates the process of identifying, reporting and resolving public safety issues.',
        index: 3,
    }
}

class IntroScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            currentScreen: introScreens[0],
            timer: null,
        }
    }

    componentDidMount() {
        const self = this;
        this.setState({timer: setTimeout(function() {
            self.updateCurrentScreen();
        }, 3000)});
    }

    componentWillUnmount() {
        this.setState({timer: clearTimeout(this.state.timer)});
    }

    updateCurrentScreen() {
        const index = this.state.currentScreen.index + 1;
        const nextIndex = index % Object.keys(introScreens).length;
        console.log(index, this.state.currentScreen.screenIcon)

        this.setState({currentScreen: introScreens[nextIndex]});
        console.log(this.state)
    }

    render() {
        const currentScreen = this.state.currentScreen;
        const {screenIcon, introText, index} = currentScreen;
        if(index === 0) {
            return ( 
                <Container style={styles.container1}>
                        <Content contentContainerStyle={styles.content}>
                            <Text>E-Pub Safety</Text>
                            <Image source={require(logo)} style={styles.handLogo} />
                            <TouchableOpacity 
                                onPress1={this.updateCurrentScreen.bind(this)} source={require(nextButton)}
                                onPress={() => this.props.navigation.navigate('SignIn')}>
                                <Image source={require(nextButton)} />
                            </TouchableOpacity>
                        </Content>

                </Container>
            )
        } else {
            return ( 
                <Container style={styles.container}>
                    <ImageBackground
                        source={require(introScreenBg)}
                        imageStyle={{resizeMode: 'stretch'}}
                        style={styles.bgImage}
                    >
                        <Content contentContainerStyle={styles.content}>
                            <View style={{ width: '50%' }}>
                                <Image source={screenIcon} style={styles.screenIcon}/>
                            </View>
                            <View style={{ width: '90%', padding: 20 }}>
                                <Text style={styles.introText}>{introText}</Text>
                            </View>
                            <View style={styles.footer}>
                                <TouchableOpacity onPress={this.updateCurrentScreen.bind(this)}>
                                    <Image onPress={this.updateCurrentScreen.bind(this)} source={require(nextButton)} />
                                </TouchableOpacity>
                                <Button transparent primary 
                                onPress={() => this.props.navigation.navigate('SignIn')}
                                style={styles.skip}>
                                    <Text>Skip</Text>
                                </Button>
                            </View>
                            
                        </Content>
                    </ImageBackground>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        flex: 1,
        backgroundColor: '#5b696c',
    },  
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: deviceHeight * 0.9,
    },
    bgImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    screenIcon: {
        width: '100%',
        //height: '100%',
    },
    introText: {
        fontSize: 16,
        lineHeight: 28,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        paddingBottom: 60,
    },
    skip: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 0,
        margin: 0,
    }
})
export default IntroScreen;