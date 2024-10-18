import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

import { useLogin } from "../context/LoginProvider";

type UserData = {
  id: number;
  username: string;
  follower_count: string;
  following_count: string;
};

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { userToken, userID } = useLogin() || { console: "error" };

  // Función para obtener la información del usuario
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/users/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUserData(data);
      } else {
        throw new Error(data.error || "Error fetching user data");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#81008a" />;
  }

  if (errorMessage) {
    return <Text style={styles.errorText}>{errorMessage}</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <Text style={styles.name}>{userData?.username}</Text>
      <View style={styles.followsContainer}>
        <Text style={styles.follows}>
          Followers: {userData?.follower_count}
        </Text>
        <Text style={styles.follows}>
          Following: {userData?.following_count}
        </Text>
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
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
