import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import allPost from "../tabs/AllPost";
import profile from "../tabs/Profile";
import following from "../tabs/Following";

const Tab = createBottomTabNavigator();

// Componente para el ícono de la pestaña
const TabIcon = ({ source }: { source: any }) => (
  <Image source={source} style={styles.icon} />
);

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === "All Posts") {
            iconSource = require("../../assets/house-chimney.png"); // Ruta de tu ícono
          } else if (route.name === "Following") {
            iconSource = require("../../assets/users.png"); // Ruta de tu ícono
          } else if (route.name === "Profile") {
            iconSource = require("../../assets/user.png"); // Ruta de tu ícono
          }

          return <TabIcon source={iconSource} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="All Posts" component={allPost} />
      <Tab.Screen name="Following" component={following} />
      <Tab.Screen name="Profile" component={profile} />
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
