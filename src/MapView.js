// @flow
import React, { Component } from "react";
import autobind from "autobind-decorator";
import {StyleSheet, View} from "react-native";

import MapboxGL from "@mapbox/react-native-mapbox-gl";
import { multiLineString, lineString } from "@turf/helpers";
import distance from "@turf/distance";
const turfPoint = require("turf-point");

import Destination from "./Destination";
import Route from "./Route";
import CirclePicture from "./CirclePicture";

type NavigationMode = 'Course' | 'Global';

type Location = {
	latitude: number,
  longitude: number,
};

type MapViewProps = {
	mapBoxApiKey: string,
  // navigationMode: NavigationMode,
  // startingPoint: Location,
  // endingPoint: Location,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

class MapView extends Component<MapViewProps> {
	static defaultProps = {
		mapBoxApiKey: 'pk.eyJ1IjoicnhtYXQiLCJhIjoiY2poNmE1eXlwMDBwdTJ3cGc4N2ZuNDZxZiJ9.1ub1EU5Zq4LY5mz0_hywyA',
	};

  componentDidMount() {
    MapboxGL.setAccessToken(this.props.mapBoxApiKey);
  }

  // renderRoute(): React$Element<*> {
  //   const { navigationMode } = this.props;
  //   const { detailedRoute, globalRoute } = this.state;

  //   const route = navigationMode === 'Course' ? detailedRoute : globalRoute;

  //   return <Route route={route} />;
  // }

  // renderDestination(): React$Element<*> {
  //   const { company, loading } = this.props;

  //   return(
  //     <Destination
  //       lat={parseFloat(company.geoloc.lat)}
  //       lng={parseFloat(company.geoloc.lng)}
  //     />
  //   );
  // }

  setMapRef = (ref) => { this.mapRef = ref; };
  
  // moveCamera = (mapRef) => () => {
  //   const { company, store } = this.props;
  //   const { heading, lat, lng } = store;

  //   const latCompany = parseFloat(company.geoloc.lat);
  //   const lngCompany = parseFloat(company.geoloc.lng);

  //   const isNavigating = this.props.store.currentNavigation === this.key;
  //   if (isNavigating) {
  //     mapRef.setCamera({
  //       stops: [
  //         // { centerCoordinate: [lng, lat], duration: 100 },
  //         { zoom: 17, duration: 100 },
  //         { pitch: 45, duration: 100 },
  //         { heading, duration: 100 },
  //       ],
  //     });
  //   }
  //   else {
  //     mapRef.fitBounds(
  //       [Math.max(lng, lngCompany), Math.max(lat, latCompany)],
  //       [Math.min(lng, lngCompany), Math.min(lat, latCompany)],
  //       40,
  //       300,
  //     );
  //   }
  // };

  render(): React$Element<*> {
    const { navigationMode } = this.props;

    const mode = navigationMode === 'Course' ?
      MapboxGL.UserTrackingModes.FollowWithCourse :
      MapboxGL.UserTrackingModes.Follow;

    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          ref={this.setMapRef}
          logoEnabled={false}
          userTrackingMode={mode}
          style={styles.container}
          showUserLocation
        >

        </MapboxGL.MapView>
      </View>
    );
  }
}

export default MapView;
