'use strict'
import React, {
  Component,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

var MainPage = require('./CodeFestModules/MainPage');
var Immutable = require('immutable');
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
		trashCans = refer.getTrashCans();
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
  	}

	render(){
		
		return (

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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

module.exports = App;
