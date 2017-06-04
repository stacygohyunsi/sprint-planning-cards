import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import Eachgrid from './Eachgrid';
import ShowModal from './ShowModal';
import RNShakeEvent from 'react-native-shake-event';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

import {
  Text,
  Button,
  Image,
  View, 
	AsyncStorage,
	ScrollView, 
	Dimensions
} from 'react-native';

const STORAGE_KEY = '@SprintPlanningSwitches:key';

const responsiveFontSize = (f) => {
	const width = Dimensions.get('window').width;
	const height = Dimensions.get('window').height;
  return Math.sqrt((height*height)+(width*width))*(f/100);
}

const styles = {
	wordBoard: {
		fontSize: responsiveFontSize(20),
		fontFamily: 'Space Mono'
	},
	innerContainer: {
		borderRadius: 10,
    alignItems: 'center',
	}, 
	innerContainerTransparentStyle: {
		padding: 20
	},
	scrollableView: {
		justifyContent: 'center', 
		flexDirection: 'row', 
		flexWrap:'wrap'
	}
}

export default class Boxes extends Component {
	constructor(props) {
		super(props);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.listBoxes = this.listBoxes.bind(this);
		this.listContent = this.listContent.bind(this);

		this.state = {
			selectedTile: null,
			grids: [
				0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40, '?', 'infinite', 'coffee'
			], 
			modalVisible: false, 
			shakeToReveal: false, 
			color: {h:0, s:0, v:1}
		}
	}

  componentWillMount() {
    this.loadInitialState().then(() => {
			if (this.state.shakeToReveal) {
				RNShakeEvent.addEventListener('shake', function() {
					this.openModal();
				}.bind(this));
			}	
		});	
  }

  loadInitialState = async function() {
    try {
      const storedValues = await AsyncStorage.getItem(STORAGE_KEY);
			const parsedValue = JSON.parse(storedValues);
      if (storedValues !== null){
				if (parsedValue.hasOwnProperty('shakeToReveal')) {
					this.setState({shakeToReveal: parsedValue.shakeToReveal});
				}
        if (parsedValue.hasOwnProperty('color')) {
					this.setState({color: parsedValue.color});
				}
      }
    } catch (error) {
      console.log(error);      
    }
  }.bind(this);

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

	openModal() {
  	this.setState({modalVisible: true});
	}

	closeModal() {
  	this.setState({modalVisible: false});
	}

	listBoxes() {
		return this.props.grids.map(function(grid) {
			return (
				<Eachgrid key={grid} number={grid} onPress={ this.chooseSelectedTile.bind(this, grid) } isActive={ this.state.selectedTile === grid } />
			)
		}.bind(this))
	}

	listContent() {
		let display = null;

    if (this.state.selectedTile == 'infinite') {
      display = <Image source={require('../imgs/infinite.png')}/>;
    } else if (this.state.selectedTile == 'coffee'){
      display = <Image source={require('../imgs/coffee.png')}/>;
    } else if (this.state.selectedTile == 'toilet'){
      display = <Image source={require('../imgs/restroom.png')}/>;
    } else {
			display = <Text style={styles.wordBoard}>{this.state.selectedTile}</Text>
		}
		styles.innerContainerTransparentStyleUpdated = {
			backgroundColor: fromHsv(this.state.color),
			...styles.innerContainerTransparentStyle		
		}
		return(
			<View style={[styles.innerContainer, styles.innerContainerTransparentStyleUpdated]}>
				{display}
			</View>
			);
	}
	
	chooseSelectedTile(grid) {
		this.setState({
			selectedTile: grid
		})
		if (!this.state.shakeToReveal) {
			this.openModal();
		}
	}

	render() {
		return (
      <ScrollView contentContainerStyle={styles.scrollableView}>
        {this.listBoxes()}
				<ShowModal content={this.listContent()} visible={this.state.modalVisible} closeModal={this.closeModal}/>
      </ScrollView>
		)
	}
}