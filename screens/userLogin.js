import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';


export default function UserLogin ({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    const pressHandler = () => {
        if(email === '' && password === '')
        navigation.push('CreateUser');
    }

    return (
        <View style={styles.container}>

        <Text style={styles.logo}>PetQuest</Text>
        <View style={styles.inputView}>
            <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)}/>
             
        </View>

        <View style={styles.inputView}>

        <TextInput secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setPass(text)}/>
        </View>

        <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress = {pressHandler}><Text style={styles.loginText} >LOGIN</Text></TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.forgot} onPress = {pressHandler}>Don't have an account? Register here.</Text>
        </TouchableOpacity>

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

    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height: 50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    logo: {
        fontWeight: "bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
    }, 
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
          color:"white"
      },
      forgot:{
          color: "white"
      }
});