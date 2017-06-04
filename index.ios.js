import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Fibonacci from './src/Fibonacci';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Shirt from './src/Shirt';
import Settings from './src/Settings';
import About from './src/About';

class reactNavigationSample extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <App navigation = {navigation}/>
    );
  }
}

const FibonacciScreen = StackNavigator({
  Home: { screen: Fibonacci, } 
}, {headerMode: 'screen'});

const ShirtScreen = StackNavigator({
  Shirt: { screen: Shirt }
}, {headerMode: 'screen'});

const SettingsScreen = StackNavigator({
  Settings: { screen: Settings }, 
}, {headerMode: 'screen'});

const AboutScreen = StackNavigator({
  About: { screen: About }
}, {headerMode: 'screen'});

const SimpleApp = DrawerNavigator({
  FibonacciScreen: { screen: FibonacciScreen },
  ShirtScreen: { screen: ShirtScreen },
  SettingsScreen: { screen: SettingsScreen },
  AboutScreen: { screen: AboutScreen }  
}, {
    headerMode: 'screen',
    drawerPosition: 'left',
    contentOptions: {
      labelStyle: {
        fontSize:15
      },
      activeTintColor: '#8D472E'
    }
  }
);

AppRegistry.registerComponent('reactNavigationSample', () => SimpleApp);
