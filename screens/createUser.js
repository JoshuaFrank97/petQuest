import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global'

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
        <View style={globalStyles.container}>
            <Text style={globalStyles.menuTitle}>Create Account</Text>

            <View style={globalStyles.inputView}>
            <TextInput
            style={globalStyles.inputText}
            placeholder="Enter First Name"
            placeholderTextColor="#003f5c"
            onChangeText={text => setFirstName(text)}/>
        </View>

        <View style={globalStyles.inputView}>
            <TextInput
            style={globalStyles.inputText}
            placeholder="Enter Last Name"
            placeholderTextColor="#003f5c"
            onChangeText={text => setLastName(text)}/>
        </View>

        <View style={globalStyles.inputView}>
            <TextInput
            style={globalStyles.inputText}
            placeholder="Enter Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)}/>
        </View>

        <View style={globalStyles.inputView}>
            <TextInput secureTextEntry
            style={globalStyles.inputText}
            placeholder="Set Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}/>
        </View>

        <View style={globalStyles.inputView}>
            <TextInput secureTextEntry
            style={globalStyles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword2(text)}/>
        </View>

        <TouchableOpacity style={globalStyles.menuBtn} onPress = {pressHandler}><Text style={globalStyles.menuText} >CONFIRM</Text></TouchableOpacity>

        </View>
    )
}