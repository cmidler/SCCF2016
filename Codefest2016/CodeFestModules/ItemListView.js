'use strict';

var React = require('react-native');
var NavigationBar = require('./react-native-navbar');
var MapView = require('./MainPage');
var Accordion = require('react-native-accordion');

var {
    AppRegistry,
    ListView,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
} = React;

import LogoutIcon from '../components/Logout';
import SearchIcon from '../components/Search';
import ScanIcon from '../components/Scan';
import ListInactiveIcon from '../components/List';
import MapInactiveIcon from '../components/Map';
import ListActiveIcon from '../components/List-Active';
import Button from 'apsl-react-native-button';

var expandMenu = (
  <View>
    <Text>This content is hidden in the accordion</Text>
  </View>
);

var TrashPandaListView = React.createClass({
  navigateMapView: function(){
    this.props.navigator.pop({
      navigationBarHidden: true
    });
 },

  getInitialState: function() {
    var ds = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return {
      dataSource: ds.cloneWithRows([]),
      cans: this.props.trashCans.toArray(),
    };
  },
  componentDidMount: function() {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.cans),
      })
  },

  sortListByStatus: function(rowData){
    console.log(rowData);
  },

  sortListById: function(rowData){

  },

  sortListByZone: function(rowData){

  },

  sortListByPickkup: function(rowData){

  },

  greenClicked: function(tcid) {
    console.log('green clicked: ' + tcid);

    var cans = this.state.cans.slice(0);

    var index = 0;
    for(var i = 0; i < cans.length; i++)
    {
      if(cans[i].get('id') == tcid)
      {
        index = i;
        break;
      }
    }

    var tc = cans[index];

    if (tc.get('state') == 10) {
      console.log('Skipping cause state is already 0');
      return;
    }
    cans[index] = tc.set('state', 0);

    var url = 'http://' + this.props.server + ':8000/trash_pickup'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [
          {
            'id': tcid,
            'timestamp': Date.now()
          }
        ]
      })
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(cans),
      cans: cans,
    })
  },

  yellowClicked: function(tcid) {
    console.log('yellow clicked: ' + tcid);

    var cans = this.state.cans.slice(0);

    var index = 0;
    for(var i = 0; i < cans.length; i++)
    {
      if(cans[i].get('id') == tcid)
      {
        index = i;
        break;
      }
    }

    var tc = cans[index];

    if (tc.get('state') == 2 || tc.get('state') == 1) {
      console.log('Skipping cause state is already 2 or 1');
      return;
    }
    cans[index] = tc.set('state', 1);

    var url = 'http://' + this.props.server + ':8000/trash_drop'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [
          {
            'id': tcid,
            'timestamp': Date.now()
          }
        ]
      })
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(cans),
      cans: cans,
    })
  },

  emergencyClicked: function (tcid){
    console.log('Emergency clicked: ' + tcid);

    var cans = this.state.cans.slice(0);

    var index = 0;
    for(var i = 0; i < cans.length; i++)
    {
      if(cans[i].get('id') == tcid)
      {
        index = i;
        break;
      }
    }

    var tc = cans[index];

    if (tc.get('state') == 2) {
      console.log('Skipping cause state is already 2');
      return;
    }
    cans[index] = tc.set('state', 2);

    var url = 'http://' + this.props.server + ':8000/trash_emergency'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [
          {
            'id': tcid,
            'timestamp': Date.now()
          }
        ]
      })
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(cans),
      cans: cans,
    })
  },

  _renderRow: function(rowData, sectionId, rowId) {
    var d = new Date(rowData.get('last_pickup'));
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = ('' + d.getFullYear()).substring(2,4);
    var hh = '' + (d.getHours() % 12);
    if (hh == '0') {
      hh = '12';
    }
    var min = '' + d.getMinutes();
    if (min.length == 1)
      min = '0' + min;
    var myDateString = mm + '/' + dd + '/' + yy;
    var myTimeString = hh + ':' + min;
    var ampm = d.getHours() >= 12 ? 'pm' : 'am';

    var i = null;
    if (rowData.get('state') == 2) {
      i = require('../images/Red-Icon-Small-50.png');
    } else if (rowData.get('state') == 1) {
      i = require('../images/yellow-Icon-Small-50.png');
    } else {
      i = require('../images/Green-Icon-Small-50.png');
    }

    var style = styles.contentStyle;
    if (rowId % 2)
      style = styles.contentStyleAlt;

    var header = (
      <View style={style}>
        <View style={styles.contentImageStyle}>
          <Image style={styles.statusImageStyle} source={i}/>
        </View>
        <Text style={styles.contentIdStyle}>{rowData.get('id')}</Text>
        <Text style={styles.contentZoneStyle}>Zone: {rowData.get('zone')}</Text>
        <Text style={styles.contentTimeStyle}>{myDateString + ' ' + myTimeString + ' ' + ampm}</Text>
      </View>
    );

    var content = (
      <View style={styles.accordionStyle}>
        <Button style={styles.okButtonStyle} textStyle={styles.buttonTextStyle}
          onPress={()=>this.greenClicked(rowData.get('id'))}>
          Ok
        </Button>
        <Button style={styles.pickupButtonStyle} textStyle={styles.buttonTextStyle}
          onPress={()=>this.yellowClicked(rowData.get('id'))}>
          Pick-up
        </Button>
        <Button style={styles.emergencyButtonStyle} textStyle={styles.emergencyButtonTextStyle}
          onPress={()=>this.emergencyClicked(rowData.get('id'))}>
          Emergency
        </Button>
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
        underlayColor='white'
      />
    );
  },

  render: function() {
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
                  onPress={() => this.navigateMapView()} />}
          rightButton={
              <ListActiveIcon
                  // onPress={() => this.navigateItemListView()}
              />}
        />
        <View style={styles.headerButtonRowStyle}>
          <Button style={styles.headerButtonStyleStatus} textStyle={styles.headerButtonTextStyle}
            onPress={() => this.sortListByStatus()}>
            Status
          </Button>
          <Button style={styles.headerButtonStyleId} textStyle={styles.headerButtonTextStyle}
            onPress={() => alert('hi')}>
            ID
          </Button>
          <Button style={styles.headerButtonStyleZone} textStyle={styles.headerButtonTextStyle}
            onPress={() => alert('hi')}>
            Zone
          </Button>
          <Button style={styles.headerButtonStylePickup} textStyle={styles.headerButtonTextStyle}
            onPress={() => alert('hi')}>
            Last Pick-up
          </Button>
        </View>
        <ListView
          style={styles.listContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          // renderRow={this.renderContent}
        />
      </View>
    );
  },
})

