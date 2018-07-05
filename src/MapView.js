// @flow
import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';

import MapboxGL from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox';

import { multiLineString, lineString } from '@turf/helpers';
import distance from '@turf/distance';
const turfPoint = require('turf-point');

import Destination from "./Destination";
import Route from "./Route";

type NavigationMode = 'Course' | 'Global';

type Location = {
	latitude: number,
  longitude: number,
};

type MapViewProps = {
	mapBoxApiKey: string,
  navigationMode: NavigationMode,
  startingPoint: Location,
  endingPoint: Location,
  color: string
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

class MapView extends Component<MapViewProps> {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    MapboxGL.setAccessToken(this.props.mapBoxApiKey);
    this.mapboxClient = new MapboxClient(this.props.mapBoxApiKey);
    this.downloadRoute();
  }

  renderDestination(): React$Element<*> {
    const { endingPoint } = this.props;

    return(
      <Destination
        lat={parseFloat(company.geoloc.lat)}
        lng={parseFloat(company.geoloc.lng)}
      />
    );
  }

  downloadRoute = async () => {
    const { startingPoint, endingPoint } = this.props;

    try {
      const res = await this.mapboxClient.getDirections(
        [
          {
            latitude: startingPoint.latitude,
            longitude: startingPoint.longitude,
          },
          {
            latitude: endingPoint.latitude,
            longitude: endingPoint.longitude,
          },
        ],
        { profile: "driving", geometry: "polyline6", steps: true },
      );
      const routeData = res.entity.routes[0];

      const steps = routeData.legs[0].steps.map( step => step.geometry.coordinates);

      this.setState({
        globalRoute: lineString(routeData.geometry.coordinates),
        detailedRoute: multiLineString(steps),
        duration: routeData.duration,
        distance: routeData.distance,
        loadingOver: true,
      });
      return Promise.resolve(true);

    } catch (err) {
      console.warn({err});
    }
  };

  setMapRef = (ref) => { this.mapRef = ref; };
  
  moveCamera = (coords) => () => {
    const { navigationMode, startingPoint, endingPoint } = this.props;

    if (navigationMode === 'Course') {
      mapRef.setCamera({
        stops: [
          { centerCoordinate: [coords.longitude, coords.latitude], duration: 100 },
          { zoom: 17, duration: 100 },
          { pitch: 45, duration: 100 },
          { heading: coords.heading, duration: 100 },
        ],
      });
    }
    else {
      mapRef.fitBounds(
        [Math.max(startingPoint.longitude, endingPoint.longitude), Math.max(startingPoint.latitude, endingPoint.latitude)],
        [Math.min(startingPoint.longitude, endingPoint.longitude), Math.min(startingPoint.latitude, endingPoint.latitude)],
        40,
        300,
      );
    }
  };

  onUserLocationUpdate = (currLoc) => {
    console.log({currLoc});
    
    this.moveCamera(currLoc.coords);
  };

  render(): React$Element<*> {
    const { navigationMode, endingPoint, color } = this.props;
    const { detailedRoute, globalRoute, loadingOver } = this.state;

    const mode = navigationMode === 'Course' ?
      MapboxGL.UserTrackingModes.FollowWithCourse :
      MapboxGL.UserTrackingModes.Follow;

    const route = navigationMode === 'Course' ?
      detailedRoute :
      globalRoute;

    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          ref={this.setMapRef}
          logoEnabled={false}
          userTrackingMode={mode}
          style={styles.container}
          onUserLocationUpdate={this.onUserLocationUpdate}
          showUserLocation
        >
          {
            loadingOver &&
            <Route route={route} lineColor={color} />
          }
          <Destination coords={endingPoint}/>
        </MapboxGL.MapView>
      </View>
    );
  }
}

export default MapView;
