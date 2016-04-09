import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} = React;

export default class LogoutIcon extends Component {
  render() {
    const logoutIcon = '../images/Icon-76.png';
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.logoutContainer}>
        <Image
          source={require('../images/Icon-76.png')}
          style={styles.logoutButton}/>
         <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  logoutContainer:{
      marginLeft: 10,
      marginTop: 15,
  },
  logoutButton:{
      width: 30,
      height: 30,
      marginTop :15,
      marginLeft: 8,
  },
  logoutButtonText:{
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white',
      marginTop : 3,
      marginLeft: 3,
      textAlign: 'left',
  }
})
