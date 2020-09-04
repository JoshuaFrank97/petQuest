import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';


export default function Home({ navigation }) {
    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('UserLogin');
    }
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.menuText}>Which type of User are you?</Text>
            <TouchableOpacity style={globalStyles.menuBtn} onPress={pressHandler}><Text style={globalStyles.menuText} >I am seeking to adopt</Text></TouchableOpacity>
            <TouchableOpacity style={globalStyles.menuBtn}><Text style={globalStyles.menuText} >I am a shelter seeking pet owners</Text></TouchableOpacity>
        </View>
    )
}