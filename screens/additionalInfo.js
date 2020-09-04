import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AdditionalInfo({ navigation }) {

    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    
    const pressHandler = () => {
        navigation.push('AdditionalInfo');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Additional Info</Text>

          
        <View style={styles.inputView}>
            <TextInput
            style={styles.inputText}
            placeholder="Enter Address"
            placeholderTextColor="#003f5c"
            onChangeText={text => setAddress(text)}/>
        </View> 

        <View style={styles.inputView}>
            <TextInput
            style={styles.inputText}
            placeholder="Enter Phone Number"
            placeholderTextColor="#003f5c"
            onChangeText={text => setPhoneNum(text)}/>
        </View>

        <TouchableOpacity style={styles.createBtn} onPress = {pressHandler}><Text style={styles.createText} >REGISTER</Text></TouchableOpacity>

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
      loginText:{
          color:"white"
      },
      forgot:{
          color: "white"
      }
});