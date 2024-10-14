import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState} from 'react';


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
        <TextInput 
            placeholder = "email"
            onChangeText = {setEmail}
            value = {email}
        />
        <TextInput 
            placeholder = "password"
            onChangeText = {setPassword}
            secureTextEntry = {true}
            value = {password}
        />
        <View style = {styles.button}>
          <Button
              title = "Login"
              onPress = {() => console.log(email)}
          />    
       </View> 
    </View>
  );
};

export default UserLogin;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#8a0000",
    padding: 20,
    borderRadius: 5,
    fontSize: 20,
  }
});