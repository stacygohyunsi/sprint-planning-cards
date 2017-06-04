import React, { Component } from 'react';
import { Modal, View, Image, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'silver'
	}, 
	container: {
		flex: 1,
    justifyContent: 'center',
    padding: 20,
	},
	modalBackgroundStyle: {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	}, 
	closeWord: {
		paddingBottom: 10,
		fontWeight: '500',
		color:'white'
	},
	closeWordContainer: {
		alignItems: 'center'		
	}
}

export default class ShowModal extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<View>
				<Modal
					animationType = {"slide"}
					transparent = {false}
					visible = {this.props.visible}
					onRequestClose = {() => {alert("Modal has been closed.")}}>
					<View style={[styles.container, styles.modalBackgroundStyle]}>
						{this.props.content}
						<TouchableHighlight style={styles.closeWordContainer} onPress = {this.props.closeModal}>
							<Text style={styles.closeWord}><Icon name="times" size={20} style={styles.menuIcon} /> CLOSE</Text>
						</TouchableHighlight>
					</View>
				</Modal>
			</View>
		)
	}
}