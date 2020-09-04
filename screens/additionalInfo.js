import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global'

export default function AdditionalInfo({ navigation }) {

    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const [isLoading, setLoading] = useState(true);
    /*
    const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
    */
    const pressHandler = () => {
       // console.log(data)
        navigation.push('AdditionalInfo');
        
    }
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.menuTitle}>Additional Info</Text>

          
        <View style={globalStyles.inputView}>
            <TextInput
            style={globalStyles.inputText}
            placeholder="Enter Address"
            placeholderTextColor="#003f5c"
            onChangeText={text => setAddress(text)}/>
        </View> 

        <View style={globalStyles.inputView}>
            <TextInput
            style={globalStyles.inputText}
            placeholder="Enter Phone Number"
            placeholderTextColor="#003f5c"
            onChangeText={text => setPhoneNum(text)}/>
        </View>

        <TouchableOpacity style={globalStyles.menuBtn} onPress = {pressHandler}><Text style={globalStyles.menuText} >REGISTER</Text></TouchableOpacity>

        </View>
    )
}
