'use strict';
var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

var App = require('./App');

var Codefest2016 = React.createClass({
  render() {
    return(
      <NavigatorIOS
        style = {styles.container}
        initialRoute={{
          title: "Select User",
          navigationBarHidden: true,
          component:App
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
