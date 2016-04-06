var React = require('react-native');
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Alert,  
} = React;

var MapView = require('react-native-maps');
var NavBar = require('./NavBar')
var { width, height } = Dimensions.get('window');
var Button = require('react-native-button');
var greenDot = require('../circle-green/ios/Icon-12@2x.png');
var yellowDot = require('../circle-yellow/ios/Icon-12@2x.png');
var redDot = require('../circle-red/ios/Icon-12@2x.png');
var MapCallout = require('./MapCallout');

const ASPECT_RATIO = width / height;
const LATITUDE = 40.440624;
const LONGITUDE = -79.995888;
const LATITUDE_DELTA = 0.0025;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var MainPage = React.createClass({

  componentWillMount(){
    this._loadTrashCans();
  },

  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      trashCans:[],
    };
  },

  onRegionChange(region) {
    if (this.isMounted()) {
      this.setState({ region });
    }
  },

  _okClicked (marker){
    console.log('OK clicked for ' + marker.id);
    this.refs[marker.id].hideCallout();
  },

  _pickupClicked (marker){
    console.log('Pickup clicked for ' + marker.id);
    this.refs[marker.id].hideCallout()
  },

  _emergencyClicked (marker){
    console.log('Emergency clicked for ' + marker.id);
    this.refs[marker.id].hideCallout()
  },

  //get all trash cans and parse into lat lons
  async _loadTrashCans() {
      return fetch('http://128.237.221.45:8000/listcans')
        .then((response) => response.json())
        .then((json) => {

          this.setState({trashCans:json.result});
          console.log("TrashCans are: \n");
          console.log(trashCans);
          return json.result;
      })
      .catch((error) => {
        return [];
      });
  },

  getDot(marker){
    if (marker.state == 0)
      return greenDot;
    else if (marker.state ==1)
      return yellowDot;
    else
      return redDot;
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
        {this.state.trashCans.map(marker => (
            <MapView.Marker
              ref={marker.id}
              coordinate={{latitude:marker.lat, longitude:marker.lon}}
              key = {marker.id}
              onSelect={()=>this.refs[marker.id].showCallout()}
              image = {this.getDot(marker)}
              calloutOffset={{ x: 0, y: 28 }}
              calloutAnchor={{ x: 0, y: 0.4 }}>
              

              <MapView.Callout tooltip>
                <View style={styles.bubbleContainer}>
                  <View style={styles.bubble}>
                      <Text style={styles.bubbleTitleText}>Can # {marker.id}</Text>
                      <Button
                        style={styles.okButton}
                        onPress={()=>this._okClicked(marker)}
                      >
                        Ok
                      </Button>
                      <Button
                        style={styles.pickButton}
                        onPress={()=>this._pickupClicked(marker)}
                      >
                        Pick-up
                      </Button>  
                      <Button
                        style={styles.emergencyButton}
                        onPress={()=>this._emergencyClicked(marker)}
                      >
                        Emergency
                      </Button>          
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  mainContainer: {
      flex: 1
  },
  container: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'row'
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  bubbleContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  map: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  bubbleTitleText:{
    color: '#000000',
    alignSelf: 'center',
    fontSize: 20,
  },
  okButton: {
    width: 120,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#00ff00',
    borderColor: '#000000',
    borderRadius: 7.5,
    borderWidth: 2.5,
    overflow: 'hidden',
    color:'#000000',
  },
  pickButton: {
    width: 120,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#FFFF00',
    borderColor: '#000000',
    borderRadius: 7.5,
    borderWidth: 2.5,
    overflow: 'hidden',
    color:'#000000',
  },
  emergencyButton: {
    width: 120,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#FF0000',
    borderColor: '#000000',
    borderRadius: 7.5,
    borderWidth: 2.5,
    overflow: 'hidden',
    color:'#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  bubble: {
    width: 140,
    //flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#000000',
    borderWidth: 0.5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#000000',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = MainPage;
