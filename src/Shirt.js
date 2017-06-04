import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Button,
  View, 
  TouchableOpacity
} from 'react-native';
import Boxes from '../components/Boxes';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  tabIcon: {
    width: 20,
    height: 20
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginLeft:10
  }    
});

class Shirt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grids :[
				'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '?', 'infinite', 'coffee', 'toilet'
			]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Boxes grids={this.state.grids}/>
      </View>
    );
  }
}

Shirt.navigationOptions = ({ navigation }) => ({
  title: "T-Shirt",
  headerLeft: 
  <TouchableOpacity onPress={() => {navigation.navigate('DrawerOpen')}}>
    <Icon name="bars" size={30} style={styles.menuIcon} />    
  </TouchableOpacity>,
  drawerLabel: 'T-Shirt',
  drawerIcon: ({ tintColor }) => (
    <Image
      source={require('../imgs/shirt.png')}
      style={[styles.tabIcon, {tintColor: tintColor}]}
    />
  )
});

export default Shirt;
