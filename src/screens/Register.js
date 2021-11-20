import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity,ImageBackground, Image} from 'react-native';


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
                <Image style={styles.fotoR} source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADLUlEQVR4nO2aO2gUURiFz68Ro0RDRCJ2gpLCQlEIBO0UjLFSwfjAJr2NjWJjoTY+SsFGBBFULHw0IkRSiIiViFhYJaD4CEZ8o2vUz2Lu4ri6O7ObO4/F+zWzd+fO/c85e3dm985IgUAgEAgE/lesaAE+APok7ZPUK2lM0lkz+1msqpwAhoDP/MktYF6a45ueAUC3pH5JPU0c9l3SqJl9arZegpbFkiYkdf1j921JW8xs2lexXuAcUKE1znsR8reu7cC3OjUP+CqyDJho0XiVY17ERHo2AwOxdr0Q7iaN1ZGi2GxJ1yQtc2+NSjqlaOr9SKl52syepeybpGfI6akAg2Z238yuArskXZY0J9b9o4+Cu2OJngEKu3IQnfC+xvS8S5gJW30UveIGmwTmz3jA1nXUmk8K4aivwg9coeteBmxNQz3z9UJY6bP4E1fkordBm6s/CHxpYL7K+3gIaZmVhWhfEJ3wbkjqTNF9oaSNWYgoZAY08clXOZ6VkNwDKI15JybXAEpl3gnKLYDSmXeicgmglOadsMwDKK15Jy7TAEpt3gnMLIDSm3ciMwmgLcw7od4DaBvzTqzXANrKvBPsLQBgCX8vYDbiiA8Pjcj1z5CZTUoaUbRImsQJMzucsaRkfM0AYitJwB7ge5GffGo8BnAa6I+1h4Hp0n3na/ERAGBES2pvE0Iol3nJWwBrYybrhVA+85K3AA7VTPM3wJrY/lV+1DZPXleBTTXtHkkngU5JMrNHPou5k+xjYJuPwWY0A4Auottpr4ALwF6gd8bCGte84zTfTOqbeGfIA52SBiQ9NDNyqCdJs2u2dck8ADObkjSVdZ1WKfWyeB6EAIoWUDQhgKIFFE0IoGgBRRMCSNGn+hxQHr8afVHVmrjylCaAl27b17KcHAE6JK1wzRdJ/dMEMOa2q4EdrQrLkf2SFrnXY406poLoAckP7t/Ve2AEKN25A+gADvL7Qc5xYG7ScakeeQN2SroU6/9a0tPW5XrHJC2X1O3aFUkbzOyetwrAVreuV3bGgXXNJNdMCAskDUtaL2mpynNl+CbpuaLv/DUzqxSsJxAIBAKBQBvwCyWs6OrnAHdEAAAAAElFTkSuQmCC'}} 
                resizeMode='contain'/>
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
    fotoR:{
        width: 40,
        height: 40,
        alignSelf: 'center'
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