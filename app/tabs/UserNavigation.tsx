import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
import SignUp from "./SignUp";
import Login from "./Login";


function ToSignUpNavigator({ navigation }: { navigation: NavigationProp<any> }) {
  return (
    <View>
        <Login />
        <Button
        title="SignUp"
        onPress={() => navigation.navigate("SignUp")}
        />
    </View>
  );
}

function ToLoginInNavigator({ navigation }: { navigation: NavigationProp<any> }) {
    return (
      <View>
          <SignUp />
          <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
          />
      </View>
    );
  }

const UserNavigation = () => {
  return (
    <NavigationContainer independent = {true}>
        <Stack.Navigator initialRouteName =  "Login">
            <Stack.Screen name="Login" component = {ToSignUpNavigator} />
            <Stack.Screen name="SignUp" component = {ToLoginInNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserNavigation;