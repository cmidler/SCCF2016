import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity,
  Text
} = React;

export default class SearchIcon extends Component {
  render() {
    const logoutIcon = '../images/Icon-72.png';
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
