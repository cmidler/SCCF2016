'use strict';
var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

var App = require('./App');
var PhoneApp = require('./PhoneApp');
// const server = '128.237.219.218';
const server = '127.0.0.1';

var Codefest2016 = React.createClass({

  render() {
    console.log(this.props.isSimulator);
    if(this.props.isSimulator)
    {
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
    }
    else
    {
      return(
        <NavigatorIOS
          style = {styles.container}
          initialRoute={{
            title: "Select User",
            navigationBarHidden: true,
            component:PhoneApp,
            passProps: {'server': server}
        }}/>
      );
    }
    //return <App />
  },
});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });

AppRegistry.registerComponent('Codefest2016', () => Codefest2016);
