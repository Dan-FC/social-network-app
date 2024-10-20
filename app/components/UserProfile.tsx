import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";

import Post from "../components/Post";
import FollowButton from "./FollowButton";

import { useLogin } from "../context/LoginProvider";


type UserData = {
  id: number;
  username: string;
  follower_count: string;
  following_count: string;
};

interface Props {
  profileId: number;
}

const UserProfile = (props : Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userPosts, setUserPosts] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { userToken, userID } = useLogin() || { console: "error" };

  // Función para obtener la información del usuario
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/users/${props.profileId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const data = await response.json();

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

  const fetchUserPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/users/${props.profileId}/posts?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        //si data es un array vacio, no hay posts
        if (data.length === 0) {
          throw new Error("You have no posts yet. Start posting bro!");
        } else {
          setUserPosts(data);
          setErrorMessage("");
        }
      } else {
        throw new Error(data.error || "Error fetching user data");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#81008a" />;
  }

  return (
    <>
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
      {userID !== props.profileId ? 
      <FollowButton 
        isFollowing={false}
        userToFollow={props.profileId} 
        colorFollowed="#81008a"
        colorNotFollowed="#6a6a6a"
        /> 

        : null}
    </View>
    <Text style = {styles.postHeader}>Posts</Text>
    {errorMessage ==="" ? <>
    <FlatList 
      data={userPosts}
      renderItem={({ item }) => 
        <Post 
          UserName={item.username}
          PostDescription={item.content}
          Likes={item.likes.length} 
        />}
      keyExtractor={(item) => item._id}
      refreshing={isLoading}
      onRefresh={fetchUserPosts}
    />
    </> : 
    <Text style = {styles.errorText}>{errorMessage}</Text>}
  </>
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
  postHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
});
