import React, { Component } from 'react';
import {
  Text,
  Image,
  View, 
  TouchableOpacity, 
	Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, ListItem } from 'native-base';

const styles = {
	tabIcon: {
    width: 20,
    height: 20
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginLeft:10
  }  
}

class About extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
  handleClick() {
    Linking.canOpenURL('https://imstacy.com').then(function(supported) {
      if (supported) {
        Linking.openURL('https://imstacy.com');
      } else {
        console.log('Don\'t know how to open URI: https://imstacy.com');
      }
    })
  }
	render() {
		return(
			<View>
				<ListItem>
					<Text>Made with <Icon name="gratipay" size={20} style={styles.menuIcon} /> using React-Native. Credits to FlatIcons and Facebook for maintaining the awesome framework. </Text>
				</ListItem>  
				<ListItem>
					<Text onPress={this.handleClick}>If you have any suggestions, please reach me at my page www.imstacy.com.</Text>
				</ListItem>
			</View>
		)
	}
}

About.navigationOptions = ({ navigation }) => ({
  title: "About",
  headerLeft: 
  <TouchableOpacity  onPress={() => {navigation.navigate('DrawerOpen')}}>
    <Icon name="bars" size={30} style={styles.menuIcon} />    
  </TouchableOpacity>,
  drawerLabel: 'About',
  drawerIcon: ({ tintColor }) => (
    <Image
      source={require('../imgs/about.png')}
      style={[styles.tabIcon, {tintColor: tintColor}]}
    />
  ),
});

export default About;
