import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import Post from '../components/Post';

// import { Searchbar } from 'react-native-paper';
import { db } from '../firebase/config';



class Buscador extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos:'',
      buscar:'', 
    }
  }

  buscarPosteo(){
    db.collection('posts').where('owner','==', this.state.buscar)
    .orderBy('createdAt','desc')
    .limit(10)
     .onSnapshot(
      docs => {
        console.log(docs);
        //Array para crear datos en formato más útil.
        let posts = [];
        docs.forEach( doc => {
          posts.push({
            id: doc.id,   
            data: doc.data(),
          })
          this.setState({
            posteos: posts,
          })
        })
        console.log(posts);
      }
    )
  }
  render(){
    return(
  <View style={styles.buscador} >
    <View style= {styles.formContainer}>
       <TextInput style={styles.field}
          keyboardType='default'
          placeholder='Buscar posteos'
          onChangeText= {text=> this.setState ({buscar: text})}
        />
        <TouchableOpacity 
          onPress={()=> this.buscarPosteo()}
          style={styles.button}>
             <Text style={styles.button}>Buscar</Text>
        </TouchableOpacity>
    </View>
    {this.state.posteos.length > 0 ?
        <FlatList 
          data= { this.state.posteos }
          keyExtractor = { post => post.id}
          renderItem = { ({item}) => <Post postData={item} />} // <Text>{item.data.texto}</Text>//Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
        /> :

       <Text>No se encontraron posteos de este usuario</Text> 

    }
        
  </View>
      )
  }
}



 

const styles = StyleSheet.create ({
  buscador:{
    padding: 15,
    paddingHorizontal:10,
  },
  button:{
    color:'#fff',
    padding:2,
    backgroundColor: '#a1a7ff',
    alignSelf:'flex-end',
    paddingHorizontal: 4,
    borderColor: '#28a745',
    marginVertical: 8,
    marginHorizontal: 10, 
  },
  formContainer:{
    flexDirection: 'row',
    marginHorizontal: 10,
    padding: 10
},
field:{
    width: '90%',
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
    height: 20,
    paddingHorizontal: 10,
    paddingVertical: 15
},

})



export default Buscador;