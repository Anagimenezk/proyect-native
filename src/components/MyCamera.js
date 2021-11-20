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
                <TouchableOpacity style={styles.sacarFoto} 
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
    button:{
       
    },
    textButton:{
        color:'#fff',  
    },
    touchable:{
        flex:1,
        justifyContent:'center',
        padding: 10,
        backgroundColor: '#BFD8B8',
        marginVertical: 20,
        marginHorizontal: 10, 
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',  
        fontWeight: 'bold'
    },
    textButton:{
        color:'#fff',
        fontSize:15,
    },
   
    contenedorItems:{
        flexDirection:'row', 
        backgroundColor: 'rgb(60, 60, 60)',
        height: 80
    },
    touchableText:{
        fontWeight: 'bold',
        fontSize: 10,
        color:'#fff',
        textAlign: 'center' },
    
    
})

export default MyCamera;