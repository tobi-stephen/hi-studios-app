import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default ({long, lat, points}) => (
  
   <View style={styles.container}>
     {console.log(points)}
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: points.latitude,
         longitude: points.longitude,
         latitudeDelta: points.latitudeDelta,
         longitudeDelta: points.longitudeDelta,
       }}
     >
     </MapView>
   </View>
);
