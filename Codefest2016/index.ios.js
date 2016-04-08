'use strict';
var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;
var Immutable = require('immutable');
var App = require('./App');
const server = '192.168.1.9';
var Codefest2016 = React.createClass({
  render() {
    return(
      <NavigatorIOS
        style = {styles.container}
        initialRoute={{
          title: "Select User",
          navigationBarHidden: true,
          component:App,
          passProps: {'server': server, 
          'userList': [],
          'trashCans': Immutable.List(),
        }
      }}/>
    );
    //return <App />
  },
});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });

AppRegistry.registerComponent('Codefest2016', () => Codefest2016);
