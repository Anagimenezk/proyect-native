import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


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
            <View style= {styles.container}>
                <Text style={styles.titulo}>REGISTER</Text>
                {/* Formulario de Login */}
                <View style={styles.formContainer}>

                    {/* Campo para email */}
                    <TextInput
                        style={styles.field}
                        keyboardType='email-address'
                        placeholder='email'
                        onChangeText= {text=> this.setState ({email: text})}
                    />
                            
                    {/* Campo para userName */}
                    <TextInput
                        style={styles.field}
                        keyboardType='default'
                        placeholder='username'
                        onChangeText= {text=> this.setState ({username: text})}
                    />
                    
                    {/* Campo para contraseña */}
                    <TextInput
                        style={styles.field}
                        keyboardType='default'
                        placeholder='contrasenia'
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
        </View>
            )
            
    }
}

const styles = StyleSheet.create({

    principalContainer:{
        backgroundColor:'#CEE5D0', 
        width:'100%',
    },
    container:{
        marginVertical: 30,
        marginHorizontal: 30, 
        backgroundColor: '#fff',
    },
    error:{
        color: 'red'
    },
    titulo:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },
    formContainer:{
        marginHorizontal: 10,
        padding: 10
    },
    field:{
        borderColor: '#000000',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        height: 20,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    touchable:{
        backgroundColor: '#a1a7ff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#7478b8', 
        color: '#fff'      
    },
    boton:{
        color: '#fff'
    }
})

export default Register; 