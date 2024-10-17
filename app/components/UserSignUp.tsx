import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Importar la función de navegación

import TextInputLogin from "./TextInputLogin";
import ButtonLoginSignUp from "./ButtonLoginSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation(); // Hook para usar la navegación

  const PostSignUp = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await fetch(
        "https://social-network-v7j7.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        }
      );
      const data = await response.json();

      console.log(data);

      // Validación de errores
      if (data.errors) {
        throw new Error(data.errors[0].msg);
      } else if (data.error) {
        throw new Error(data.error);
      } else if (data.token) {
        // Registro exitoso, navegamos de vuelta al Login
        navigation.navigate("Login" as never);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.log(error.message);
      } else {
        setErrorMessage(String(error));
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <TextInputLogin
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInputLogin
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInputLogin
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <ButtonLoginSignUp
        submit={() => PostSignUp()}
        title={isLoading ? "Signing Up..." : "Sign Up"}
        colorUnpressed="#81008a"
        colorPressed="#4b004f"
      />
      <Text style={styles.errorText}>{errorMessage}</Text>
      {isLoading && <ActivityIndicator size="large" color="#81008a" />}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
