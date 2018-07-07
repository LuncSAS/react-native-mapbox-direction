
# react-native-mapbox-direction

## Getting started

`$ npm install react-native-mapbox-direction --save`

#### Or

`$ yarn add react-native-mapbox-direction`

## You need to install [react-native-mapbox-gl](https://github.com/mapbox/react-native-mapbox-gl) in your project first!

## Props

| Name | Type | Required | Description |
| :---         |     :---:      |     :---:      | :---         |
| mapBoxApiKey      | string     | Yes    | Your Mapbox API key                                       |
| ref               | function   | No     | MapView Reference                                         |
| startingPoint     | object     | Yes    | An object containing departure's latitude and longitude   |
| endingPoint       | object     | Yes    | An object containing destination's latitude and longitude |
| color             | string     | Yes    | Direction's color                                         |
| onDirectionChange | function   | No     | Return an object with distance and duration               |

## Usage
```javascript
import { MapView } from 'react-native-mapbox-direction';

    ...

    // Zoom out to display starting point and ending point if in Global mode
    // Follow your current location if in Course mode
    moveCamera = () => {
        this.mapRef.moveCamera(); 
    }

    ...

    render() {

        ...

        <MapView 
            mapBoxApiKey={APIKEY}
            navigationMode="Course" // Or "Global"
            ref={instance => this.mapRef = instance}
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

    ...

}

```

## TODO

- [x] Display direction on map
- [x] Change camera modes "Course" or "Global"
- [ ] Add possibility to add an array of points between starting and ending points
- [ ] Remove route parts when moving in realtime


[daavidaviid](https://github.com/daavidaviid)
  