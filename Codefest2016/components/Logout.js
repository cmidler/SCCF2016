import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity,
  Text
} = React;

export default class LogoutIcon extends Component {
  render() {
    const logoutIcon = '../images/Icon-76.png';
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{marginLeft: 10}}>
        <Image
          source={require('../images/Icon-76.png')}
          style={[{ width: 30, height: 30, marginTop: 15, marginLeft: 8}, this.props.style]}/>
         <Text style={{fontSize: 12, fontWeight: 'bold',color: 'white', marginTop: 3, marginLeft: 5, textAlign: 'center'}}>Logout</Text>
      </TouchableOpacity>
    );
  }
}
