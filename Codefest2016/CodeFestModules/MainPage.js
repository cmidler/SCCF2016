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
// var NavBar = require('./NavBar');
var NavigationBar = require('./react-native-navbar');
var TrashPandaListView = require('./ItemListView');

var { width, height } = Dimensions.get('window');

var greenDot = require('../circle-green/ios/Icon-12@2x.png');
var yellowDot = require('../circle-yellow/ios/Icon-12@2x.png');
var redDot = require('../circle-red/ios/Icon-12@2x.png');

const ASPECT_RATIO = width / height;
const LATITUDE = 40.440624;
const LONGITUDE = -79.995888;
const LATITUDE_DELTA = 0.025;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import LogoutIcon from '../components/Logout';
import SearchIcon from '../components/Search';
import ScanIcon from '../components/Scan';
import ListInactiveIcon from '../components/List';
import MapInactiveIcon from '../components/Map';

var MainPage = React.createClass({
  navigateItemListView: function(){
   this.props.navigator.push({
     title: 'Item List View',
     component: TrashPandaListView,
     navigationBarHidden: true,
   })
 },
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


  //get all trash cans and parse into lat lons
  async _loadTrashCans() {
      return fetch('http://128.237.192.190:8000/listcans')
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
    // const rightButtonConfig = {
    //   title: 'Item List View',
    //   handler: () => this.props.navigator.push({
    //     component: ItemListView,
    //   }),
    // };
    return (
      <View style={styles.mainContainer}>
        <NavigationBar
          tintColor={'black'}
          style={{marginBottom: 30}}
          leftButton={
              <LogoutIcon
                  onPress={() => alert('logout')}/>}
          centerButton1={
              <SearchIcon
                  onPress={() => alert('center 1')}/>}
          centerButton2={
              <ScanIcon
                  onPress={() => alert('center 2')}/>}
          centerButton3={
              <MapInactiveIcon
                  onPress={() => alert('center 3')}/>}
          rightButton={
              <ListInactiveIcon
                  onPress={() => this.navigateItemListView()}
              />}
        />
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
                  coordinate={{latitude:marker.lat, longitude:marker.lon}}

                  image = {this.getDot(marker)}/>
              ))}

            </MapView>
          </View>
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
  map: {
    position: 'absolute',
    flex: 1,
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
