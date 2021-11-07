import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { createDrawerNavigator} from '@react-navigation/drawer'; este trae error

import Home from '../screens/home';
import Register from '../screens/register';
import Login from '../screens/login';
import Perfil from '../screens/profile';
import PostForm from '../screens/postForm';
import { auth } from '../firebase/config';

const Drawer = createDrawerNavigator();


class Menu extends Component{
  constructor(props){
    super(props);
    this.state ={
      
    }
  }

  render(){
      return(
          <View>
              <Text>
                  MENU
              </Text>
          </View>
      )
  }
}

  export default Menu;