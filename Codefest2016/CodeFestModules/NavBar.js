'use strict';

var React = require('react-native');
var NavigationBar = require('./react-native-navbar');
var TrashPandaListView = require('./ItemListView.js');

var {
    AppRegistry,
    ListView,
    Component,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
} = React;

import LogoutIcon from '../components/Logout';
import SearchIcon from '../components/Search';
import ScanIcon from '../components/Scan';
import ListInactiveIcon from '../components/List';
import MapInactiveIcon from '../components/Map';

var TrashPandaNavBar = React.createClass({
     navigateItemListView: function(){
      this.props.navigator.replace({
        title: 'Item List View',
        component: TrashPandaListView
      })
    },
    render: function(){
        return (
            <View>
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
            </View>
        );
    }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
  }
});

module.exports = TrashPandaNavBar;
