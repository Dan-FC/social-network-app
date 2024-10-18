import React, {useEffect, useState} from "react";
import { FlatList, RefreshControl } from "react-native";

import Post from "../components/Post";

import { useLogin } from "../context/LoginProvider";

interface PostInterface {
  username: string;
  content: string;
  likes: Array<number>;
}

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userToken, userID } = useLogin() || { console: "error" };

  const fetchPosts = async () => {
    try {
      setIsLoading(true); 
      const response = await fetch("https://social-network-v7j7.onrender.com/api/posts?page=1&limit=10", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPosts(data);
      } //errores de validacion
      if (data.errors) {
        throw new Error(data.errors[0].msg);
      } else if (data.error) {
        throw new Error(data.error);
    }} catch (error) {
      console.log(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <>
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

export default AllPost;
