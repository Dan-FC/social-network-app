import { StyleSheet, Text, View, Pressable } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

import SignUp from "./SignUp";
import Login from "./Login";


// esta función bien loca que me avente pasa la logíca de navegar a Login o a Sign Up
function ToSignUpOrLoginNavigator({ newUser, navigation }: { newUser: boolean, navigation: NavigationProp<any> }) {
  const screen = newUser ? "Sign Up" : "Login";

  return (
    <View style = {styles.container}> 
        {/* aqui invertimos newUser porque siempre inicia con Login */}
        {!newUser == true ? <SignUp /> : <Login />} 
        <Pressable style = {styles.belowText}
          onPress={() => navigation.navigate(screen)}>
          {newUser == true ?  <Text>Don't have an account? </Text> : <Text>Already have an account? </Text>}
          <Text style = {styles.blueText}>{screen}</Text>
        </Pressable>
    </View>
  );
}

const UserNavigation = () => {
  return (
      <Stack.Navigator initialRouteName =  "Login">
          <Stack.Screen name="Login">
            {/* props es un objeto que se pasa a la funcion ToSignUpOrLoginNavigator */}
            {props => <ToSignUpOrLoginNavigator {...props} newUser={true} />}
            {/* ...props sirve para pasar las propiedades de la navegacion */}
          </Stack.Screen>
          <Stack.Screen name="Sign Up">
            {props => <ToSignUpOrLoginNavigator {...props} newUser={false} />}
          </Stack.Screen>
      </Stack.Navigator>
  )
}

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