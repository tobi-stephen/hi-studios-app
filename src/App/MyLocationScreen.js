import React from 'react';
import { connect } from 'react-redux';
import MapViewCard from './../Components/Widgets/MapViewCard';
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
  List,
  ListItem,
  Grid,
  Col,
} from "native-base";
import { StyleSheet, PermissionsAndroid, Alert, Platform, Image, Dimensions, View } from 'react-native';
import authActions from '../redux/auth/actions';
import RNLocation from 'react-native-location';
import Geolocation from 'react-native-geolocation-service';
import GeoFencing from 'react-native-geo-fencing';
import MapView, { Polygon, Marker, ProviderPropType } from 'react-native-maps';

const bursarImg = './../Assets/Images/Bursar.png';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

class MyLocationScreen extends React.Component {
    /*static navigationOptions = {
      //title: 'Welcome to the app!',
      drawerLabel: 'My Location',
      drawerIcon: () => (
        <Image
          source={require(bursarImg)}
          style={[styles.icon]}
        />
      ),
    };*/
    static navigationOptions = ({ navigation }) => ({
        header: (
          <Header transparent>
            <Left>
              <Button transparent onPress={() => navigation.navigate('Home')}>
                <Icon name="ios-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>My Location</Title>
            </Body>
            <Right />
          </Header>
        )
      });

    constructor(props) {
        super(props);

        this.state={
            latitude : 0,
            longitude : 0,
            error : null,
            geofence: false,
            track: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            coordinate: {
                latitude: 6.465422, longitude: 3.406448
            },
            polygon: [
            ],
            coordinates: [
            ]
        }

        this.watchLocation = this.watchLocation.bind(this);
    }

    
    watchLocation () {
RNLocation.configure({
  distanceFilter: 5.0
})


RNLocation.requestPermission({
  ios: "whenInUse",
  android: {
    detail: "coarse"
  }
}).then(granted => {
    if (granted) {
      this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
        /* Example location returned
        {
          speed: -1,
          longitude: -0.1337,
          latitude: 51.50998,
          accuracy: 5,
          heading: -1,
          altitude: 0,
          altitudeAccuracy: -1
          floor: 0
          timestamp: 1446007304457.029
        }
        */
       this.setState({locations, longitude: locations.longitude, latitude: locations.latitude})
      })
    }
  })
}

    async componentDidMount1() {
 
        if(Platform.OS === 'android')
        {
     
        await request_device_location_runtime_permission();
     
        }
     
        this.getLongLat = navigator.geolocation.watchPosition(
          (position) => {
              console.log(position)
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 2000, maximumAge: 100, distanceFilter: 10 },
        );
      }
     
      componentWillUnmount1() {     
        navigator.geolocation.clearWatch(this.getLongLat);    
      }

      async componentDidMount() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Query Location',
                    message: 'Query a location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.watchId = Geolocation.watchPosition(
                    (position) => {
                        let track = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }

                        let point = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        let coordinate = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }

                        this.setState({ track, coordinate, point, longitude: position.coords.longitude, latitude: position.coords.latitude })

                        
                    },
                    (error) => this.setState({ error: error.message }),
                    { enableHighAccuracy: true, interval: 10000, fastestInterval: 5000, distanceFilter: 1, },
                )
            } else {
                alert("denied")
            }

        } catch (err) {
            alert(err.message)
        }
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchId);
    }
  
    render() {
      return (
      <View styles={styles.container}>
      <MapView
          provider={this.props.provider}
          style={styles.map}
          region={this.state.track}
          showsMyLocationButton={true}
          onPress={(e) => {
              let position = e.nativeEvent.coordinate
              let point = {
                  lat: position.latitude,
                  lng: position.longitude
              };
              this.setState({point, coordinate: e.nativeEvent.coordinate})
          }}
      >
          <Marker
              coordinate={this.state.coordinate}
              pinColor={randomColor()}
              title={'user0'}
          />
      </MapView>
      <View style={{ ...styles.buttonContainer, }}>
      <Header transparent>
      <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>My Location</Title>
          </Body>
          <Right />
      </Header>
      <List>
            <ListItem itemDivider style={{justifyContent: 'center'}}>
              <Button>
                  <Icon name="bulb" />
              </Button>
              <Button 
                onPress={async () => this.watchLocation()}
                info>
                  <Icon name="refresh" />
              </Button>
            </ListItem>
            </List>
      </View>


  </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyLocationScreen);

const styles = StyleSheet.create({
  container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  map: {
      ...StyleSheet.absoluteFillObject,
      height: height
  },
  mapView: {
      borderBottomColor: 'red',
      borderRadius: 50,
  },
  bubble: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20,
  },
  latlng: {
      width: 200,
      alignItems: 'stretch',
  },
  button: {
      // width: 80,
      color: 'red',
      paddingHorizontal: 12,
      alignItems: 'center',
      marginHorizontal: 10,
  },
  buttonContainer: {
      flexDirection: 'column',
      // justifyContent: 'flex-end',

      marginVertical: 20,
      backgroundColor: 'transparent',

  },
  icon: {
    width: 24,
    height: 24,
  },
});

export async function request_device_location_runtime_permission() {
 
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'E-Public Safety Location Permission',
          'message': 'E-Public Safety App needs access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
   
        Alert.alert("Location Permission Granted.");
      }
      else {
   
        Alert.alert("Location Permission Not Granted");
   
      }
    } catch (err) {
      console.warn(err)
    }
  }

 export function getRegionForCoordinates(points) {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;
  
    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);
  
    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });
  
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }

 function regionFrom(lat, lon, distance) {
    distance = distance/2
    const circumference = 40075
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000
    const angularDistance = distance/circumference

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
    const longitudeDelta = Math.abs(Math.atan2(
            Math.sin(angularDistance)*Math.cos(lat),
            Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

    const result = {
        latitude: lat,
        longitude: lon,
        latitudeDelta,
        longitudeDelta,
    };

    console.log(result);
    return result;
}


  