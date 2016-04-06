'use strict';

var React = require('react-native');
// var NavBar = require('./NavBar');
var NavigationBar = require('./react-native-navbar');
var MapView = require('./MainPage');

var {
    AppRegistry,
    ListView,
    Component,
    StyleSheet,
    Text,
    View,
} = React;

import LogoutIcon from '../components/Logout';
import SearchIcon from '../components/Search';
import ScanIcon from '../components/Scan';
import ListInactiveIcon from '../components/List';
import MapInactiveIcon from '../components/Map';

var TrashPandaListView = React.createClass({
  navigateMapView: function(){
    this.props.navigator.pop({
      navigationBarHidden: true
    });
  //  this.props.navigator.replace({
  //    title: 'Map View',
  //    component: MapView,
  //    navigationBarHidden: true
  //  })
 },
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(
          ['4512\t\tZone 1\t\t10/10/15 - 8:35am',
          '4513\t\tZone 1\t\t10/09/15 - 9:21am',
          '4514\t\tZone 1\t\t10/12/15 - 10:45am',
          '4515\t\tZone 1\t\t10/11/15 - 9:35pm',
          '4516\t\tZone 1\t\t10/13/15 - 10:15am',
          '4517\t\tZone 2\t\t10/14/15 - 4:35pm',
          '4518\t\tZone 2\t\t10/15/15 - 9:35am',
          '4519\t\tZone 2\t\t10/01/15 - 9:45am',
          '4510\t\tZone 2\t\t10/02/15 - 9:55am',
          '4511\t\tZone 3\t\t10/03/15 - 10:35am',
          '4512\t\tZone 3\t\t10/05/15 - 10:45am',
          '4513\t\tZone 3\t\t10/11/15 - 10:55am',
          '4514\t\tZone 3\t\t10/11/15 - 11:35am',
          '4515\t\tZone 4\t\t10/12/15 - 12:35am',
          '4516\t\tZone 4\t\t10/13/15 - 14:35am',
          '4517\t\tZone 4\t\t10/15/15 - 9:35am',
          '4518\t\tZone 4\t\t10/16/15 - 10:35am',
          '4519\t\tZone 1\t\t10/17/15 - 11:35am',
          '4520\t\tZone 1\t\t10/18/15 - 12:35pm',
          '4521\t\tZone 5\t\t10/19/15 - 10:35am',
          '4522\t\tZone 2\t\t10/11/15 - 9:35am',
          '4523\t\tZone 3\t\t10/12/15 - 9:15am',
          '4524\t\tZone 4\t\t10/13/15 - 9:12am',
          '4525\t\tZone 5\t\t10/15/15 - 10:25am',
          '4526\t\tZone 1\t\t10/05/15 - 11:45am',
          '4527\t\tZone 5\t\t10/01/15 - 10:35am',
          '4528\t\tZone 3\t\t10/02/15 - 1:35pm',
          '4529\t\tZone 3\t\t10/03/15 - 2:35pm',
          '4530\t\tZone 3\t\t10/05/15 - 3:35pm',
          '4531\t\tZone 2\t\t10/06/15 - 4:35pm',
          '4532\t\tZone 1\t\t10/11/15 - 2:35pm',
          '4533\t\tZone 5\t\t10/12/15 - 12:35pm',
          '4534\t\tZone 5\t\t10/15/15 - 8:35am',
          '4535\t\tZone 2\t\t10/12/15 - 8:35am',
          '4536\t\tZone 2\t\t10/09/15 - 8:35am',
          '4537\t\tZone 5\t\t10/08/15 - 8:35am',
          '4538\t\tZone 1\t\t10/05/15 - 8:35am',
          '4539\t\tZone 3\t\t10/06/15 - 8:35am',
          '4540\t\tZone 5\t\t10/01/15 - 8:35am',
          '4541\t\tZone 4\t\t10/03/15 - 8:35am',
          '4542\t\tZone 3\t\t10/04/15 - 8:35am',
          '4543\t\tZone 2\t\t10/05/15 - 8:35am']),
    };
  },
  renderContent(rowData, sectionId, rowId) {
      if (rowId % 2) {
          return (
              <View style={{backgroundColor: 'lightgrey'}}>
                  <Text>{rowData}</Text>
              </View>
          );
      } else {
          return (
              <View style={{backgroundColor: 'white'}}>
                  <Text>{rowData}</Text>
              </View>
          );
      }
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
              <ListInactiveIcon
                  // onPress={() => this.navigateItemListView()}
              />}
        />
        <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderContent}
        />
        </View>
      </View>
    );
  },
})

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
})
module.exports = TrashPandaListView;





// var TrashPandaListView = React.createClass({
// class TrashPandaListView extends Component {
//   constructor(props) {
//     super(props);
//     var dataSource = new ListView.DataSource(
//       {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
//     this.state = {
//       dataSource: dataSource.cloneWithRows(['hi','you'])
//     };
//    }
    // renderContent(rowData, sectionId, rowId) {
    //     if (rowId % 2) {
    //         return (
    //             <View style={{backgroundColor: 'lightgrey'}}>
    //                 <Text>{rowData}</Text>
    //             </View>
    //         );
    //     } else {
    //         return (
    //             <View style={{backgroundColor: 'white'}}>
    //                 <Text>{rowData}</Text>
    //             </View>
    //         );
    //     }
    // }

  //   render(){
  //       this.setState();
  //       return(
  //         // <Text style={{backgroundColor: 'black'}}>foo</Text>
  //           <ListView>
  //               dataSource={this.state.dataSource}
  //               // renderRow={this.renderContent}
  //           </ListView>
  //       )
  //
  // }
    // setState: function() {
    //     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //
    //     return {
    //         selectedTab: 'redTab',
    //         notifCount: 0,
    //         presses: 0,
            // dataSource: ds.cloneWithRows(
                // ['4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // '4513\t\tZone 5\t\t10/10/15 - 8:35am']),
    //     };
    // },

    // renderContent: function(rowData, sectionId, rowId) {
    //     if (rowId % 2) {
    //         return (
    //             <View style={{backgroundColor: 'lightgrey'}}>
    //                 <Text>{rowData}</Text>
    //             </View>
    //         );
    //     } else {
    //         return (
    //             <View style={{backgroundColor: 'white'}}>
    //                 <Text>{rowData}</Text>
    //             </View>
    //         );
    //     }
    // },
    //
    // render: function(){
    //     this.setState();
    //     return(
    //       // <Text style={{backgroundColor: 'black'}}>foo</Text>
    //         <ListView>
    //             dataSource={this.state.dataSource}
    //             renderRow={this.renderContent}
    //         </ListView>
    //     )
    // }
// };
