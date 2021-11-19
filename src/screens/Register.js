import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native';


class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            email: '',
            username: '',
            contrasenia:''
        }
    }

    render(){
        return(
            <View style={styles.body}>
            <ImageBackground source={require('../../assets/fondopag.jpeg')} style={styles.backgroundImage}>
                
                    <View style={styles.contenedor}>
                        <Text style={styles.titulo}>REGISTER</Text>
                        {/* Formulario de Login */}
                        <View style={styles.formContainer}>

                            {/* Campo para email */}
                            <TextInput
                                style={styles.field}
                                keyboardType='Email-address'
                                placeholder='Email'
                                onChangeText= {text=> this.setState ({email: text})}
                            />
                                    
                            {/* Campo para userName */}
                            <TextInput
                                style={styles.field}
                                keyboardType='default'
                                placeholder='Username'
                                onChangeText= {text=> this.setState ({username: text})}
                            />
                            
                            {/* Campo para contraseña */}
                            <TextInput
                                style={styles.field}
                                keyboardType='default'
                                placeholder='Contrasenia'
                                secureTextEntry= {true}
                                onChangeText= {text=> this.setState ({contrasenia: text})}
                            />
                            
                            {/* Botón submit 
                            cambio: en vez de poner submit en el boton, pongo el metodo register que traje desde el menu
                            */}
                            <TouchableOpacity style={styles.touchable} onPress={ ()=> this.props.register(this.state.email, this.state.contrasenia, this.state.username)}>
                                <Text  style={styles.boton}> Registrarse </Text>
                            </TouchableOpacity>

                        <Text style={styles.error}>{this.props.errorRegister}</Text>
                        </View>
                    </View>
                    </ImageBackground>
                </View>
            
        )
            
    }
}

const styles = StyleSheet.create({
    error:{
        color: 'red'
    },
    contenedor:{
        backgroundColor: 'white',
        width: 800,
        height: 400,
        marginBottom: 400,
        alignSelf: 'center',
        marginTop: 100
    },
    titulo:{
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#353E55',
        fontSize: 20,
        marginTop: 30
    },
    formContainer:{
        marginHorizontal: 40,
        padding: 40
    },
    field:{
        borderColor: '#353E55',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        height: 40,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F4F4F4'
    },
    touchable:{
        backgroundColor: '#B2D3BE',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#698474',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
    },
    boton:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15   
    }
})

export default Register; 