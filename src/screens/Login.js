import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            email: '',
            contrasenia:''
        }
    }

    onSubmit(){
        console.log(this.state.email);
    }

    render(){
        return(
            <ImageBackground source={require('../../assets/fondopag.jpeg')} style={styles.backgroundImage}>
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>LOG IN</Text>

                {/* Formulario de Login */}
                <View style={styles.formContainer}>

                {/* Campo para email */}
                    <TextInput
                        style={styles.field}
                        keyboardType='email-address'
                        placeholder='Email'
                        onChangeText= {text=> this.setState ({email: text})}
                    />
                    
                {/* Campo para contraseña */}
                    <TextInput
                        style={styles.field}
                        keyboardType='default'
                        placeholder='Contrasenia'
                        secureTextEntry= {true}
                        onChangeText= {text=> this.setState ({contrasenia: text})}
                    />
                                        
                    {/* Botón submit */}
                    <TouchableOpacity style={styles.touchable} onPress={ ()=> this.props.login(this.state.email, this.state.contrasenia) }>
                        <Text style={styles.boton}> Login </Text>
                    </TouchableOpacity>

                    {/* Mensaje de error */}
                    <Text>{this.props.errorLogin}</Text>

                </View>
            </View>
            </ImageBackground>
            )
    }
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: 'white',
        width: 800,
        alignSelf: 'center',
        marginTop: 100,
        marginBottom: 450,
        paddingBottom: 40
    },
    titulo:{
        textAlign: 'center',
        color: '#353E55',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
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

export default Login; 