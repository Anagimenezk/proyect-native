import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';

import {Camera} from 'expo-camera';
import {db,storage} from '../firebase/config'

class MyCamera extends Component{
    constructor(props){
        super(props)
        this.state = {
            permission: false, 
            photo: '', 
            showCamera:true,
        }
        this.camera //es la referencia a esta camara
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
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
        this.camera.takePictureAsync() //metodo interno
        .then((photo)=>{
            this.setState({
                photo: photo.uri, //guardar la ruta inetrna temporal
                showCamera: false,//ocultar la camara
            })
        })
        .catch(error=>(console.log(error)))
    }


    savePhoto(){
        fetch(this.state.photo) //obtiene la foto desde su bicacion temporal, guardarla y ibtener url publica, enviar el daro al posteo 
        .then( res=> res.blob()) 
        .then( image => { 
        //vamos a guardar la ftoo en storage y obtener la url publica

           
            const ref= storage.ref(`photos/${Date.now()}.jpg`) 
            //creamos ruta inerna que aparece en firebase con su identificador unico 
            
            ref.put(image)// guarde en storage lo que recibimso del priemr then
   
                .then(()=>{ //necesitamos que consiga la url para que storage sepa donde esta el archivo y la guarde 
                    ref.getDownloadURL()
                    //trae la url del storage para depsues usarla en el postForm
                        .then( url => {
                            this.props.onImageUpload(url) 
                        
                            this.setState({
                            showCamera: true,
                            photo:'', //foto vacia para cuando volvamos a usar la camars
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
                    /> //preview photo

                    <View style= {styles.contenedorItems }>
                        <TouchableOpacity style={styles.touchable} onPress={()=> this.savePhoto()}>
                            <Image style={styles.logos} source={{uri:'https://img.icons8.com/office/160/000000/checked--v1.png'}} resizeMode='contain'/>
                        </TouchableOpacity>
                        <TouchableOpacity style= {styles.touchable} onPress={()=> this.clearPhoto()}>
                            <Image style={styles.logos} source={{uri:'https://img.icons8.com/office/80/000000/cancel.png'}} resizeMode='contain'/>
                        </TouchableOpacity>
                    </View>

                    </React.Fragment>  
                    
                    :

            <View style={styles.container}>
                <Camera
                style= {styles.cameraBody} 
                //definimos estilos para que la camara comparta espacio con el boton que toma la foto
                type=  {Camera.Constants.Type.back}
                //definimos camra frontal o trasera
                ref={(reference)=> this.camera = reference} 
                //referencia de que camara estas usando, para aclarar que estas usanod esta caamara
                //la referewncia busca esta camara y al almacena en una porpiedad llamada this.camera
                />
                <TouchableOpacity 
                    style={styles.sacarFoto} 
                    onPress={()=> this.takePicture()}>
                    <Image style={styles.fotoCamara} source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC/0lEQVRoge2Yu08UURTGzwURE7DUBFBrH0QTH7VRjBZCFvEZo/4BBLLRQrQ2JAKWWhkT/Q+w0kak1Ag2YKIBO9RErQSLxejPYs5kZpdluXfuzK6J8yWbO5M53znft3OfI5IjR44c/xWA7cAD4BPuWALuA9sabWIP8D2BgUp8A3Y3ysQW4KMKeQbsB5od+JuAA8BzzbEItGapeT0hl1XAnI8AoBWY11yXkuZpSkoUkaPaPjHGlJImUe5jvT2WNI+PkSPavvLIEeK1todTyFUOoABMAys1BukK0JZCrTbg5wZ1XgJ9ronvWsw0X4ErviZiNa9qzo0wapuwoIQScBPoTEtsUgCdwIhqAui1IU1r8EgdNDoBuKXapmyClzW4ow7anAB0qLYflc9MlWBERIwxa55ZFtssImdEpCAiB0Vkhz5aEpG3IjIpIpPGmNWE+e30hSMqYZGzRKt9LSwCAwlr2OlLYgRoBu7FhM4BRWAfwdTaptdFfRZiAnBay7I2EpooAYO1xKnpIaIZaNyxVjZGtDuFJo478HpiZvodeOkbATYTjYlBWzEx/rByFwgmifT0ORq5GBsT1lv4GL+ZaOd73pJTVZ/PplFEJOwSD40xv13JynmktwVPLeVwfCMfNHyvR71uzfE+VX2ORsJdQLtN/Do5tmqOZcv4TLpWiES7gAruHx8BvkY+a7vTI8cubb/4CPE1MqvtSY8cp7R946mlHI5j5IKGz3tMv+80x7lU9SVYEBeVMmTDqeAXYwtiiyUnfSMaP6CUEtDjwDsBrCrXeg3JzIhyJmJmhmt1M4IPc8WYiTHHWpkaaQLGiTAPXCdY7Nr11w3ciI0JgDH+pW18jNuv/X0jLLh0Jxt9WRx1WyTYgxVE5JCUH3VnJTjqPjXG/EqYP/ujbj2wnr5q/XNFCQ3/nlUJoEsv13xFqWZkRttrmSlKjlDTTM0oERGgT99eieCDWMPfDNAF3CY6Gp+2JY5azDyNwh3Xf6EXmCI6czQSy8ALbN9Ejhw5cuSoF/4CDSo8XNEMsDoAAAAASUVORK5CYII='}}
                    resizeMode='contain'
                    />
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
    fotoCamara:{
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    sacarFoto:{
        backgroundColor: 'rgb(60, 60, 60)',
        padding: 20,
    },
    contenedorItems:{
        flexDirection:'row', 
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgb(60, 60, 60)',
        height: 80,
        alignItems: 'center'
    },
    logos:{
        width: 40,
        height: 40 
    },
    touchable:{
        alignContent: 'center',
        padding: 15,
    },
    textButton:{
        color:'#fff',
        fontSize:15,
    },
    touchableText:{
        fontWeight: 'bold',
        fontSize: 10,
        color:'#fff',
        textAlign: 'center' 
    },
    
    
})

export default MyCamera;