import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from "@react-navigation/native";

import Navigation from "./Navigation";

//importamos el contexto
import { useLogin } from "../context/LoginProvider";

const Stack = createNativeStackNavigator();


import SignUp from "./SignUp";
import Login from "./Login";


function ToSignUpOrLoginNavigator({ screen, navigation }: { screen: string, navigation: NavigationProp<any> }) {
  return (
    <View style = {styles.container}> 
        <Login />  
        <Pressable style = {styles.belowText}
          onPress={() => navigation.navigate(screen)}>
          <Text>Don't have an account? </Text>
          <Text style = {styles.blueText}>{screen}</Text>
        </Pressable>
    </View>
  );
}



const LoginSignNavigator = () => {
  return (
      <Stack.Navigator initialRouteName =  "Login">
          <Stack.Screen name="Login">
            {/* props es un objeto que se pasa a la funcion ToSignUpOrLoginNavigator */}
            {props => <ToSignUpOrLoginNavigator {...props} screen="Sign Up" />}
            {/* ...props sirve para pasar las propiedades de la navegacion */}
          </Stack.Screen>
          <Stack.Screen name="Sign Up">
            {props => <ToSignUpOrLoginNavigator {...props} screen="Login" />}
          </Stack.Screen>
      </Stack.Navigator>
  )
}

const UserNavigation = () => {
  const { loggedIn } = useLogin() || { console: "error" };
  return (
    loggedIn ? <Navigation /> : <LoginSignNavigator />
  );
};

export default UserNavigation;


const styles = StyleSheet.create({
  container: {
    height: 750,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
  },
  belowText: {
    width: 360,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  blueText: {
    color: "blue",
    marginRight: 10,
  },
});