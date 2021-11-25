import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import Post from '../components/Post';

// import { Searchbar } from 'react-native-paper';
import { db,auth } from '../firebase/config';



class Buscador extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos:[],
      buscar:'', 
    }
  }

  buscarPosteo(){
    db.collection('posts').where('owner','==', this.state.buscar)
    //.orderBy('createdAt','desc')
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
          
        })

        this.setState({
          buscar: '',
          posteos: posts,
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
           keyboardType='email-adress'
           value= {this.state.buscar}
           placeholder='Buscar usuarios'
           onChangeText= {(text)=> this.setState ({buscar: text})}
          />
          <TouchableOpacity 
           onPress={()=> this.buscarPosteo()}
            style={styles.button}>
                <Image style={styles.logoBuscar} source={{uri:'https://img.icons8.com/ios/50/000000/search--v1.png'}} resizeMode='contain'/>
          </TouchableOpacity>
      </View>
    
    {this.state.posteos.length >= 1 ?
          <FlatList 
           data= { this.state.posteos }
           keyExtractor = { post => post.id.toString()}
           renderItem = { ({item}) => <Post postData={item} />} // <Text>{item.data.texto}</Text>//Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
          /> :

        <Text style={styles.mensaje}>No se encontraron posteos de este usuario</Text> 

      }
        
  </View>
      )
  }
}



 

const styles = StyleSheet.create ({
  buscador:{
    padding: 15,
    paddingHorizontal:10,
    backgroundColor: 'white',
    paddingBottom: 600
  },
  button:{
    padding:10,
    backgroundColor: '#BFD8B8',
    alignSelf:'flex-end',
    borderColor: '#28a745',
    marginLeft: 10,
    borderRadius: 4
  },
  formContainer:{
    flexDirection: 'row',
    padding: 10
},
field:{
    borderRadius: 4,
    height: 40,
    padding: 20,
    color: 'rgb(90, 90, 90)',
    borderColor: 'rgb(180, 180, 180)',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '80%',
    fontSize: 15,
},
logoBuscar:{
  width: 20,
  height: 20,
  padding: 10
},
contenedorItems:{
  flexDirection: 'row',

},
mensaje:{
  fontWeight: '400',
  marginTop: 30,
  marginLeft: 10
}
})



export default Buscador;