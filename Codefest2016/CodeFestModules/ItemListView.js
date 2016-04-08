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
      rowHasChanged: (r1, r2) => r1 !== r2});

    console.log(this.props.trashCans);

    return {
      dataSource: ds.cloneWithRows(this.props.trashCans.toArray()),
      // dataSource: ds.cloneWithRows(
      //     ['G\t\t     4512\t\tZone 1\t\t10/10/15 - 8:35am',
      //     'Y\t\t     4513\t\tZone 1\t\t10/09/15 - 9:21am',
      //     'R\t\t     4514\t\tZone 1\t\t10/12/15 - 10:45am',
      //     'G\t\t     4515\t\tZone 1\t\t10/11/15 - 9:35pm',
      //     'Y\t\t     4516\t\tZone 1\t\t10/13/15 - 10:15am',
      //     'G\t\t     4517\t\tZone 2\t\t10/14/15 - 4:35pm',
      //     'Y\t\t     4518\t\tZone 2\t\t10/15/15 - 9:35am',
      //     'G\t\t     4519\t\tZone 2\t\t10/01/15 - 9:45am',
      //     'Y\t\t     4510\t\tZone 2\t\t10/02/15 - 9:55am',
      //     'R\t\t     4511\t\tZone 3\t\t10/03/15 - 10:35am',
      //     'R\t\t     4512\t\tZone 3\t\t10/05/15 - 10:45am',
      //     'G\t\t     4513\t\tZone 3\t\t10/11/15 - 10:55am',
      //     'Y\t\t     4514\t\tZone 3\t\t10/11/15 - 11:35am',
      //     'G\t\t     4515\t\tZone 4\t\t10/12/15 - 12:35am',
      //     'R\t\t     4516\t\tZone 4\t\t10/13/15 - 14:35am',
      //     'Y\t\t     4517\t\tZone 4\t\t10/15/15 - 9:35am',
      //     'Y\t\t     4518\t\tZone 4\t\t10/16/15 - 10:35am',
      //     'R\t\t     4519\t\tZone 1\t\t10/17/15 - 11:35am',
      //     'Y\t\t     4520\t\tZone 1\t\t10/18/15 - 12:35pm',
      //     'R\t\t     4521\t\tZone 5\t\t10/19/15 - 10:35am',
      //     'Y\t\t     4522\t\tZone 2\t\t10/11/15 - 9:35am',
      //     'G\t\t     4523\t\tZone 3\t\t10/12/15 - 9:15am',
      //     'Y\t\t     4524\t\tZone 4\t\t10/13/15 - 9:12am',
      //     'Y\t\t     4525\t\tZone 5\t\t10/15/15 - 10:25am',
      //     'G\t\t     4526\t\tZone 1\t\t10/05/15 - 11:45am',
      //     'Y\t\t     4527\t\tZone 5\t\t10/01/15 - 10:35am',
      //     'G\t\t     4528\t\tZone 3\t\t10/02/15 - 1:35pm',
      //     'Y\t\t     4529\t\tZone 3\t\t10/03/15 - 2:35pm',
      //     'G\t\t     4530\t\tZone 3\t\t10/05/15 - 3:35pm',
      //     'R\t\t     4531\t\tZone 2\t\t10/06/15 - 4:35pm',
      //     'Y\t\t     4532\t\tZone 1\t\t10/11/15 - 2:35pm',
      //     'R\t\t     4533\t\tZone 5\t\t10/12/15 - 12:35pm',
      //     'G\t\t     4534\t\tZone 5\t\t10/15/15 - 8:35am',
      //     'G\t\t     4535\t\tZone 2\t\t10/12/15 - 8:35am',
      //     'G\t\t     4536\t\tZone 2\t\t10/09/15 - 8:35am',
      //     'Y\t\t     4537\t\tZone 5\t\t10/08/15 - 8:35am',
      //     'R\t\t     4538\t\tZone 1\t\t10/05/15 - 8:35am',
      //     'Y\t\t     4539\t\tZone 3\t\t10/06/15 - 8:35am',
      //     'R\t\t     4540\t\tZone 5\t\t10/01/15 - 8:35am',
      //     'Y\t\t     4541\t\tZone 4\t\t10/03/15 - 8:35am',
      //     'G\t\t     4542\t\tZone 3\t\t10/04/15 - 8:35am',
      //     'Y\t\t     4543\t\tZone 2\t\t10/05/15 - 8:35am']),
    };
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


  _renderRow: function(rowData, sectionId, rowId) {
    console.log('rowData');
    console.log(rowData);
    // var statusTag = 'R';
    // var statusTag = 'rowData.split('\t')[0];'
    // rowData = rowData.replace("G\t\t","\t");
    // rowData = rowData.replace("Y\t\t","\t");
    // rowData = rowData.replace("R\t\t","\t");
    var d = new Date(rowData.get('last_pickup'));
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = ('' + d.getFullYear()).substring(2,4);
    var hh = '' + (d.getHours() % 12);
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
        <Button style={styles.okButtonStyle} textStyle={styles.buttonTextStyle}>
          Ok
        </Button>
        <Button style={styles.pickupButtonStyle} textStyle={styles.buttonTextStyle}>
          Pick-up
        </Button>
        <Button style={styles.emergencyButtonStyle} textStyle={styles.emergencyButtonTextStyle}>
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
        <View>
        <ListView
          style={styles.listContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          // renderRow={this.renderContent}
        />
        </View>
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
