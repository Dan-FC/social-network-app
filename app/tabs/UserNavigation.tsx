import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
import SignUp from "./SignUp";
import Login from "./Login";
// file change
function ToSignUpNavigator({ navigation }: { navigation: NavigationProp<any> }) {
  return (
    <View>
        <Login />  
        <Pressable style = {styles.belowText}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text>Don't have an account</Text>
          <Text style = {styles.blueText}>Sign Up</Text>
        </Pressable>
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


const styles = StyleSheet.create({
  
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