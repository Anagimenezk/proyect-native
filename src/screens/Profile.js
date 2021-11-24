import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db,auth } from '../firebase/config';
import Post from '../components/Post';


class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos:[],
      showInfo: false,
    }
  }

  componentDidMount(){
    db.collection('posts').where('owner', '==', auth.currentUser.email)
    .orderBy('createdAt','desc')
    .onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc=> {
          posts.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        this.setState({
          posteos:posts,
        })
      })
  }

  // deletePost(id){
  //   db.collection('posts').doc(id).delete()
  //   .then((res)=>{
  //     this.setState({
  //       posts:posteos,
  //     })
  //   })
  //   .catch((error)=> console.log(error)
  //   )}

    showInfo(){
      this.setState({
        showInfo:true,
      })
    }

    hideInfo(){
      this.setState({
        showInfo: false, 
      })
    }

  render(){
    return(
    <View style={styles.principalContainer}>
        <View style={styles.contenedorImagen}>
          <Image
                    style={styles.foto}
                    source={{uri:'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-profile-whatsapp-flatart-icons-outline-flatarticons.png'}}
                   resizeMode='contain'
                    />
          </View>
      <View style={styles.container}>
          <View style={styles.data}>
            <Text style={styles.welcome}> Bienvenido: {auth.currentUser.displayName}</Text>
          
          </View>

          
        
            <Text style={styles.element}> Email: {this.props.userData.email}</Text>
            <Text style={styles.element}> Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
            <Text style={styles.element}> Último login: {this.props.userData.metadata.lastSignInTime}</Text>
            <Text style={styles.element}> Posteos: { this.state.posteos.length}</Text>

          <TouchableOpacity style={styles.touchable} onPress={()=>this.props.logout()}>
            <Text style={styles.touchableText}>Logout</Text>
          </TouchableOpacity> 

            

          <View style={styles.contenedorPosteos}>
            <Image style={styles.fotoPost} source={{uri:'https://img.icons8.com/material-outlined/24/000000/gallery.png'}} resizeMode='contain'/>
            <Text style={styles.posteos}> Mis Posteos</Text>
          </View>

          <FlatList
          data = {this.state.posteos}
          keyExtractor={post => post.id}
          renderItem = {({item}) => <Post postData= {item} /> }
           />    
       </View>
    </View>      
    )
  }
}

const styles = StyleSheet.create({
    principalContainer:{
        backgroundColor: 'white',
    },
    contenedorImagen:{
      backgroundColor: '#F1F7E7',

    },
    foto:{
      width: 150,
      height: 150,
      alignSelf: 'center',
    },
    container:{
        marginTop: 10,
        marginHorizontal:10,
        backgroundColor: 'white',
        paddingBottom: 20
    },
    data:{
      borderTopColor: '#444',
      borderBottomWidth:1,
      borderBottomStyle: 'solid',
      marginBottom: 10,
      width: 200,
      alignSelf: 'center'
    },
    welcome:{
        fontSize:20,
        marginTop:10,
        marginBottom:25,
        fontWeight: 'bold',
        alignSelf:'center',
    },
    element:{
        marginBottom:10,
        alignSelf:'center',
    },
    posteos:{
      fontSize:15,
      marginLeft:5,
      fontWeight: 'bold',
    },
    touchable:{
        padding: 10,
        backgroundColor:'#E2C2B9',
        marginTop: 30,
        borderRadius: 4,
        width: 100,
        alignSelf: 'center'
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    fotoPost:{
      width: 20,
      height: 20,
    },
    contenedorPosteos:{
      flexDirection: "row",
      marginBottom: 15,
      marginTop: 40,
      padding: 10,
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: 'rgba(52, 52, 52, 0.3)',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'rgba(52, 52, 52, 0.3)',

    }
    
});

export default Profile;