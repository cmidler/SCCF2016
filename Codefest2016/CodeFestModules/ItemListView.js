'use strict';

var React = require('react-native');

var {
    AppRegistry,
    ListView,
    Component,
    StyleSheet,
    Text,
    View,
} = React;

var TrashPandaListView = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return {
            selectedTab: 'redTab',
            notifCount: 0,
            presses: 0,
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

    renderContent: function(rowData, sectionId, rowId) {
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

    render: function(){
        return(
            <ListView>
                dataSource={this.state.dataSource}
                renderRow={this.renderContent}
            </ListView>
        )
    }
});

module.exports = TrashPandaListView;
