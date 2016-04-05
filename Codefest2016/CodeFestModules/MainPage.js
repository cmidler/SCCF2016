var React = require('react-native');
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} = React;

var MapView = require('react-native-maps');

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 40.440624;
const LONGITUDE = -79.995888;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var MainPage = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  },

  onRegionChange(region) {
    this.setState({ region });
  },


  randomRegion() {
    var { region } = this.state;
    return {
      ...this.state.region,
      latitude: region.latitude + (Math.random() - 0.5) * region.latitudeDelta / 2,
      longitude: region.longitude + (Math.random() - 0.5) * region.longitudeDelta / 2,
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        </MapView>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

module.exports = MainPage;
