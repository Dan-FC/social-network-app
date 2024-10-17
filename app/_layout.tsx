import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import MainNavigation from "./tabs/MainNavigation";
import LoginProvider from "./context/LoginProvider";

export default function App() {

  return (
    <LoginProvider>
      <NavigationContainer independent = {true}>
        <MainNavigation />
      </NavigationContainer>
    </LoginProvider>
  );
}