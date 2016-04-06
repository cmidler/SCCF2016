var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableHighlight,
} = React;
var Button = require('react-native-button');
var CustomCallout = React.createClass({
  

  _okClicked (marker){
    console.log('OK clicked for ' + marker.id);
    dismiss()
  },

  _pickupClicked (marker){
    console.log('Pickup clicked for ' + marker.id);
  },

  _emergencyClicked (marker){
    console.log('Emergency clicked for ' + marker.id);
  },



  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
            
            <Text style={styles.bubbleTitleText}>Can # {marker.id}</Text>
            <Button
              style={styles.okButton}
              onPress={()=>this._okClicked(marker)}
            >
              Ok
            </Button>
            <Button
              style={styles.pickButton}
              onPress={()=>this._pickupClicked(marker)}
            >
              Pick-up
            </Button>  
            <Button
              style={styles.emergencyButton}
              onPress={()=>this._emergencyClicked(marker)}
            >
              Emergency
            </Button>      
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#000000',
    borderWidth: 0.5,
  },
  dollar: {

    //color: '#FFFFFF',
    //fontSize: 10,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#000000',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  bubbleTitleText:{
    color: '#000000',
    alignSelf: 'center',
    fontSize: 20,
  },
  okButton: {
    width: 120,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#00ff00',
    borderColor: '#000000',
    borderRadius: 7.5,
    borderWidth: 2.5,
    overflow: 'hidden',
    color:'#000000',
  },
  pickButton: {
    width: 120,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#FFFF00',
    borderColor: '#000000',
    borderRadius: 7.5,
    borderWidth: 2.5,
    overflow: 'hidden',
    color:'#000000',
  },
  emergencyButton: {
    width: 120,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#FF0000',
    borderColor: '#000000',
    borderRadius: 7.5,
    borderWidth: 2.5,
    overflow: 'hidden',
    color:'#000000',
  },
});

module.exports = CustomCallout;
