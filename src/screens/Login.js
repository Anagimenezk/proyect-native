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
                <ImageBackground source={require('../../assets/fondopag1.jpeg')}>
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
        marginVertical: 30,
        marginTop: 80,
        marginHorizontal: 30, 
        backgroundColor: 'none',
        marginBottom: 400,
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
        padding: 10
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

export default Login; 