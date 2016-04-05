/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

var SplashPage = require('./App');
var MainPage = require('./CodeFestModules/MainPage')

class Codefest2016 extends Component {
  render() {
    return (
      <Navigator
            initialRoute={{id: 'App'}}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              return Navigator.SceneConfigs.FloatFromRight;
            }}/>
    );
  }

  renderScene ( route, navigator ) {
        var routeId = route.id;
        if (routeId === 'App') {
          return (
            <SplashPage
              navigator={navigator} />
          );
        }
        else if (route === 'MainPage') {
          return (
            <MainPage
              navigator={navigator} />
          );
        }
        return (
          <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 32,}}>Route ID = {route}</Text>
          </View>
        );
  }

  noRoute(navigator) {
    return (
      <View><Text>No Scene!</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Codefest2016', () => Codefest2016);


