'use strict'
import React, {
  Component,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

var MainPage = require('./CodeFestModules/MainPage');
var MainCollectorPage = require('./CodeFestModules/MainCollectorPage')
var Immutable = require('immutable');
var SplashImage = require('./images/splash.png');
var Device = require('react-native-device');
var trashCans = Immutable.List()

class App extends Component {

	componentWillMount(){
		if (this.state.userList.length == 0)
    		this._loadUserList();
  	}

  	constructor(props) {
	    super(props);

	    this.state = {
	      userList: [],
	    };
	    this.updateTrashCans = this.updateTrashCans.bind(this);
  	}

  	


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
	}

	_getOptionList() {
		return this.refs['OPTIONLIST'];
	}

	updateTrashCans(refer){
		if(this.props.mainTab == 'barcode')
		{
			console.log("SHOULD POP");
			this.props.route.callback(refer);
			this.props.navigator.pop();
			console.log("Pop");
		}
		else
		{
			console.log("Main tab = " + this.props.mainTab);
			trashCans = refer.getTrashCans();
		}
	}

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
		var cb = this.updateTrashCans;
		if(this.props.mainTab == 'barcode')
		{
			cb = this.props.route.callback;
			trashCans = this.props.trashCans;
		}

	    if (Device.isIpad()){
		  	this.props.navigator.push({
		        title: 'Main Page',
		        component: MainCollectorPage,
		        navigationBarHidden: true,
		        passProps: {'user': user,
		        'server':this.props.server,
		        'userList': this.state.userList,
		        'trashCans': trashCans,
	          'device' : 'iPad',
		    	},
		    	callback:this.updateTrashCans,
		    });
	    } else {

		  	this.props.navigator.push({
		        title: 'Main Page',
		        component: MainPage,
		        navigationBarHidden: true,
		        passProps: {'user': user,
		        'server':this.props.server,
		        'userList': this.state.userList,
		        'trashCans': trashCans,
	          'device' : 'iPhone',
		    	},
		    	callback:cb,
		    });
	    }

  	}

	render(){
		return (
			/*<View style={{ flex: 1 }}>
	        	<View style={styles.bgImageWrapper}>
	        		<Image source={SplashImage} style={styles.bgImage}/>
	        	</View>*/
			<View style={styles.optionBox}>
		      <Select
		        width={250}
		        ref="SELECT1"
		        optionListRef={this._getOptionList.bind(this)}
		        defaultValue="Select a Username"
		        onSelect={
		        	(value) => {
		        		//console.log(value);
		        		this.nextPage(value)
		        	}
		        }
		      >
		      	{this.state.userList.map(user => (


		        <Option key = {user.id}>{user.first_name + ' ' + user.last_name}</Option>

		      	))}
		      </Select>
		      <OptionList ref="OPTIONLIST"/>
			</View>
			//</View>
		);
	}
}

var styles = StyleSheet.create({
	optionBox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
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

module.exports = App;
