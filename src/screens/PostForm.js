import { NavigationRouteContext } from "@react-navigation/native";
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase/config'

class PostForm extends Component{
    constructor(props){
        super(props)
        this.state={
           
        }
    }


    render(){
        return(
            <View >
                <Text>
                    Subir posteos
                </Text>
            </View>
        )
    }
}


export default PostForm;