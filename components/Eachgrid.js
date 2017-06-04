import React, { Component } from 'react';
import {
  Text,
  Button,
  Image,
  View, 
	TouchableOpacity, 
	Dimensions
} from 'react-native';

const width = Dimensions.get('window').width;

const styles = {
	boxWord: {
		fontSize:40, 
		fontFamily: 'Space Mono'
	}, 
	boxIcon: {
    width: 50,
    height: 50
	},
	origBox: {
		backgroundColor: '#e6e4cd',
		height: 100,
		width: width * 0.3, 
		margin: 5	, 
		justifyContent: 'center',
		alignItems: 'center'		
	}	
}

export default class Eachgrid extends Component {
	constructor(props) {
		super(props);

	}
	
	render() {

		let display = null;

    if (this.props.number == 'infinite') {
      display = <Image source={require('../imgs/infinite.png')} style={[styles.boxIcon]}/>;
    } else if (this.props.number == 'coffee'){
      display = <Image source={require('../imgs/coffee.png')} style={[styles.boxIcon]}/>;
    } else if (this.props.number == 'toilet'){
      display = <Image source={require('../imgs/restroom.png')} style={[styles.boxIcon]}/>;
    } else {
			display = <Text style={styles.boxWord}>{this.props.number}</Text>
		}

		if (this.props.isActive) {
		styles.box = {
			borderColor: '#8D472E',
			borderWidth: 2,
			...styles.origBox					
		 }
		} else {
		styles.box = {
			...styles.origBox		
		 }
		}
		return (
			<TouchableOpacity style={styles.box} onPress={this.props.onPress}>
				{display}
			</TouchableOpacity>
		)
	}
}