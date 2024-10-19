import { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet } from "react-native";

import UserProfile from "../components/UserProfile";
import Post from "../components/Post";

import { useLogin } from "../context/LoginProvider";

const Profile = () => {
  const [userPosts, setUserPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { userID, userToken } = useLogin() || { console: "error" };

  const fetchUserPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/users/${userID}/posts?page=1&limit=10`,
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
    fetchUserPosts();
  }, []);

  return (
    <>
      <UserProfile />
      {errorMessage ==="" ? 
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
      /> : 
      <Text style = {styles.errorText}>{errorMessage}</Text>}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  errorText: {
    color: "#ae8ec4",
    textAlign: "center",
    paddingTop: 20,
    fontSize: 16,
  },
});