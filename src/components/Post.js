import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, Image} from 'react-native';
import { db } from '../firebase/config';
import firebase from 'firebase';

import { auth } from '../firebase/config';
import { FlatList, TextInput } from 'react-native-gesture-handler';

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
            <View style={styles.contanier}>
        {/* CADA POST  */}

            <Text style= {styles.user}>{this.props.postData.data.owner} </Text>  
             <Image
             style={styles.image}
             source={{uri:this.props.postData.data.photo }}
             resizeMode='contain'
             />

              <Text style={styles.textoPost} >{this.props.postData.data.texto}</Text>
             <Text style={styles.likes} >likes: {this.state.likes} </Text>  
             {/* depediendo si esta en true or false el my like te meustra el me gusta o el quitar like */}
         {this.state.myLike == false ? 
             <TouchableOpacity style={styles.touchable} onPress={()=>this.darLike()}>
                 <Text>Me gusta</Text>
             </TouchableOpacity>   :

            <TouchableOpacity style={styles.touchable} onPress={()=>this.quitarLike()}>
                <Text>Quitar like</Text>
             </TouchableOpacity>   
                }  

                {/* ver modal  */}   
                <TouchableOpacity style={styles.touchable} onPress={()=> this.showModal()}>
                    <Text>Ver comentarios</Text>
                </TouchableOpacity>

                {/* MODAL DE COMENTARIOS  */}
                {this.state.showModal ? 
                
                <Modal 
                  style={styles.modalContainer}
                  visible= {this.state.showModal}
                  animationType='slide'
                  transparent= {false} 
                >
                 {/* cerrar modal */}
                     <TouchableOpacity onPress= {()=> this.hideModal()}>
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
        )
    }

}


const styles = StyleSheet.create({
    contanier:{
        marginBottom: 20,
        borderRadius:4,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
    },
    modalContainer:{
        width: '97%',
        borderRadius: 4,
        padding: 5,
        alignSelf: 'venter',
        boxShadow: 'rgb(204 204 204) 0px 0px 9px 7px', //no anda
        marginTop: 20,
        marginBottom:10,
    },
    closeButton:{
        color:'#fff',
        padding:5,
        backgroundColor: '#dc3545',
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
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    image:{
        height: 200
    },
    textoPost:{
        marginVertical: 4,
        height: 10,
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    likes:{
        marginVertical: 4,
        height: 10,
        paddingHorizontal: 4,
        paddingVertical: 4,
        fontWeight:'bold',
    },
    user:{
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },
    touchable:{
        textAlign: 'left',
        width: 120,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#a1a7ff',  
    }
})

export default Post