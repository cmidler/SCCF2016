'use strict'
import React, {
  Component,
  Text,
  View,
  StyleSheet,
  AlertIOS,
  Image,
} from 'react-native';


var MainPage = require('./CodeFestModules/MainPage');
var Immutable = require('immutable');
var trashCans = Immutable.List();
var Button = require('react-native-button');
var App = require('./App');
var SplashImage = require('./images/splash.png');
import Camera from 'react-native-camera';
var PhoneApp = React.createClass ({

	componentWillMount(){
		if (this.state.userList.length == 0)
    		this._loadUserList();
  	},

  	getInitialState() {
	    return {
	      userList: [],
	      showCamera: true,
	      cameraType: Camera.constants.Type.back,
	    };
	 },

  	renderCamera() {
	    if(this.state.showCamera) {
	        return (
	        	<View style={{ flex: 1 }}>
		        	<View style={styles.bgImageWrapper}>
		        		<Image source={SplashImage} style={styles.bgImage}/>
		        	</View>
		            <Camera
		                ref="cam"
		                style={styles.container}
		                onBarCodeRead={this._onBarCodeRead}
		                type={this.state.cameraType}
		            >
		            	<View style={styles.buttonBar}>
				            <Button style={styles.button} onPress={this.exitCamera}>
					            <Text style={styles.buttonText}>Exit</Text>
					        </Button>    
					    </View>
		            </Camera>
	            </View>
	        );
	    } else {
	        return (
	            <View></View>
	        );
	    }
	},

	_onBarCodeRead(e) {
	    this.setState({showCamera: false});
	    var userId = e.data;
	    var user = null;
	    for(var i = 0; i<this.state.userList.length;i++)
	    {
	    	if (userId == this.state.userList[i].id)
	    	{
	    		user = this.state.userList[i];
	    		break;
	    	}
	    }

	    if (user == null)
	    {
	    	AlertIOS.alert(
			  "Could not find user.  Please scan again.",
			  null,
			  [
			    {text: 'OK', onPress: () => this.setState({showCamera: true})},
			  ],
			);
	    }
	    else
	    {
	    	this.nextPage(user);
	    }
	},

	exitCamera(){
		this.setState({showCamera: false});
		this.props.navigator.push({
	        title: 'User List',
	        component: App,
	        navigationBarHidden: true,
	        passProps: { 'server':this.props.server, 
	        'userList': this.state.userList,
	        'trashCans': trashCans,
	    	}
	    });
	},

  	//get all trash cans and parse into lat lons
	async _loadUserList() {
		// console.log("load user list is called");
    // this.setState({userList:['hi']});
		var url = 'http://' + this.props.server +':8000/listusers';
	  	return fetch(url)
	    .then((response) => response.json())
	    .then((json) => {

			this.setState({userList:json.result});
			//console.log("user list is " + userList)
			return json.result;
	  })
	  .catch((error) => {
	    return [];
	  });
	},


	updateTrashCans(refer){
		trashCans = refer.getTrashCans();
		
		this.setState({showCamera: true});
		
	},

	nextPage(value)
	{

		var user = null;

		for(var i = 0; i<this.state.userList.length; i++)
		{
			var name = this.state.userList[i].first_name + ' ' + this.state.userList[i].last_name;

			if (name == value)
			{
				user = this.state.userList[i];
				break;
			}
		}
		console.log(user);
	  	this.props.navigator.push({
	        title: 'Main Page',
	        component: MainPage,
	        navigationBarHidden: true,
	        passProps: {'user': user, 
	        'server':this.props.server, 
	        'userList': this.state.userList,
	        'trashCans': trashCans,
	    	},
	    	callback:this.updateTrashCans,
	    });
  	},

	render(){
		console.log("rendering camera " + this.state.showCamera);
		//this.state.showCamera = true;
		return (
			this.renderCamera()
		);
	},
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    buttonBar: {
        flexDirection: "row",
        position: "absolute",
        top: 44,
        right: 0,
        left: 0,
        justifyContent: "center"
    },
    button: {
        padding: 10,
        color: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        margin: 5
    },
    buttonText: {
        color: "#FFFFFF"
    },
    bgImageWrapper: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0
    },
    bgImage: {
        flex: 1,
        resizeMode: "stretch"
    },

});

module.exports = PhoneApp;
