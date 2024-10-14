import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer, Link } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Navigation from "./tabs/Navigation";
import LogIn from "./tabs/LogIn";

const Tab = createBottomTabNavigator();

export default function App() {
  return <LogIn />;
}

const styles = StyleSheet.create({});

// La idea es que aqui se ponga un operador ternario que si el usuario esta logeado muestre la navegacion y si no muestre el login
