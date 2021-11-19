import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';

import {Camera} from 'expo-camera';
import {db,storage} from '../firebase/config'

class MyCamera extends Component{
    constructor(props){
        super(props)
        this.state = {
            permission: false, //permisos de la camara en el dispositivo 
            photo: '', //guardar url o uri de la foto
            showCamera:true,
        }
        this.camera //es la referencia a esta camara
    }

    componentDidMount(){
        Camera.requestMicrophonePermissionsAsync()
        .then(()=>{
            this.setState({
                permission: true,
            })
        })
        .catch(error=> console.log(error))
        //console.log(Camera)
        //console.log(this.camera)
    }

    takePicture(){
        this.camera.takePictureAsync()
        .then((photo)=>{
            this.setState({
                photo: photo.uri, //tiene adentro la ruta inetrna temporal a la foto
                showCamera: false,
            })
        })
        .catch(error=>(console.log(error)))
    }

    savePhoto(){
        fetch(this.state.photo)
        .then( res=> res.blob()) //recibe un repsonse para archivos binarios
        .then( image => {
                //vamos a guardar la ftoo en storage y obtener la url publica

                //crear el nombre del archivo de la foto
            const ref= storage.ref(`photos/${Date.now()}.jpg`) //creamos el nombre casi irreptible de nuestras fotos
            ref.put(image)// lo que recibimso del priemr then. 
            //put es metodo asincronico con su then y catch
                .then(()=>{
                    ref.getDownloadURL()
                    //metodo asincornico con the y catch
                        .then( url => {
                            this.props.onImageUpload(url)
                        //le pasamos oor props la informaicon al padre (formulario) que es quien sabe guardar la info y mostrarla
                            this.setState({
                            photo:'',
                            })
                    })
                        .catch( error=> console.log(error))

                })
                .catch( error=> console.log(error))
        })
        .catch( error => conosle.log(error))
    }

    clearPhoto(){

        //vaciar el estado de la foto

        this.setState({
            photo:'',
            showCamera:true,
        })

    }
    render(){
        return(
        <View style={styles.container}>
            { this.state.permission ?

                this.state.showCamera === false ?
                <React.Fragment>
                    <Image
                    style={styles.cameraBody}
                    source= {{uri:this.state.photo}}
                    /> 

                    <View style= {styles.contenedorItems }>
                        <TouchableOpacity style={styles.touchable} onPress={()=> this.savePhoto()}>
                            <Text style={styles.textButton} >Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style= {styles.touchable} onPress={()=> this.clearPhoto()}>
                            <Text style={styles.textButton} >Rechazar</Text>
                        </TouchableOpacity>

                    </View>
                    </React.Fragment>  
                    
                    :

            <View style={styles.container}>
                <Camera
                style= {styles.cameraBody}
                type=  {Camera.Constants.Type.back}
                ref={(reference)=> this.camera = reference} //referencia de que camara estas usando, para aclarar que estas usanod esta caamara
                //la referewncia busca esta camara y al almacena en una porpiedad llamada this.camera
                />
                <TouchableOpacity style={styles.touchable} 
                onPress={()=> this.takePicture()}>
                    <Text style={styles.textButton}>
                        Sacar Foto
                    </Text>
                </TouchableOpacity>
            </View>
             :
                 //render de la camara 
             
                 //Mensaje 
            <Text>No tienes permiso para usar la camara </Text>
            }
        </View>
           
           


        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    cameraBody:{
        flex: 7,

    },
    button:{
        flex:1,
        justifyContent:'center'
    },
    textButton:{
        color:'#fff',
    },
    touchable:{
        flex:1,
        justifyContent:'center',
        padding: 10,
        backgroundColor: '#a1a7ff',
        marginVertical: 20,
        marginHorizontal: 10, 
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#7478b8', 
        backgroundColor: '#a1a7ff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',  
    },
    textButton:{
        color:'#fff'
    },
    contenedorItems:{
        flexDirection:'row', 
    },
    touchableText:{
        fontWeight: 'bold',
        fontSize: 10,
        color:'#fff',
        textAlign: 'center' },
    
    
})

export default MyCamera;