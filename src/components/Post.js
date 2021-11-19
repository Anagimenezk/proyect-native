import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, Image, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { DrawerItemList } from '@react-navigation/drawer';




class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           myLike:false,
           showModal: false, //para la vista del modal 
           comment:'', //limpiar el campo cuando lo tenga armar, no aparezca el comentario que pusieorn antes
        }
    }
    
    componentDidMount(){
        if(this.props.postData.likes){
            this.setState({
                likes: this.props.postData.data.likes.length,
                myLike: this.props.postData.data.likes.includes (auth.currentUser.email)
            //mira el array de likes y se fija si esta 
            })
        }
    }
    darLike(){
        //Agregar mi usuario a un array de usuario que likearon.
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                likes: this.state.likes + 1,
                myLike: true,
            })
        })

        //Cambiar estado
    }

    quitarLike(){
         //quitar mi usuario a un array de usuario que likearon.
            //Updatear el registro (documento)
            db.collection('posts').doc(this.props.postData.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=> {
                this.setState({
                    likes: this.state.likes - 1,
                    myLike: false,
                })
            })
    }

    showModal(){
        this.setState({
            showModal: true,
        })
    }

    hideModal(){
        this.setState({
            showModal:false,
        })
    }

    guardarComentario(){
        console.log('guardar comentario')
       
         //armar el comentario que vamos a guardar
        let oneComment = {
            createdAt: Date.now(),
            owner: auth.currentUser.email,
            comment: this.state.comment,
        }
     //Guradsrlo en una coleccion => modificar el posteo 
     //Identificar el documento donde queremos guardar las cosas, que queremos hacer 
     //Generar array y agregarle el elemento ue tenemos entre parentesis (El comentario) 
        db.collection('posts').doc(this.props.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
    //conseguir y limpiar el estado
        .then(()=> 
        this.setState({
            comment:'',
        }))
    }

    render(){
        console.log(this.props);
        return(
        
    <View style={styles.principalContainer}>
            <View style={styles.contanier}>
        {/* CADA POST  */}
             <Image
             style={styles.image}
             source={{uri:this.props.postData.data.photo }}
             resizeMode='contain'/>

          <View style={styles.descriptionContainer}>
            <Text style= {styles.user}>{this.props.postData.data.owner}: {this.props.postData.data.texto}</Text> 
            
        
          </View>
        <View style={styles.contenedorItems}>
        <View style={styles.contenedorLikes}>

    <Text style={styles.likes}> {this.state.likes} </Text>  
    {/* depediendo si esta en true or false el my like te meustra el me gusta o el quitar like */}
         {this.state.myLike == false ? 
         

             <TouchableOpacity onPress={()=>this.darLike()}>
                 <Image
                 style={styles.imageLike}
                 source={{uri:'https://img.icons8.com/ios/50/000000/like--v1.png'}}
                 resizeMode='contain' />
                 
             </TouchableOpacity>   :

            <TouchableOpacity  onPress={()=>this.quitarLike()}>
                <Image
                style={styles.imageLike}
                source={{uri:'https://img.icons8.com/color/48/000000/like--v3.png'}}
                resizeMode='contain'
                />
                
            </TouchableOpacity>  }  

        </View>

    {/* ver modal  */}   
            <TouchableOpacity style={styles.touchable} onPress={()=> this.showModal()}>
                <Text style={styles.textButton}>Ver comentarios</Text>
            </TouchableOpacity>
        </View>

        {/* MODAL DE COMENTARIOS  */}
                {this.state.showModal ? 
                
                <Modal 
                  style={styles.modalContainer}
                  visible= {this.state.showModal}
                  animationType='slide'
                  transparent={false} 
                >
                 {/* cerrar modal */}
                     <TouchableOpacity onPress= {()=>this.hideModal()}>
                        <Text style={styles.closeButton}> X</Text>
                    </TouchableOpacity>
                {  /* formulairo para nuevos comentarios */}  
                <FlatList
                data={this.props.postData.data.comments} //el array de datos que creamos
                keyExtractor={(comment)=>comment.createdAt.toString()} //primer parametro que fuciona para cada item del array y despues en cad auno bsuca la fecha de ceracion y lo passa a cadena de texto
                renderItem={({item})=> <Text>{item.owner} : {item.comment} </Text>}
                />

                {/* formulairo para nuevos comentarios */}
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Comentar"
                            keyboardType="default"
                            multiline
                            onChangeText={(text)=> this.setState({comment:text})}
                            value= {this.state.comment}
                        />
                        <TouchableOpacity 
                        style={styles.button}
                        onPress= {()=> this.guardarComentario()}>
                            <Text style={styles.textButton}>
                                Guardar comentario
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal> :
                
                <Text></Text>
                 }  

                
            </View>
    </View>
        )
    }

}


const styles = StyleSheet.create({
    principalContainer:{
        backgroundColor:'#CEE5D0', 
    },
    contanier:{
        marginBottom: 20,
        borderRadius:4,
        borderColor: "#000000",
        borderWidth: 1,
        padding: 10,
        marginVertical: 30,
        marginHorizontal: 30,
        backgroundColor: '#adc7af' 
       
    },
    modalContainer:{
        width: '97%',
        borderRadius: 4,
        padding: 5,
        alignSelf: 'center',
        boxShadow: 'rgb(204 204 204) 0px 0px 9px 7px', //no anda
        marginTop: 20,
        marginBottom:10,
    },
    closeButton:{
        color:'#fff',
        padding:5,
        backgroundColor: '#a1a7ff',
        alignSelf:'flex-end',
        borderRadius:4,
        paddingHorizontal: 8,

    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#a1a7ff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#7478b8'
    },
    textButton:{
        color: '#fff'
    },
    image:{
        height: 300
    },
    textoPost:{
        marginVertical: 4,
        height: 10,
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    contenedorLikes:{
        flexDirection: 'row',
        width: '25%',
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    likes:{
        height:20,
        fontWeight:'bold',
        marginTop: 20,
        marginLeft: 10, 
        marginTop: 10,
        
    },
    imageLike:{
        height: 20, 
        width: 25,
        marginTop: 10,  
        marginLeft: 2,
        marginRight: 30,  
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    user:{
        width: '80%',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 20,
    },
    touchable:{
        textAlign: 'center',
        width: '35%',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#7478b8', 
        backgroundColor: '#a1a7ff',
        marginHorizontal: 5,
    },
    contenedorItems:{
        flexDirection:'row', 
    },
    descriptionContainer:{
        flexDirection: 'row', 
    }
    
})

export default Post