import { StyleSheet  } from "react-native";
import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Navigation from "./tabs/Navigation";
import UserNavigation from "./tabs/UserNavigation";
import LoginProvider from "./context/LoginProvider";

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <LoginProvider>
      <NavigationContainer independent = {true}>
        <UserNavigation />
      </NavigationContainer>
    </LoginProvider>
  );
}

const styles = StyleSheet.create({});

// La idea es que aqui se ponga un operador ternario que si el usuario esta logeado muestre la navegacion y si no muestre el login
