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
  TextInput,
} = React;

var MapView = require('react-native-maps');
// var NavBar = require('./NavBar');
var NavigationBar = require('./react-native-navbar');
var TrashPandaListView = require('./ItemListView');
var TimerMixin = require('react-timer-mixin');
var CustomMarkers = require('./CustomMarkers');
var { width, height } = Dimensions.get('window');
var Button = require('react-native-button');

var Immutable = require('immutable');

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
import ListActiveIcon from '../components/List-Active';
import MapActiveIcon from '../components/Map-Active';

var MainPage = React.createClass({
  mixins: [TimerMixin],

  searchNumber : function(){
    console.log('\n\n\narrived\n\n\n');
    return(
      <TextInput style={styles.searchInputStyle} />
    )
  },

  navigateItemListView: function(){
   this.props.navigator.push({
     title: 'Item List View',
     component: TrashPandaListView,
     navigationBarHidden: true,
   })
 },
  /*componentWillMount(){
    this._loadTrashCans();
  },*/


  isMarkerVisibleOnMap(point_x, point_y){

  },


  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      trashCans:Immutable.List(),
    };
  },

  onRegionChange(region) {
    if (this.isMounted()) {
      this.setState({ region });
    }
  },

  

  

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState !== this.state;
  },

  


  registerCans(){
    console.log("logging in... ");
    this.setState({
        registeredCans: this.state.trashCans
    })
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
              // onPress={() => alert('center 1')}/>}
              onPress={() => this.searchNumber()}/>}
      centerButton2={
          <ScanIcon
              onPress={() => alert('center 2')}/>}
      centerButton3={
          <MapActiveIcon />}
              // onPress={() => alert('center 3')}/>}
      rightButton={
          <ListInactiveIcon
              onPress={() => this.navigateItemListView()}/>}/>
      <View style={styles.container}>
        <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        <CustomMarkers server={this.props.server}/>
        </MapView>
      </View>
      </View>
    );
  },


  
});

var styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
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
  okButton:{
    width: 120,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#00FF00',
    borderColor: '#000000',
    borderRadius: 7.5,
    borderWidth: 5,
    overflow: 'hidden',
    color:'#000000',
  },
  pickButton:{
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
  },
  emerButton:{
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
  searchInputStyle: {
    height: 100,
    width: 100
  }
});

module.exports = MainPage;
