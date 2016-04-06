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

class App extends Component {


	_getOptionList() {
		return this.refs['OPTIONLIST'];
	}

	nextPage(value)
	{
	  	this.props.navigator.replace({
	        title: 'Main Page',
	        component: MainPage,
	        navigationBarHidden: true,
	        passProps: {value: 'text'}
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
		        		console.log(value);
		        		this.nextPage(value)
		        	}
		        }
		      >
		        <Option>Arne</Option>
		        <Option>Aubrey</Option>
		        <Option>Chase</Option>
		        <Option>Dan</Option>
		        <Option>James</Option>
		        <Option>Matt</Option>
		        <Option>Mike</Option>
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
