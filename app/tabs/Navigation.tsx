import React, { useState, useEffect} from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import allPost from "../tabs/AllPost";
import profile from "../tabs/Profile";
import following from "../tabs/Following";

const Tab = createBottomTabNavigator();

// Componente para el ícono de la pestaña
const TabIcon = ({ source }: { source: any }) => (
  <Image source={source} style={styles.icon} />
);

const Navigation = () => {
  const navigation = useNavigation();

  const [isTabHeaderVisible, setIsTabHeaderVisible] = useState(true);

  //estaba bien feo que se quedara e header de las tabs en la pantalla de perfil y create post
  useEffect(() => {
    
    const unsubscribe = navigation.addListener('state', () => {
      const state = navigation.getState();
      if (!state) return;
      const currentRoute = state.routes[state.index];
      const nestedState = currentRoute.state?.routes;
      const activeScreenName = nestedState ? nestedState[nestedState.length - 1].name : currentRoute.name;

      const stackScreens = ['Share', 'UserProfile'];

      if (stackScreens.includes(activeScreenName)) {
        setIsTabHeaderVisible(false);
      } else {
        setIsTabHeaderVisible(true);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === "All Posts") {
            iconSource = require("../../assets/house-chimney.png"); 
          } else if (route.name === "Following") {
            iconSource = require("../../assets/users.png"); 
          } else if (route.name === "Profile") {
            iconSource = require("../../assets/user.png"); 
          }

          return <TabIcon source={iconSource} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      
      <Tab.Screen name="All Posts" component={allPost} options={{unmountOnBlur: true, headerShown: isTabHeaderVisible}}/>
      <Tab.Screen name="Following" component={following} options={{unmountOnBlur: true, headerShown: isTabHeaderVisible}}/>
      <Tab.Screen name="Profile" component={profile} options={{unmountOnBlur: true}}/>
      
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  icon: {
    width: 24, // Ajusta el tamaño según tus necesidades
    height: 24,
  },
});
