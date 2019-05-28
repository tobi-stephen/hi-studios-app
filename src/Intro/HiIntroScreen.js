import { Image, Dimensions } from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';
const {height, width } = Dimensions.get('window')

const OnboardComponent = (props) => (
  <Onboarding
    onDone={() => props.navigation.navigate('AuthLink')}
    onSkip={() => props.navigation.navigate('AuthLink')}
    pages={[
      {
        backgroundColor: '#000',
        image: <Image source={require('../Assets/hi-studio/logo.png')} />,
        title: 'Live TV',
        subtitle: "First Full HD Television in Nigeria and It's Free to air",
      },
      {
        backgroundColor: '#000',
        image: <Image style={{width: width, height: height / 3}} source={require('../Assets/hi-studio/slider3.jpg')} />,
        title: 'Available on Eutelsat 7',
        subtitle: "Nigeria's First Full HD Television Statiion Can Now Also Be Viewed on Eutelsat Platform",
      },
      {
        backgroundColor: '#000',
        image: <Image style={{width: width, height: height / 3}} source={require('../Assets/hi-studio/slider5.jpg')} />,
        title: 'Premium Family Content',
        subtitle: "Watch It FREE",
      },
    ]}
  />
);



class IntroScreen extends React.Component {
    
    componentDidMount(){
        
    }

    render () {
        const { navigation } = this.props
        return (
            <OnboardComponent navigation={navigation}/>
        )
    }
}

export default IntroScreen;