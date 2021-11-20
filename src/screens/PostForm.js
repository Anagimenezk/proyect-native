import { NavigationRouteContext } from "@react-navigation/native";
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase/config'
import MyCamera from '../components/MyCamera'

class PostForm extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            showCamera: true,
            url:'', //tiene que saber cual e sla url que nos devuelve la base de datsos que guardamos para pdoer crear la coleccion
        }
    }

    //ESTO TIRA ERROR 
    submitPost(){
        console.log('posteando...');
        db.collection('posts').add({
            owner: auth.currentUser.email,
            texto: this.state.textoPost,
            createdAt: Date.now(),
            photo: this.state.url,
        })
        .then( (res)=>{ //Limpiar el form de carga
            console.log(res);
            this.setState({
                textoPost:'',
            })
            //Redirección
            this.props.drawerProps.navigation.navigate('Home')
        })
        .catch(error => console.log(error))
    }

    onImageUpload(url){
        this.setState({
            showCamera:false,
            url: url,
        })
    }

    render(){
        return(
        <View style={styles.container}>
           {this.state.showCamera ?

            <MyCamera onImageUpload={(url)=> {this.onImageUpload(url)}} />
           : 
                <View style={styles.formContainer}>
                 <TextInput
                     style={styles.input}
                     onChangeText={(text)=>this.setState({textoPost: text})}
                        placeholder='Escribí aquí'
                        keyboardType='default'
                        multiline
                        value={this.state.textoPost}    
                        />
                 <TouchableOpacity style={styles.button} onPress={()=>this.submitPost()}>
                     <Text style={styles.textButton}>Guardar</Text>    
                    </TouchableOpacity>
                </View>
    
     } 
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:100,
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
    }

})

export default PostForm;