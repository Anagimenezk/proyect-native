import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { auth } from '../firebase/config';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      
    }
  }
  render(){
    console.log(this.props.userData);
    return(
      <View style={styles.container}>
          <Text style={styles.welcome}> Bienvenido: {auth.currentUser.displayName}</Text>
          <Text style={styles.element}> email: {this.props.userData.email}</Text>
          <Text style={styles.element}> Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
          <Text style={styles.element}> Último login: {this.props.userData.metadata.lastSignInTime}</Text>
          <Text>ACA VA CONTEO DE POSTEOS</Text>
          <Text> Aca deberiamos tener flatlist de sus posteos con posibilidad de delete post </Text>
          <TouchableOpacity style={styles.touchable} onPress={()=>this.props.logout()}>
            <Text style={styles.touchableText}>Logout</Text>
          </TouchableOpacity>         
      </View>       
    )
  }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginHorizontal:10
    },
    welcome:{
        fontSize:18,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold'
    },
    element:{
        marginBottom:10,
    },
    touchable:{
        padding: 10,
        backgroundColor: '#a1a7ff',
        marginTop: 30,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    }
    
});

export default Profile;