import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity,
  Text
} = React;

export default class ScanIcon extends Component {
  render() {
    const logoutIcon = '../images/Icon-72-scan.png';
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../images/Icon-72-scan.png')}
          style={[{ width: 30, height: 30, marginTop: 15 }, this.props.style]}/>
         <Text style={{fontSize: 12, fontWeight: 'bold', marginTop: 3, color: 'white', textAlign: 'center'}}>Scan</Text>
      </TouchableOpacity>
    );
  }
}
