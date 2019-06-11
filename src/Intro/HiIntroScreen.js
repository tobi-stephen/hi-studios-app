import { Text, Image, ImageBackground, Dimensions, StatusBar } from 'react-native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';

import Onboarding from 'react-native-onboarding-swiper';
const {height, width } = Dimensions.get('window')

const OnboardComponent = (props) => (
  <Onboarding
    onDone={() => props.navigation.navigate('AuthLink')}
	onSkip={() => props.navigation.navigate('AuthLink')}
	titleStyles={{fontSize: 40, fontWeight: 'bold'}}
	subTitleStyles={{fontSize: 25, margin: 20, color: "#fff"}}
    pages={[
	//   {
    //     backgroundColor: '#000',
    //     image: <ImageBackground resizeMode={'contain'} style={{width: "100%", height: "100%"}} source={require('../Assets/wet/2.png')} >
	// 		<Text style={{color: "red", fontSize: 50}}>HELLO</Text>
	// 		</ImageBackground>,
    //     title: 'Live TV',
	// 	subtitle: "First Full HD Television in Nigeria",
	// 	titleStyles: { color: 'red' },

	//   },
	  {
        backgroundColor: '#000',
        image: <Image resizeMode={'contain'}  source={require('../Assets/wet/logo.png')} />,
        title: 'Live TV',
		subtitle: "First Full HD Television in Nigeria",
		titleStyles: { color: 'red' },

	  },
      {
        backgroundColor: '#000',
        image: <Image style={{width: width, height: height / 3}} resizeMode={'contain'} source={require('../Assets/wet/3.png')} />,
        title: 'Premium Family Content',
		subtitle: "Watch Free",
		titleStyles: { color: '#6c00a2' },
      },
      {
        backgroundColor: '#000',
        image: <Image style={{width: width, height: height / 3}} resizeMode={'contain'} source={require('../Assets/wet/4.png')} />,
        title: 'Available on Eutelsat7',
		subtitle: "Nigeria's First Full HD Televisions Also on Eutelsat Platform",
		titleStyles: { color: 'yellow' },
      },
    ]}
  />
);



class IntroScreen extends React.Component {
	
	constructor() {
		super()
		StatusBar.setBackgroundColor('black')
	}
    componentDidMount(){
		SplashScreen.hide();
    }

    render () {
        const { navigation } = this.props
        return (
	        <OnboardComponent navigation={navigation}/>
        )
    }
}

export default IntroScreen;