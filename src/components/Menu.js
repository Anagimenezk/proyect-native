import React, {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
import Profile from '../screens/profile';
import PostForm from '../screens/postForm'
import { auth } from '../firebase/config';

const Drawer = createDrawerNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state = {
            logueado: false,
            errorRegister: "",
            errorLogin: "",
            userInfo: ""
        }
    }
componentDidMount(){
    auth.onAuthStateChanged(user => 
        this.setState({
            loggedIn: true, 
            userInfo: user, 
        }))
}


    //funcion que registre con firebase
    //la paso como prop al componente Register
    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass) //es asincronica, necesita then y catch
            .then(() =>{
                console.log('registrado')
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errorRegister: error.message
                })
            })
    }

    //login
    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass) 
            .then((response) =>{
                console.log('logueado')
                console.log(response);
                this.setState({
                    logueado: true,
                    userInfo: response.user
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errorLogin: error.message
                })
            })
    }

    //logout
    logout(){
        auth.signOut()
        .then(()=>{
            this.setState({
                logueado: false,
                user: ''
            })
        })
    }

    render(){
        return(
            this.state.logueado === false ?
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name ="Register" component={()=> <Register register={(email, pass)=> this.register(email, pass)} errorRegister={this.state.errorRegister}/> } />
                    <Drawer.Screen name ="Login" component={()=> <Login login={(email, pass)=> this.login(email, pass)} errorLogin={this.state.errorLogin}/>}/>
                </Drawer.Navigator>
            </NavigationContainer> :
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name ="Home" component={()=> <Home/>}/>
                    <Drawer.Screen name= "New Post" component={()=> <PostForm/>} />
                    <Drawer.Screen name ="My Profile" component={()=> <Profile/>}/>
                </Drawer.Navigator>
            </NavigationContainer>

        )
    }
}

export default Menu;