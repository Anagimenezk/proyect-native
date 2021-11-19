import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
import Buscador from './Buscador';
import Register from '../screens/register';
import Login from '../screens/Login';
import Perfil from '../screens/Profile';
import PostForm from '../screens/PostForm';
import { auth } from '../firebase/config';

const Drawer = createDrawerNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn:false,
            user:''
        }
    }
    
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({
                    loggedIn:true,
                    user: user,
                })
            }
        })
    }

    register(email, pass, username){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( (res)=>{
                console.log('Registrado');
                console.log(email,pass, username);
              res.user.updateProfile({displayName: username}).then(()=> {
                    console.log(auth.currentUser.displayName)
                })
            })
            .catch( error => {
                console.log(error);
            })
    }
    
    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
            .then( response => {
                this.setState({
                    loggedIn: true,
                    user:response.user,
                })
            })
            .catch(e => console.log(e))
    }

    logout(){
        auth.signOut()
            .then( (res)=>{
                this.setState({
                    user:'',
                    loggedIn: false,
                })
            })
            .catch()
    }

    render(){
        return(
            
            <NavigationContainer>
            {this.state.loggedIn == false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Registro" component={()=><Register register={(email, pass,username)=>this.register(email, pass, username)} />} />
                   
                    <Drawer.Screen name="Login" component={()=><Login login={(email, pass)=>this.login(email, pass)} />}/>
                </Drawer.Navigator> :
                <Drawer.Navigator>
                     <Drawer.Screen name="Home" component={()=><Home />} />
                     <Drawer.Screen name ="New Post" component={(drawerProps)=><PostForm drawerProps={drawerProps}/>}/>
                      <Drawer.Screen name="Perfil" component={()=><Perfil userData={this.state.user} logout={()=>this.logout() } />} />
                      <Drawer.Screen name="Buscador" component={()=> <Buscador/>}/>
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }

}

export default Menu