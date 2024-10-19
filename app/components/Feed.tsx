import { Text, StyleSheet } from "react-native";
import React, {useEffect, useState} from "react";
import { FlatList, RefreshControl } from "react-native";

import Post from "../components/Post";

import { useLogin } from "../context/LoginProvider";

interface PostInterface {
  username: string;
  content: string;
  likes: Array<number>;
}

//El prop option es para poder hacer un switch case y 
// poder cambiar la url de la api
interface Props {
  option: number;
}

const Feed = ( props : Props) => {
  const [posts, setPosts] = useState([]);
  const [errorText, setErrorText] = useState("");

  const { userToken, userID } = useLogin() || { console: "error" };

  let url = "";

  switch (props.option) {
    case 1:
      url = "https://social-network-v7j7.onrender.com/api/posts?page=1&limit=10";
      break;
    case 2:
      url = "https://social-network-v7j7.onrender.com/api/feed?page=1&limit=10";
      break;
    default:
      url = "https://social-network-v7j7.onrender.com/api/posts?page=1&limit=10";
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        //si data es un array vacio, no hay posts
        if (data.length === 0) {
          throw new Error("There are no posts from the users you follow");
        } else {
          setPosts(data);
          setErrorText("");
        }
      } 
      //errores de validacion
      if (data.errors) {
        throw new Error(data.errors[0].msg);
      } else if (data.error) {
        throw new Error(data.error);
      } } catch (error) {
      if (error instanceof Error) {
        setErrorText(error.message);
      } //errores que el servidor nos manda
      else {
        setErrorText(String(error));
      } }
  }

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <>
      <Text style = {styles.errorText}>{errorText}</Text>
      <FlatList
        data={posts}
        renderItem={({ item }: { item: PostInterface }) => 
        <Post 
          UserName={item.username} 
          PostDescription={item.content}
          Likes={item.likes.length} 
        />}
        // esto es para cambiar el color del refresh y para otras cosas
        refreshControl={
          <RefreshControl
              refreshing={false}
              onRefresh={fetchPosts}
              title=""
              tintColor="#81008a"
              titleColor="#fff"
           />
        } 
      />
    </>
  );
};

export default Feed;


const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
  },
});