var styles = StyleSheet.create({

  mainContainer: {
    flex: 1
  },

  listContainer: {
    top:0,
    marginTop: -20,
  },

  accordionStyle:{
    backgroundColor: '#003366',
    flexDirection: 'row',
    // marginTop: 100
    // marginTop: 20
  },

  headerStyle:{
    backgroundColor: '#003366',
  },

  headerTextStyle:{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10
  },

  contentStyle:{
    paddingVertical: 12,
    borderTopColor: 'black',
    flexDirection: 'row'
  },

  contentStyleAlt:{
    paddingVertical: 12,
    borderTopColor: 'black',
    backgroundColor: 'lightgrey',
    flexDirection: 'row'
  },

  contentTextStyle:{
    marginLeft: 5,
    fontWeight: 'bold',
    flexDirection: 'row',
    flex: 1,
    // flexWrap : 'wrap',
    // alignItems: 'flex-start',
    // textAlign: 'center'
  },

  contentIdStyle:{
    marginLeft: 5,
    fontWeight: 'bold',
    flexDirection: 'row',
    flex: 1,
    // flexWrap : 'wrap',
    // alignItems: 'flex-start',
    textAlign: 'center',
  },
  contentImageStyle:{
    marginLeft: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap : 'wrap',
    // alignItems: 'flex-start',
    // textAlign: 'center',
  },
  contentZoneStyle:{
    marginLeft: 5,
    fontWeight: 'bold',
    flexDirection: 'row',
    flex: 1,
    // flexWrap : 'wrap',
    // alignItems: 'flex-start',
    textAlign: 'center',
  },
  contentTimeStyle:{
    marginLeft: 5,
    fontWeight: 'bold',
    flexDirection: 'row',
    flex: 2,
    // flexWrap : 'wrap',
    // alignItems: 'flex-start',
    textAlign: 'center',
  },

  okButtonStyle:{
    backgroundColor: '#00ff00',
    flexDirection: 'column',
    width: 110,
    height: 40,
    marginRight: 16,
    marginTop: 10,
    marginLeft: 7
    // marginTop: 25,
    // marginRight: 20,
    // marginLeft: 20
  },

  pickupButtonStyle:{
    backgroundColor: '#ffcc00',
    flexDirection: 'column',
    width: 110,
    height: 40,
    marginRight: 16,
    marginTop: 10
    // marginRight: 20,
    // marginLeft: 20
  },

  emergencyButtonStyle:{
    backgroundColor: '#cc0000',
    width: 110,
    height: 40,
    marginTop: 10
    // marginBottom: 25,
    // marginRight: 20,
    // marginLeft: 20
  },

  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black'
  },

  emergencyButtonTextStyle :{
    fontWeight: 'bold',
    fontSize : 16,
    color: 'white'
  },

  statusImageStyle :{
      width: 20,
      height: 20,
      flexDirection: 'row',
      marginLeft: 7,
      // flexWrap : 'wrap',
      // alignItems: 'flex-start',
      // textAlign: 'center',
  },

  headerButtonRowStyle:{
    flexDirection : 'row',
    backgroundColor: '#003366',
    height: 45
  },

  headerButtonStyleStatus:{
      width : 60,
      height : 45,
      borderRadius: 0,
      borderColor: '#003366',
      flex: 1,
  },
  headerButtonStyleId:{
      marginLeft: 15,
      width : 40,
      height : 45,
      borderRadius: 0,
      borderColor: '#003366',
      flex: 1,
  },
  headerButtonStyleZone:{
      marginLeft: 24,
      width : 50,
      height : 45,
      borderRadius: 0,
      borderColor: '#003366',
      flex: 1,
  },
  headerButtonStylePickup:{
      marginLeft: 34,
      width : 140,
      height : 45,
      borderRadius: 0,
      borderColor: '#003366',
      flex: 2,
  },

  headerButtonTextStyle:{
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
  }
})
module.exports = TrashPandaListView;
