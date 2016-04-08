'use strict';
var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

var App = require('./App');
// const server = '128.237.219.22';
const server = '127.0.0.1';
var Codefest2016 = React.createClass({
  render() {
    return(
      <NavigatorIOS
        style = {styles.container}
        initialRoute={{
          title: "Select User",
          navigationBarHidden: true,
          component:App,
          passProps: {'server': server}
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
