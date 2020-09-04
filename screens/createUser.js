import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CreateUser({ navigation }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    
    const pressHandler = () => {
        navigation.push('AdditionalInfo');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Create Account</Text>

            <View style={styles.inputView}>
            <TextInput
            style={styles.inputText}
            placeholder="Enter First Name"
            placeholderTextColor="#003f5c"
            onChangeText={text => setFirstName(text)}/>
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.inputText}
            placeholder="Enter Last Name"
            placeholderTextColor="#003f5c"
            onChangeText={text => setLastName(text)}/>
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.inputText}
            placeholder="Enter Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)}/>
        </View>

        <View style={styles.inputView}>
            <TextInput secureTextEntry
            style={styles.inputText}
            placeholder="Set Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}/>
        </View>

        <View style={styles.inputView}>
            <TextInput secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword2(text)}/>
        </View>

        <TouchableOpacity style={styles.createBtn} onPress = {pressHandler}><Text style={styles.createText} >CONFIRM</Text></TouchableOpacity>

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
    createBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      createText:{
          color:"white"
      },
      forgot:{
          color: "white"
      }
});