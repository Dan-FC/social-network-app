import { StyleSheet, Text, View, TextInput, Button} from "react-native";
import React, { useState} from 'react';

import TextInputLogin from "./TextInputLogin";
import ButtonLoginSignUp from "./ButtonLoginSignUp";

import { useLogin } from "../context/LoginProvider";


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoggedIn } = useLogin() || { console: "error" }; 

  return (
    <View>
        <TextInputLogin 
            placeholder = "Email"
            onChangeText = {setEmail}
            value = {email}
        />
        <TextInputLogin 
            placeholder = "Password"
            onChangeText = {setPassword}
            value = {password}
            secureTextEntry = {true}
        />
        <ButtonLoginSignUp 
            submit = {() => setLoggedIn(true)}
            title = "Login"
            colorUnpressed = "#81008a"
            colorPressed = "#4b004f"
        />
    </View>
  );
};

export default UserLogin;


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#81008a",
    padding: 20,
    borderRadius: 5,
    fontSize: 20,
    width: 340,
    alignSelf: "center",
    height: 40,
    alignContent: "center",
  }
});
