import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';


export default function Home({ navigation }) {
    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('UserLogin');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Which type of User are you?</Text>
            <TouchableOpacity style={styles.navBtn} onPress={pressHandler}><Text style={styles.navText} >I am seeking to adopt</Text></TouchableOpacity>
            <TouchableOpacity style={styles.navBtn}><Text style={styles.navText} >I am a shelter seeking pet owners</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 18,
        color: "white"
    },
    navBtn: {
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    navText: {
        color: "white"
    }
});