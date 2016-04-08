'use strict';

var React = require('react-native');
var NavigationBar = require('./react-native-navbar');
var Accordion = require('react-native-accordion');
var Button = require('react-native-button');
var MainPage = require('./MainPage');
var Immutable = require('immutable');
import Camera from 'react-native-camera';

var {
    Component,
    StyleSheet,
    Text,
    View,
    AlertIOS,
} = React;

var ChooseType = React.createClass({

	returnToMain: function(){
		this.props.navigator.popN(2);
	},

	async okClicked (){
    //this.state.trashCans = this.state.trashCans.set(marker,newMarker);
    var newMarker = Immutable.Map();
    var trashCans = this.props.trashCans;
    var canId = this.props.canId;
    console.log(trashCans);
    for(var i = 0; i<trashCans.size; i++)
    {
      //console.log(this.state.trashCans.get(i));
      if(trashCans.get(i).get('id') == canId)
      {
        newMarker = trashCans.get(i).set('state',0);
        //console.log(this.props);
        this.props.refer.updateMarker(newMarker);
        break;
      }
    }
    
    
    
    var url = 'http://' + this.props.server + ':8000/trash_pickup'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [{
          'id':canId,
          'timestamp': Date.now()
        }
        ]
      })
    }).then((json) => {
        this.returnToMain();
      }).catch((error) => {
        console.log("Error getting trashcans");
        this.returnToMain();
      });
    
  },

  async pickupClicked (){

    //this.state.trashCans = this.state.trashCans.set(marker,newMarker);
    var newMarker = Immutable.Map();
    var trashCans = this.props.trashCans;
    var canId = this.props.canId;
    console.log(trashCans);
    for(var i = 0; i<trashCans.size; i++)
    {
      //console.log(this.state.trashCans.get(i));
      if(trashCans.get(i).get('id') == canId)
      {
        newMarker = trashCans.get(i).set('state',1);
        //console.log(this.props);
        this.props.refer.updateMarker(newMarker);
        break;
      }
    }

    var url = 'http://' + this.props.server + ':8000/trash_drop'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [{
          'id':this.props.canId,
          'timestamp': Date.now()
        }
        ]
      })
    }).then((json) => {
      console.log(this.props.canId);
        this.returnToMain();
      }).catch((error) => {
        console.log("Error getting trashcans");
        this.returnToMain();
      });
    
  },

  async emergencyClicked (){
    //this.state.trashCans = this.state.trashCans.set(marker,newMarker);
    var newMarker = Immutable.Map();
    var trashCans = this.props.trashCans;
    var canId = this.props.canId;
    console.log(trashCans);
    for(var i = 0; i<trashCans.size; i++)
    {
      //console.log(this.state.trashCans.get(i));
      if(trashCans.get(i).get('id') == canId)
      {
        newMarker = trashCans.get(i).set('state',2);
        //console.log(this.props);
        this.props.refer.updateMarker(newMarker);
        break;
      }
    }

    var url = 'http://' + this.props.server + ':8000/trash_emergency'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'user_token': this.props.user.id,
        'trash_locations': [{
          'id':this.props.canId,
          'timestamp': Date.now()
        }
        ]
      })
    }).then((json) => {
        this.returnToMain();
      }).catch((error) => {
        console.log("Error getting trashcans");
        this.returnToMain();
      });
    
  },

	render() {
    
	    return (
	    	<View style={styles.container}>
            <Text style={styles.topText}>Can # {this.props.canId}</Text>
            <Button
              style={styles.okButton}
              onPress={(e)=>this.okClicked()}
            >
              Ok
            </Button>
            <Button
              style={styles.pickButton}
              onPress={()=>this.pickupClicked()}
            >
              Pick-up
            </Button>
            <Button
              style={styles.emerButton}
              onPress={()=>this.emergencyClicked()}
            >
              Emergency
            </Button>
        </View>
	    )
	},
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    okButton: {
    	width: 320,
        height: 80,
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor: '#00FF00',
        borderColor: '#000000',
        borderRadius: 17.5,
        borderWidth: 2.5,
        overflow: 'hidden',
        color:'#000000',
        fontSize:44,
    },
    pickButton: {
    	width: 320,
        height: 80,
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor: '#FFFF00',
        borderColor: '#000000',
        borderRadius: 17.5,
        borderWidth: 2.5,
        overflow: 'hidden',
        color:'#000000',
        fontSize:44,
    },
    emerButton: {
    	width: 320,
        height: 80,
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor: '#FF0000',
        borderColor: '#000000',
        borderRadius: 17.5,
        borderWidth: 2.5,
        overflow: 'hidden',
        color:'#000000',
        fontSize:44,
    },
    topText:{
      textAlign: 'center',
      fontSize: 60,
    },

});

module.exports = ChooseType;