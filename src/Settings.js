import React, { Component } from 'react';
import {
  Button,
  View, 
	Image, 
	TouchableOpacity, 
  AsyncStorage,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, List, Text, ListItem, Left, Body, Right, Switch, Separator, Content } from 'native-base';
import { TriangleColorPicker } from 'react-native-color-picker';
import ShowModal from '../components/ShowModal';

const STORAGE_KEY = '@SprintPlanningSwitches:key';

const styles = {
  tabIcon: {
    width: 20,
    height: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginLeft:10
  }
};

class Settings extends Component {
	constructor(props) {
		super(props);
    this.listContent = this.listContent.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleShakeSwitchValue = this.handleShakeSwitchValue.bind(this);

		this.state = {
			shakeToReveal: false,
      color: {h:0, s:0, v:1},
      modalVisible: false
		};
	}

  componentWillMount() {
    this.loadInitialState().done();
  }

  loadInitialState = async function() {
    try {
      const storageValues = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedValue = JSON.parse(storageValues);

      if (storageValues !== null){
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

  handleColorChange = async function(color) {
    this.setState({ color: color });
    try {
      await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({'color': color}));
    } catch(error) {
      console.log(error);
    }    
  }

  handleShakeSwitchValue = async function(value) {
    this.setState({shakeToReveal: value});
    try {
      await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({'shakeToReveal': value}));
    } catch(error) {
      console.log(error);
    }
  }

	openModal() {
  	this.setState({modalVisible: true});
	}

	closeModal() {
  	this.setState({modalVisible: false});
	}
  
  listContent() {
    return (
      <TriangleColorPicker
        color={this.state.color}
        onColorChange={this.handleColorChange}
        onColorSelected={color => alert(`Color selected: ${color}`)}
        style={{flex: 0.5}}
      />     
    )
  }

	render() {
		return (
			<Container>   
        <Content>      
          <Separator bordered>
            <Text>APP PREFERENCES</Text>
          </Separator>  
          <ListItem icon>
            <Left>
              <Icon name="eye" />
            </Left>
            <Body>
              <Text>Shake to reveal</Text>
              <Text note>Click on an item & then shake to reveal</Text>
            </Body>
            <Right>
              <Switch 
              onValueChange= {(value)=> this.handleShakeSwitchValue(value)} 
              value= {this.state.shakeToReveal} />   
            </Right>
          </ListItem> 
          <ListItem icon>
            <Left>
              <Icon name="paint-brush" />
            </Left>        
            <Body>
              <Text>Color Palette</Text>
              <Text note>Background color of display popup</Text>
            </Body>
            <Right>
              <TouchableOpacity onPress={this.openModal}><Text>Open</Text></TouchableOpacity>
            </Right>
          </ListItem>
        </Content>    
        <ShowModal content={this.listContent()} visible={this.state.modalVisible} closeModal={this.closeModal}/>  
			</Container>			
		)
	}
}

Settings.navigationOptions = ({ navigation }) => ({
  title: "Settings",
  headerLeft: 
  <TouchableOpacity  onPress={() => {navigation.navigate('DrawerOpen')}}>
    <Icon name="bars" size={30} style={styles.menuIcon} />    
  </TouchableOpacity>,
  drawerLabel: 'Settings',
  drawerIcon: ({ tintColor }) => (
    <Image
      source={require('../imgs/settings.png')}
      style={[styles.tabIcon, {tintColor: tintColor}]}
    />
  ),
});

export default Settings;
