import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer, Link } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Navigation from "./tabs/Navigation";
import UserNavigation from "./tabs/UserNavigation";

const Tab = createBottomTabNavigator();

export default function App() {
  return <UserNavigation />;
}

const styles = StyleSheet.create({});

// La idea es que aqui se ponga un operador ternario que si el usuario esta logeado muestre la navegacion y si no muestre el login
