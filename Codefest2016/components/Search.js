import React from 'react-native';
const {
  Component,
  AppRegistry,
  Image,
  TouchableOpacity,
  Text
} = React;

const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  UpdatePosition
} = DropDown;

export default class SearchIcon extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../images/Icon-72.png')}
          style={[{ width: 30, height: 30, marginTop: 15 }, this.props.style]}/>
         <Text style={{fontSize: 12, marginTop: 3, color: 'white', marginLeft: 0, textAlign: 'center'}}>Search</Text>
      </TouchableOpacity>
    );
  }
}
