'use strict';

var React = require('react-native');
var NavigationBar = require('./react-native-navbar');
var Accordion = require('react-native-accordion');
var Button = require('react-native-button');
var MainPage = require('./MainPage');
var ChooseType = require('./ChooseType');
import Camera from 'react-native-camera';

var {
    Component,
    StyleSheet,
    Text,
    View,
    AlertIOS,
} = React;

var BarcodeScanner = React.createClass({


	getInitialState: function() {
		console.log(Camera.constants);
	    return {
	        showCamera: true,
	        cameraType: Camera.constants.Type.back,
	    }
	},

	exitCamera: function(){
		this.setState({showCamera: false});
		this.props.navigator.pop()
	},

	renderCamera: function() {
		console.log("RENDER CAMERA");
	    if(this.state.showCamera) {
	        return (
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
	        );
	    } else {
	        return (
	            <View></View>
	        );
	    }
	},

	_onBarCodeRead: function(e) {
	    this.setState({showCamera: false});
	    var canId = e.data;

	    this.chooseTypeOfBag(canId);
	},

	chooseTypeOfBag: function(canId){
		console.log(this.props.trashCans);
		this.props.navigator.push({
			title: 'Choose Type View',
			component: ChooseType,
			navigationBarHidden: true,
			passProps: {'user': this.props.user, 
			'server':this.props.server, 
			'canId': canId,
			'trashCans': this.props.trashCans},
			callback: this.updateCans,
   		})
	},

	render() {
    
	    return (
	    	this.renderCamera()
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
    }

});

module.exports = BarcodeScanner;