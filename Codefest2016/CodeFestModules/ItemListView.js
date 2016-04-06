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
          ['ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
          'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am']),
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
                  onPress={() => this.navigateItemListView()}
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
                // ['ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4512\t\tZone 1\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am',
                // 'ICON\t4513\t\tZone 5\t\t10/10/15 - 8:35am']),
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
