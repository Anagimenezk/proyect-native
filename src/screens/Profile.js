import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, ImageBackground, ActivityIndicator, FlatList, TextInput} from 'react-native';
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
      <ImageBackground source={require('../../assets/fondopag.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
          <Text style={styles.welcome}> Bienvenido: {auth.currentUser.displayName}</Text>
          <Text style={styles.element}> Email: {this.props.userData.email}</Text>
          <Text style={styles.element}> Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
          <Text style={styles.element}> Último login: {this.props.userData.metadata.lastSignInTime}</Text>
          <Text>ACA VA CONTEO DE POSTEOS</Text>
          <Text> Aca deberiamos tener flatlist de sus posteos con posibilidad de delete post </Text>
          <TouchableOpacity style={styles.touchable} onPress={()=>this.props.logout()}>
            <Text style={styles.touchableText}>Logout</Text>
          </TouchableOpacity>         
      </View>    
      </ImageBackground>   
    )
  }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 80,
        marginHorizontal:10,
        backgroundColor: "white",
        padding: 40,
        marginBottom: 400,
        width: 1200,
        alignSelf: 'center'
    },
    welcome:{
        fontSize:20,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold',
    },
    element:{
        marginBottom:10,
        fontSize: 15
    },
    touchable:{
        padding: 10,
        backgroundColor: '#B2D3BE',
        marginTop: 30,
        borderRadius: 4,
        width: 130,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center',
        fontSize: 15
    }
    
});

export default Profile;