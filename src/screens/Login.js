import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


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
            <View>
                <Text style={styles.titulo}>LOG IN</Text>

                {/* Formulario de Login */}
                <View style={styles.formContainer}>

                {/* Campo para email */}
                    <TextInput
                        style={styles.field}
                        keyboardType='email-address'
                        placeholder='email'
                        onChangeText= {text=> this.setState ({email: text})}
                    />
                    
                {/* Campo para contraseña */}
                    <TextInput
                        style={styles.field}
                        keyboardType='default'
                        placeholder='contrasenia'
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
            )
    }
}

const styles = StyleSheet.create({
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
    },
    boton:{
        color: '#fff'
    }    
})

export default Login; 