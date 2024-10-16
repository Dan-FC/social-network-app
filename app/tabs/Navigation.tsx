import { StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import allPost from "../tabs/AllPost";
import profile from "../tabs/Profile";
import following from "../tabs/Following";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Posts" component={allPost} />
      <Tab.Screen name="Following" component={following} />
      <Tab.Screen name="Profile" component={profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
