var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
} = React;

var Immutable = require('immutable');
var MapView = require('./react-native-maps');
var greenDot = require('../circle-green/ios/Icon-12@2x.png');
var yellowDot = require('../circle-yellow/ios/yellow-Icon-12@2x.png');
var redDot = require('../circle-red/ios/red-12@2x.png');
var Button = require('react-native-button');
var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 40.4406248;
const LONGITUDE = -80.0022754;
const LATITUDE_DELTA = 0.0025;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//behold, globals
updateLat =0;
updateLon =0;
updateCustomMarker =1;

var sampleData =[{latitude : 40.443524,longitude:-79.995549},
{latitude : 40.442977,longitude:-79.995528},
{latitude : 40.441764,longitude:-79.996442},
{latitude : 40.441548,longitude:-79.995517},
{latitude : 40.440727,longitude:-79.996075},
{latitude : 40.439743,longitude:-79.996418},
{latitude : 40.43998,longitude:-79.998247},
{latitude : 40.440821,longitude:-80.000195},
{latitude : 40.439102,longitude:-80.001407},
{latitude : 40.442723,longitude:-79.9991},
{latitude : 40.443328,longitude:-79.996161}]

var CustomMarkers = React.createClass({
  propTypes :{
    updateSideBarCanCount: React.PropTypes.func,
  },
  updateMarker(marker){
    console.log(marker.get('id'));
    for(var i = 0; i<this.state.trashCans.size; i++)
    {
      //console.log(this.state.trashCans.get(i));
      if(this.state.trashCans.get(i).get('id') == marker.get('id'))
      {
        if(marker.get('state') != this.state.trashCans.get(i).get('state'))
        {
          this.setMarkerUpdateFlag(marker);
          var t = this.state.trashCans.set(i,marker);
          this.setState({trashCans: t});
          console.log("setting state for trashCan " + marker.get('id'));
        }

        break;
      }
    }
  },

  refreshCans(){
    var url = 'http://' + this.props.server + ':8000/listcans'
      return fetch(url)
        .then((response) => response.json())
        .then((json) => {
          var t = Immutable.List();
          for(var i = 0; i<json.result.length; i++)
          //for(var i = 0; i<10; i++)
          {
            var can = Immutable.Map(json.result[i]);
            t = t.push(can);

            //find can, if not same state then update
            for(var j = 0; j< this.state.trashCans.size; j++)
            {
              var oldCan = this.state.trashCans.get(j);
              if(oldCan.get('id') == json.result[i].id)
              {
                if (oldCan.get('state') != json.result[i].state)
                {
                  this.setMarkerUpdateFlag(can);
                  var changedTrash = this.state.trashCans.set(j,can);
                  console.log('what');
                  this.setState({trashCans: changedTrash});
                }
                break;
              }
            }

          }
          this.setState({trashCans:t});
      })
      .catch((error) => {
        console.log("Error getting trashcans");
      });
  },

  getTrashCans(){
    return this.state.trashCans;
  },

  componentWillMount(){
    // var url = 'http://' + this.props.server +':8000/route?user_id=1';

    if(this.props.trashCans.size == 0)
      this._loadTrashCans();
    else
      this.setState({trashCans:this.props.trashCans});
    },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (updateCustomMarker == 0){
      console.log('shouldComponentUpdate called on CustomMarker - FALSE');
      return false;
    } else {
      console.log('shouldComponentUpdate called on CustomMarker - TRUE');
      return true;
    }
  },

  getRoute: function(){
    console.log('getroute called');
    // var url = 'http://' + this.props.server +':8000/route?user_id=1';
    var url = 'http://' + this.props.server +':8000/route_2?user_id=1';
    // var url = 'http://localhost:8000/route_2?user_id=1';
    var points;
    fetch(url)
       .then((response) => {console.log(response); return response.json()})
       .then((json) => {
        points = json.result;
        // console.log(points);
        // console.log('\nfuckity\n');
        updateCustomMarker = 1;
        this.setState({points: points});
        updateCustomMarker = 0;
        // process points into array of lat longs
        //this.set_state
     })
     .catch((error) => {
       console.log('Error fetching route: ' + error);
     });

    // uncomment this to generate sample data
    // updateCustomMarker = 1;
    // this.setState({points: sampleData});
    // updateCustomMarker = 0;
  },
  getInitialState() {
    // this.getRoute();
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

  onRegionChange(region) {
    if (this.isMounted()) {
      this.setState({ region });
    }
  },

  //update globals
  setMarkerUpdateFlag(marker){
      updateLat = marker.get('lat');
      updateLon = marker.get('lon');
      updateCustomMarker = 1;
  },

  async okClicked (marker){

    if (marker.get('state') == 0)
      return;

    //flag coordinate set for update
    this.setMarkerUpdateFlag(marker);
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
    // console.log('Pickup clicked for ' + marker.id);
    console.log(marker.get('lat') + ',' + marker.get('lon'));

    if (marker.get('state') == 1)
      return;

    //flag coordinate set for update
    this.setMarkerUpdateFlag(marker);
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
    console.log(marker.get('lat') + ',' + marker.get('lon'));
    // console.log('Emergency clicked for ' + marker.id);
    if (marker.get('state') == 2)
      return;

    //flag coordinate set for update
    this.setMarkerUpdateFlag(marker);
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
          //for(var i = 0; i<10; i++)
          {
            var can = Immutable.Map(json.result[i]);
            // console.log(can.get('state'));
            if (this.props.device == 'iPad') {
              var canState = can.get('state');
              if (canState == 1 || canState == 2) {
                t = t.push(can);
              }
            } else {
              t = t.push(can);
            }
            // t = t.push(can);
          }
          this.setState({trashCans:t});
          this.props.updateSideBarCanCount(t);
          //disable custom marker updates until action is taken
          updateCustomMarker =0;
      })
      .catch((error) => {
        console.log("Error getting trashcans");
      });
  },



  render() {
    // console.log(this.state.points);
    // if (this.state.points == undefined) {
      // this.getRoute();
    // }
    // filter for pickups if Collector / isIpad

    return (
      <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        <MapView.Polyline
          strokeColor="#2e80db"
          strokeWidth={3}
          coordinates={this.state.points}
          />
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
