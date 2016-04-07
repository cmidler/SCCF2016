import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity,
  Text
} = React;

export default class ListInactiveIcon extends Component {
  render() {
    return (
      <TouchableOpacity style={{width: 75, height: 74, marginTop: 0, backgroundColor: 'grey'}} onPress={this.props.onPress}>
        <Image
          source={require('../images/Icon-72-list-inactive.png')}
          style={[{ width: 30, height: 30, marginLeft: 23, marginTop: 15, backgroundColor: 'grey' }, this.props.style]}/>
         <Text style={{fontSize: 12, fontWeight: 'bold',marginTop: 3, textAlign: 'center'}}>List View</Text>
      </TouchableOpacity>
    );
  }
}
