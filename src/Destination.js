// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

const styles = StyleSheet.create({
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
});

const Destination = ({coords}) => (
  <MapboxGL.PointAnnotation
    key="pointAnnotation"
    id="pointAnnotation"
    coordinate={[coords.longitude, coords.latitude]}
  >
    <View style={styles.annotationContainer}>
      <View style={styles.annotationFill} />
    </View>
    <MapboxGL.Callout title="Look! An annotation!" />
  </MapboxGL.PointAnnotation>
);

export default Destination;
