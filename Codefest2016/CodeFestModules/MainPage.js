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
// var NavBar = require('./NavBar');
var NavigationBar = require('./react-native-navbar');
var TrashPandaListView = require('./ItemListView');
var TimerMixin = require('react-timer-mixin');

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

import LogoutIcon from '../components/Logout';
import SearchIcon from '../components/Search';
import ScanIcon from '../components/Scan';
import ListInactiveIcon from '../components/List';
import MapInactiveIcon from '../components/Map';

var MainPage = React.createClass({
  mixins: [TimerMixin],

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

  async okClicked (marker){
    console.log('OK clicked for ' + marker.id);

    marker.state = 0
    this.setState(marker);
    fetch('http://128.237.221.45:8000/trash_pickup', {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [{
          'id':marker.id,
          'timestamp': Date.now()
        }
        ]
      })

    });
  },

  async pickupClicked (marker){
    console.log('Pickup clicked for ' + marker.id);
    marker.state = 1
    this.setState(marker);
    fetch('http://128.237.221.45:8000/trash_drop', {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [{
          'id':marker.id,
          'timestamp': Date.now()
        }
        ]
      })

    });
  },

  async emergencyClicked (marker){
    console.log('Emergency clicked for ' + marker.id);
    marker.state = 2
    this.setState(marker);
    fetch('http://128.237.221.45:8000/trash_emergency', {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [{
          'id':marker.id,
          'timestamp': Date.now()
        }
        ]
      })

    });
  },

  //get all trash cans and parse into lat lons
  async _loadTrashCans() {
      return fetch('http://128.237.221.45:8000/listcans')
        .then((response) => response.json())
        .then((json) => {

          this.setState({trashCans:json.result});
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

  getOkButtonStyle(state){
    if (state == 0)
    {
      return {
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
        borderWidth: 5,
        overflow: 'hidden',
        color:'#000000',
      }
    }
    else
    {
      return{
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
      }
    }
  },

  getPickButtonStyle(state){
    if (state == 1)
    {
      return {
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
        borderWidth: 5,
        overflow: 'hidden',
        color:'#000000',
      }
    }
    else
    {
      return{
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
      }
    }
  },

  getEmergencyButtonStyle(state){
    if (state == 2)
    {
      return {
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
        borderWidth: 5,
        overflow: 'hidden',
        color:'#000000',
      }
    }
    else
    {
      return{
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
      }
    }
  },

  randomRegion() {
    var { region } = this.state;
    return {
      ...this.state.region,
      latitude: region.latitude + (Math.random() - 0.5) * region.latitudeDelta / 2,
      longitude: region.longitude + (Math.random() - 0.5) * region.longitudeDelta / 2,
    };
  },
  componentDidMount: function() {
    this.setTimeout(function() {
      this.setState({showMap: true});
    }.bind(this), 250);
  },
  render() {
    // const rightButtonConfig = {
    //   title: 'Item List View',
    //   handler: () => this.props.navigator.push({
    //     component: ItemListView,
    //   }),
    // };
    return (
// <<<<<<< HEAD
//       <View style={styles.mainContainer}>
//         <NavigationBar
//           tintColor={'black'}
//           style={{marginBottom: 30}}
//           leftButton={
//               <LogoutIcon
//                   onPress={() => alert('logout')}/>}
//           centerButton1={
//               <SearchIcon
//                   onPress={() => alert('center 1')}/>}
//           centerButton2={
//               <ScanIcon
//                   onPress={() => alert('center 2')}/>}
//           centerButton3={
//               <MapInactiveIcon
//                   onPress={() => alert('center 3')}/>}
//           rightButton={
//               <ListInactiveIcon
//                   onPress={() => this.navigateItemListView()}
//               />}
//         />
//           <View style={styles.container}>
//             <MapView
//               ref="map"
//               mapType="terrain"
//               style={styles.map}
//               region={this.state.region}
//               onRegionChange={this.onRegionChange}
//             >
//             {this.state.trashCans.map(marker => (
//                 <MapView.Marker
//                   coordinate={{latitude:marker.lat, longitude:marker.lon}}
//
//                   image = {this.getDot(marker)}/>
//               ))}
//
//             </MapView>
//           </View>
// =======
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
              ref={marker.id}
              coordinate={{latitude:marker.lat, longitude:marker.lon}}
              key = {marker.id}
              image = {this.getDot(marker)}
              calloutOffset={{ x: 0, y: 28 }}
              calloutAnchor={{ x: 0, y: 0.4 }}>


              <MapView.Callout tooltip>

                <View style={styles.bubbleContainer}>
                  <View style={styles.bubble}>
                      <Text style={styles.bubbleTitleText}>Can # {marker.id}</Text>
                      <Button
                        style={this.getOkButtonStyle(marker.state)}
                        onPress={(e)=>this.okClicked(marker)}
                      >
                        Ok
                      </Button>
                      <Button
                        style={this.getPickButtonStyle(marker.state)}
                        onPress={()=>this.pickupClicked(marker)}
                      >
                        Pick-up
                      </Button>
                      <Button
                        style={this.getEmergencyButtonStyle(marker.state)}
                        onPress={()=>this.emergencyClicked(marker)}
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
