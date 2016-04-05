'use strict';

var React = require('react-native');
var NavigationBar = require('./react-native-navbar');

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

var TrashPandaNavBar = React.createClass({
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
                        onPress={() => alert('right button')}/>}
                />
            </View>
                // <ListView
                //     dataSource={this.state.dataSource}
                //     renderRow={this.renderContent}
                // />
            // </View>
        );
    }
});

module.exports = TrashPandaNavBar;
