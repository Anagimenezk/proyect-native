import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity,ImageBackground} from 'react-native';


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
        <View style={styles.principalContainer}>
            <ImageBackground source={require('../../assets/fondopag1.jpeg')}>
            <View style= {styles.container}>
                <Text style={styles.titulo}>REGISTER</Text>
                {/* Formulario de Login */}
                <View style={styles.formContainer}>

                    {/* Campo para email */}
                    <TextInput
                        style={styles.field}
                        keyboardType='email-address'
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

    principalContainer:{
        width:'100%',
    },
    container:{
        marginVertical: 30,
        marginTop: 80,
        marginHorizontal: 30, 
        backgroundColor: 'none',
        marginBottom: 400
    },
    error:{
        color: 'red'
    },
    titulo:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        color: 'rgb(240, 240, 240)'
    },
    formContainer:{
        marginHorizontal: 10,
        padding: 15,
        color: 'rgb(240, 240, 240)'
    },
    field:{
        borderRadius: 4,
        marginVertical: 10,
        height: 40,
        padding: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        color: 'rgb(240, 240, 240)'
    },
    touchable:{
        padding: 10,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(52, 52, 52, 0.3)', 
        color: 'rgba(52, 52, 52, 0.3)',
        marginTop: 10      
    },
    boton:{
        color: 'rgba(52, 52, 52, 0.4)',
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default Register; 