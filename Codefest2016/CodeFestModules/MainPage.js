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
var LogoutView = require('../App');
// var NavBar = require('./NavBar');
var NavigationBar = require('./react-native-navbar');
var TrashPandaListView = require('./ItemListView');
var TimerMixin = require('react-timer-mixin');
var CustomMarkers = require('./CustomMarkers');
var { width, height } = Dimensions.get('window');
var Button = require('react-native-button');
var BarcodeScanner = require('./BarcodeScanner');
var Immutable = require('immutable');
var SearchBar = require('react-native-search-bar');

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
     passProps: {
      'trashCans': this.getCans(),
      'refer': this.refs.trashCans,
      'server': this.props.server,
      'user': this.props.user, 
     },
   })
 },

  navigateBarcodeScanner(){
    trashCans = this.getCans();
    this.props.navigator.push({
      title: 'Barcode Scanner View',
      component: BarcodeScanner,
      navigationBarHidden: true,
      passProps: {'user': this.props.user, 
      'server':this.props.server,
      'trashCans': trashCans,
      'refer': this.refs.trashCans},
   })
  },



  navigateLogout: function(){
    this.updateCans();
    this.props.navigator.popToTop()
  },

  updateCans: function(){
    this.props.route.callback(this.refs.trashCans);

  },

  getCans: function(){
    var trash = this.refs.trashCans.getTrashCans();
    //console.log(trash);
    return trash;
  },

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

  refresh(){
    this.refs.trashCans.refreshCans();
    this.setTimeout(function() {
      this.setState({showMap: true});
    }.bind(this), 5000);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState !== this.state;
  },

  


  componentDidMount: function() {
    
    this.setTimeout(function() {
      this.setState({showMap: true});
    }.bind(this), 250);
  },
  render() {
    console.log("RENDERING MAIN");
    return (

    <View style={styles.mainContainer}>
    <NavigationBar
      tintColor={'black'}
      style={{marginBottom: 30}}
      leftButton={
          <LogoutIcon
              onPress={() => this.navigateLogout()}/>}
      centerButton1={
          <SearchIcon
              onPress={() => this.refresh()}/>}
      centerButton2={
          <ScanIcon
              onPress={() => this.navigateBarcodeScanner()}/>}
      centerButton3={
          <MapActiveIcon/>}
      rightButton={
          <ListInactiveIcon
              onPress={() => this.navigateItemListView()}/>}/>
      <View style={styles.container}>
        <CustomMarkers 
          server={this.props.server} 
          user = {this.props.user}
          trashCans = {this.props.trashCans}
          ref={'trashCans'}/>
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
  
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
});

module.exports = MainPage;
