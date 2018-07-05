
# react-native-mapbox-direction

## Getting started

`$ npm install react-native-mapbox-direction --save`

#### Or

`$ yarn add react-native-mapbox-direction`

## You need to install [react-native-mapbox-gl](https://github.com/mapbox/react-native-mapbox-gl) in your project first!

## Usage
```javascript
import { MapView } from 'react-native-mapbox-direction';

...

render() {

    ...


    <MapView 
        mapBoxApiKey={APIKEY}
        navigationMode="Course"
        startingPoint={{
            latitude: 48.857908, 
            longitude: 2.302661,
        }}
        endingPoint={{
            latitude: 48.858192, 
            longitude: 2.294981,
        }}
        color="green"
    />

    ...

}

```
  