import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect} from 'react';

import TextInputLogin from "./TextInputLogin";
import ButtonLoginSignUp from "./ButtonLoginSignUp";

import { useLogin } from "../context/LoginProvider";


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setLoggedIn, setUserToken, setUserID, setUserName, userToken , loggedIn, userID, userName} = useLogin();

  const PostLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await fetch("https://social-network-v7j7.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json();

      console.log(data);

      //errores de validacion
      if (data.errors) {
        throw new Error(data.errors[0].msg);
      } else if (data.error) {
        throw new Error(data.error);
      } else if (data.token) {
        //obtenemos el token, quitamos el error y pa dentro
      
        setUserToken(data.token);
        setUserID(data.userId);
        setUserName(data.username);
        setLoggedIn(true);
      } 

    } catch (error) {
      //errores de codigo o de red
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.log(error.message);
      } else {
        //errores que el servidor nos manda
        setErrorMessage(String(error));
        console.log(error);
      }
    } finally {
        setIsLoading(false);
    } 
  }

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
            submit = {() => PostLogin()}
            title = {isLoading ? "Logging In..." : "Login"}
            colorUnpressed = "#81008a"
            colorPressed = "#4b004f"
        />
        <Text style = {styles.errorText}>{errorMessage}</Text>
        {isLoading && <ActivityIndicator size = "large" color = "#81008a" />}
    </View>
  );
};

export default UserLogin;


const styles = StyleSheet.create({
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
