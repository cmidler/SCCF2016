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
  Item,
  TextInput,
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
var Radio = require('react-native-radio-button-classic');
var Option = Radio.Option;
var CheckBox = require('react-native-checkbox');
const SideMenu = require ('react-native-side-menu');

const ASPECT_RATIO = width / height;
const LATITUDE = 40.440624;
const LONGITUDE = -79.995888;
const LATITUDE_DELTA = 0.0025;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import LogoutIcon from '../components/LogoutIpad';
import SearchIcon from '../components/Search';
import ScanIcon from '../components/Scan';
import ListInactiveIcon from '../components/List';
import MapInactiveIcon from '../components/Map';
import ListActiveIcon from '../components/List-Active';
import MapActiveIcon from '../components/Map-Active';
import Button from 'apsl-react-native-button';
// import SideMenu from 'react-native-thesidebar'

var MainPage = React.createClass({
  mixins: [TimerMixin],

  updateCanCount: function(trashCans){
    var pickupCans = 0;
    var emergencyCans = 0;
    trashCans.map(function(can){
        if (can.get('state') == 1) {
          pickupCans += 1;
        } else if (can.get('state') == 2) {
          pickupCans += 1;
          emergencyCans += 1;
        }
    })
    this.setState({pickupCans: pickupCans});
    this.setState({emergencyCans: emergencyCans});
  },
  searchNumber : function(){
    return(
      <TextInput style={styles.searchInputStyle} />
    )
  },
  handlePosition: function(position) {
   console.log(position.coords.latitude + ', ' + position.coords.longitude);

   var url = 'http://' + this.props.server + ':8000/location'
     fetch(url, {
       method: 'POST',
       body: JSON.stringify({
         'id': this.props.user.id,
         'lat': position.coords.latitude,
         'lon': position.coords.longitude,
       })
     });
  },

  handlePositionError: function(error) {
    console.log(error.message);
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
  navigateLogout: function(){
    this.updateCans();
    this.props.navigator.popToTop()
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
      optionSelected: 2,
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


  onSelect(index){
    this.setState({
      optionSelected: index + 1
    });
  },


  componentDidMount: function() {
    this.setInterval( () => {
         navigator.geolocation.getCurrentPosition(
           this.handlePosition, this.handlePositionError, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
         );
       }, 5000);

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
          <LogoutIcon onPress={() => this.navigateLogout()}/>
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
          <View style={styles.sideMenuStatusTextContainer}>
            <View style={styles.sideMenuStatusTextRow}>
              <Text style={styles.sideMenuStatusNumber}>{this.state.pickupCans}</Text>
              <Text style={styles.sideMenuStatusText}>Cans Ready for Pick-up</Text>
            </View>
            <View style={styles.sideMenuStatusTextRow}>
              <Text style={styles.sideMenuStatusNumber}>{this.state.emergencyCans}</Text>
              <Text style={styles.sideMenuStatusText}>Emergencies</Text>
            </View>
          </View>
        </View>

        <View style={styles.sideMenuActions}>
          <Text style={styles.sideMenuHeaderText}>Select one:</Text>
          <Radio onSelect={this.onSelect.bind(this)} defaultSelect={this.state.optionSelected - 1}>
            <Option color="gray" selectedColor="#008BEF">
              <Text style={styles.radioButtonText}>Set stop number to optimize your route</Text>
              <View style={styles.sideMenuInputRow}>
                <TextInput style={styles.radioTextInput} value={"25"}/>
                <Text style={styles.sideMenuText}>Number of cans</Text>
              </View>
            </Option>
            <Option color="gray" selectedColor="#008BEF">
              <Text style={styles.radioButtonText}>Add all cans to route</Text>

            </Option>
          </Radio>

        </View>

        <View style={styles.sideMenuRouteAction}>
          <Button style={styles.routeButtonStyle}>
            Route
          </Button>
        </View>

      </View>

      <View style={styles.container}>
        <CustomMarkers
          updateSideBarCanCount={this.updateCanCount.bind(this)}
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
      height: 85,
      backgroundColor: '#3e3e3e',
  },
  sideMenuLogo:{
      alignSelf: 'stretch',
      height: 100,
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

  sideMenuInputRow:{
      flexDirection: 'row'
  },

  sideMenuStatusTextContainer:{
    marginTop: 40,
    marginLeft: 25,
  },

  sideMenuStatusNumberColumn:{
      flexDirection: 'column',
  },
  sideMenuStatusTextRow:{
      marginTop: -10,
      flexDirection: 'row',
  },

  sideMenuStatusNumber:{
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    marginRight: 5,
    marginBottom: 15,
  },

  sideMenuStatusText:{
    marginBottom: 10,
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
    marginTop: 9,
  },
  sideMenuRouteAction:{
      alignSelf:'stretch',
      height: 100,
      backgroundColor: '#29323d',
  },
  sideMenuHeaderText:{
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      marginLeft: 10,
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
    marginTop: 12,
    width: 232,
    height: 90,
  },

  radioButtonText:{
      color: 'white',
      marginTop: 10,
      marginBottom: 10,
      fontSize: 16,
  },
  radioTextInput:{
      height: 40,
      width: 40,
      borderColor: 'white',
      borderWidth: 1,
      backgroundColor: 'white',
  },
  sideMenuText:{
      color: 'white',
      marginLeft: 5,
  },
  checkBox:{
      color: 'white',
      backgroundColor: 'white',
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
