import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity,
  Text
  } = React;

export default class MapInactiveIcon extends Component {
  render() {
    return (
      <TouchableOpacity style={{marginRight: -39,width: 73, height: 74, marginTop: 0, backgroundColor: '#3399ff'}} onPress={this.props.onPress}>
        <Image
          source={require('../images/Icon-72-map-active.png')}
          style={[{ width: 30, height: 30, marginLeft: 23, marginTop: 15}, this.props.style]}/>
         <Text style={{fontSize: 12, marginTop: 3, textAlign: 'center', color: 'white'}}>Map View</Text>
      </TouchableOpacity>
    );
  }
}
