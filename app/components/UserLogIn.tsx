import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
import signUp from "../tabs/SignUp";


function UserLogInFunc({ navigation }: { navigation: NavigationProp<any> }) {
  return (
    <View>
      <Button
        title="SignUp"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
}

const UserLogIn = () => {
  return (
    <NavigationContainer independent = {true}>
        <Stack.Navigator initialRouteName =  "Login">
            <Stack.Screen name="Login" component = {UserLogInFunc} />
            <Stack.Screen name="Signup" component = {signUp} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserLogIn;