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
  Menu,
  Image,
} = React;

var MapView = require('react-native-maps');
var LogoutView = require('../App');
// var NavBar = require('./NavBar');
// var NavigationBar = require('./react-native-navbar');
var TrashPandaListView = require('./ItemListView');
var TimerMixin = require('react-timer-mixin');
var CustomMarkers = require('./CustomMarkers');
var { width, height } = Dimensions.get('window');
// var Button = require('react-native-button');
var BarcodeScanner = require('./BarcodeScanner');
var Immutable = require('immutable');
var SearchBar = require('react-native-search-bar');
const SideMenu = require ('react-native-side-menu');

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
import Button from 'apsl-react-native-button';
// import SideMenu from 'react-native-thesidebar'

class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}

var MainPage = React.createClass({
  mixins: [TimerMixin],

  searchNumber : function(){
    return(
      <TextInput style={styles.searchInputStyle} />
    )
  },

  navigateItemListView: function(){
   this.props.navigator.push({
     title: 'Item List View',
     component: TrashPandaListView,
     navigationBarHidden: true,
     passProps: {'user': this.props.user,
      'server':this.props.server,
      'trashCans': trashCans,
      'refer': this.refs.trashCans},
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
    this.props.navigator.pop()
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
    const menu = <Menu navigator={navigator}/>;
    return (

    <View style={styles.mainContainer}>

      <View style={styles.sideMenu}>

        <View style={styles.sideMenuTitleBar}>
          <LogoutIcon />
        </View>

        <View style={styles.sideMenuLogo}>
          <View style={styles.sideMenuLogoParent}>
            <Image
              source={require('../images/ipad-top.png')}
              style={styles.logoImage}>
            </Image>
          </View>
        </View>

        <View style={styles.sideMenuStatusInfo}>
          <Text style={styles.sideMenuText}>Cans Ready for Pick-up</Text>
          <Text style={styles.sideMenuText}>Emergencies</Text>
        </View>

        <View style={styles.sideMenuActions}>
          <Text style={styles.sideMenuText}>Select one:</Text>
          <Text style={styles.sideMenuText}>Set stop number to optimize your route</Text>
          <Text style={styles.sideMenuText}>Number of cans</Text>
          <Text style={styles.sideMenuText}>Include all emergencies in this number</Text>
          <Text style={styles.sideMenuText}>Add all cans to route</Text>
        </View>

        <View style={styles.sideMenuRouteAction}>
          <Button style={styles.routeButtonStyle}>
            Route
          </Button>
        </View>

      </View>

      <View style={styles.container}>
        <CustomMarkers
          server={this.props.server}
          user = {this.props.user}
          trashCans = {this.props.trashCans}
          device = {this.props.device}
          ref={'trashCans'}/>
      </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
      flexDirection : 'row'
  },
  sideMenu:{
      width :250,
      backgroundColor: 'black',
      flexDirection: 'column',
  },
  sideMenuTitleBar:{
      // width: 50,
      alignSelf: 'stretch',
      height: 75,
      backgroundColor: '#3e3e3e',
  },
  sideMenuLogo:{
      alignSelf: 'stretch',
      height: 150,
      // backgroundColor: 'red',
      backgroundColor: '#29323d',
  },
  sideMenuActions:{
      alignSelf: 'stretch',
      height: 300,
      backgroundColor: '#29323d',
  },
  sideMenuActionButton:{
      textAlign: 'center',
  },
  sideMenuStatusInfo:{
      alignSelf: 'stretch',
      height: 150,
      backgroundColor: '#29323d',
  },
  sideMenuRouteAction:{
      alignSelf:'stretch',
      height: 100,
      backgroundColor: '#29323d',
  },
  logoImageContainer:{
      // alignSelf: 'stretch',
  },
  routeButtonStyle:{
    backgroundColor: '#2e80db',
    flexDirection: 'column',
    width: 110,
    height: 40,
    marginRight: 16,
    marginTop: 10,
    marginLeft: 7,
    alignSelf: 'center'
  },
  sideMenuLogoParent:{
  },
  logoImage:{

  },

  sideMenuText:{
      color: 'white',
  },

  container: {
    // position: 'absolute',
    position: 'relative',
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
