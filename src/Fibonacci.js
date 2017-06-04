import React, { Component } from 'react';
import {
  Text,
  Button,
  Image,
  View, 
  TouchableOpacity
} from 'react-native';
import Boxes from '../components/Boxes';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
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
};

class Fibonacci extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grids :[
				0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40, 100,'?', 'infinite', 'coffee', 'toilet'
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

Fibonacci.navigationOptions = ({ navigation }) => ({
  title: "Fibonacci",
  headerLeft: 
  <TouchableOpacity onPress={() => {navigation.navigate('DrawerOpen')}}>
    <Icon name="bars" size={30} style={styles.menuIcon} />    
  </TouchableOpacity>,
  drawerLabel: 'Fibonacci',
  drawerIcon: ({ tintColor }) => (
    <Image
      source={require('../imgs/fibonacci.png')}
      style={[styles.tabIcon, {tintColor: tintColor}]}
    />
  ),
});

export default Fibonacci;
