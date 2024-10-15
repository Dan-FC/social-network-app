import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <Text style={styles.name}>Francisco Fernandez</Text>
      <View style={styles.followsContainer}>
        <Text style={styles.follows}>Followers: </Text>
        <Text style={styles.follows}>Following: </Text>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  followsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  follows: {
    fontSize: 16,
  },
});
