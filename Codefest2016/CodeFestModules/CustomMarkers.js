var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
} = React;
var Immutable = require('immutable');
var MapView = require('react-native-maps');
var greenDot = require('../circle-green/ios/Icon-12@2x.png');
var yellowDot = require('../circle-yellow/ios/yellow-Icon-12@2x.png');
var redDot = require('../circle-red/ios/red-12@2x.png');
var Button = require('react-native-button');
var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 40.440624;
const LONGITUDE = -79.995888;
const LATITUDE_DELTA = 0.0025;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



var CustomMarkers = React.createClass({


  componentWillMount(){
    //console.log(this.props);
    this._loadTrashCans();
  },

  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      trashCans:Immutable.List(),
    };
  },

  async okClicked (marker){
    
    if (marker.get('state') == 0)
      return;
    newMarker = marker.set('state',0);
    //this.state.trashCans = this.state.trashCans.set(marker,newMarker);
    
    var index = 0;
    for(var i = 0; i<this.state.trashCans.size; i++)
    {
      //console.log(this.state.trashCans.get(i));
      if(this.state.trashCans.get(i).get('id') == marker.get('id'))
      {
        index = i;
        break;
      }
    }
    var t = this.state.trashCans.set(index,newMarker);
    this.setState({trashCans: t});
    
    var url = 'http://' + this.props.server + ':8000/trash_pickup'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [{
          'id':marker.get('id'),
          'timestamp': Date.now()
        }
        ]
      })

    });
  },

  async pickupClicked (marker){
    console.log('Pickup clicked for ' + marker.id);
    if (marker.get('state') == 1)
      return;
    newMarker = marker.set('state',1);
    var index = 0;
    for(var i = 0; i<this.state.trashCans.size; i++)
    {
      //console.log(this.state.trashCans.get(i));
      if(this.state.trashCans.get(i).get('id') == marker.get('id'))
      {
        index = i;
        break;
      }
    }
    var t = this.state.trashCans.set(index,newMarker);
    this.setState({trashCans: t});
    var url = 'http://' + this.props.server + ':8000/trash_drop'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [{
          'id':marker.get('id'),
          'timestamp': Date.now()
        }
        ]
      })

    });
  },

  async emergencyClicked (marker){
    console.log('Emergency clicked for ' + marker.id);
    if (marker.get('state') == 2)
      return;
    newMarker = marker.set('state',2);
    var index = 0;
    for(var i = 0; i<this.state.trashCans.size; i++)
    {
      //console.log(this.state.trashCans.get(i));
      if(this.state.trashCans.get(i).get('id') == marker.get('id'))
      {
        index = i;
        break;
      }
    }
    var t = this.state.trashCans.set(index,newMarker);
    this.setState({trashCans: t});
    var url = 'http://' + this.props.server + ':8000/trash_emergency'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [{
          'id':marker.get('id'),
          'timestamp': Date.now()
        }
        ]
      })

    });
  },

  getDot(marker){
    if (marker.get('state') == 0)
      return greenDot;
    else if (marker.get('state') ==1)
      return yellowDot;
    else
      return redDot;
  },

  //get all trash cans and parse into lat lons
  async _loadTrashCans() {
      var url = 'http://' + this.props.server + ':8000/listcans'
      return fetch(url)
        .then((response) => response.json())
        .then((json) => {
          var t = Immutable.List();
          for(var i = 0; i<json.result.length; i++)
          {
            var can = Immutable.Map(json.result[i]);
            t = t.push(can);
          }
          this.setState({trashCans:t});
          
      })
      .catch((error) => {
        console.log("Error getting trashcans");
      });
  },



  render() {
    
    return (
      <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          region={this.state.region}
        >
        {this.state.trashCans.map(marker => (
              <MapView.Marker
                coordinate={{latitude:marker.get('lat'), longitude:marker.get('lon')}}
                key = {marker.get('id')}
                image = {this.getDot(marker)}
                calloutOffset={{ x: 0, y: 28 }}
                calloutAnchor={{ x: 0, y: 0.4 }}>


                <MapView.Callout tooltip>

                  <View style={styles.bubbleContainer}>
                    <View style={styles.bubble}>
                        <Text style={styles.bubbleTitleText}>Can # {marker.get('id')}</Text>
                        <Button
                          style={this.getOkButtonStyle(marker.get('state'))}
                          //style={styles.okButton}
                          onPress={(e)=>this.okClicked(marker)}
                        >
                          Ok
                        </Button>
                        <Button
                          style={this.getPickButtonStyle(marker.get('state'))}
                          //style={styles.pickButton}
                          onPress={()=>this.pickupClicked(marker)}
                        >
                          Pick-up
                        </Button>
                        <Button
                          style={this.getEmergencyButtonStyle(marker.get('state'))}
                          //style={styles.emerButton}
                          onPress={()=>this.emergencyClicked(marker)}
                        >
                          Emergency
                        </Button>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            ))}
        </MapView>
    
    );
  },

  getOkButtonStyle(state){
    if (state == 0)
    {
      return {
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
        borderWidth: 5,
        overflow: 'hidden',
        color:'#000000',
      }
    }
    else
    {
      return{
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
      }
    }
  },

  getPickButtonStyle(state){
    if (state == 1)
    {
      return {
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
        borderWidth: 5,
        overflow: 'hidden',
        color:'#000000',
      }
    }
    else
    {
      return{
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
      }
    }
  },

  getEmergencyButtonStyle(state){
    if (state == 2)
    {
      return {
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
        borderWidth: 5,
        overflow: 'hidden',
        color:'#000000',
      }
    }
    else
    {
      return{
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
      }
    }
  },



});

var styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
  },
  container: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'row'
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  bubbleContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  map: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  bubbleTitleText:{
    color: '#000000',
    alignSelf: 'center',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  okButton:{
    width: 120,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#00FF00',
    borderColor: '#000000',
    borderRadius: 7.5,
    borderWidth: 5,
    overflow: 'hidden',
    color:'#000000',
  },
  pickButton:{
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
    borderWidth: 5,
    overflow: 'hidden',
    color:'#000000',
  },
  emerButton:{
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
    borderWidth: 5,
    overflow: 'hidden',
    color:'#000000',
  },
  bubble: {
    width: 140,
    //flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#000000',
    borderWidth: 0.5,
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
  searchInputStyle: {
    height: 100,
    width: 100
  }
});

module.exports = CustomMarkers;