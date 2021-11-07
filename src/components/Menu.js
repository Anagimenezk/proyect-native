import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';



class Menu extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
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