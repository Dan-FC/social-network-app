import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import Post from "../components/Post";
import ButtonNewPost from "../components/ButtonNewPost";
import UserProfile from "../components/UserProfile";
import { useLogin } from "../context/LoginProvider";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePost from "../tabs/CreatePost";

interface PostInterface {
  username: string;
  content: string;
  likes: Array<number>;
  id: number;
  user_id: number;
}

interface Props {
  option: number;
}

const Stack = createNativeStackNavigator();

const Feed = (props: Props) => {
  const [posts, setPosts] = useState([]);
  const [userToView, setUserToView] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const { userToken } = useLogin() || { console: "error" };

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
    setIsLoading(true);
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
        if (data.length === 0) {
          throw new Error("There are no posts from the users you follow");
        } else {
          setPosts(data);
          setErrorText("");
        }
      }

      if (data.errors) {
        throw new Error(data.errors[0].msg);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorText(error.message);
      } else {
        setErrorText(String(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  function ProfileHanler (id: number, navigation: NavigationProp<any>) {
    setUserToView(id);
    navigation.navigate("UserProfile");
  }

  function ToUserProfile({ id, navigation }: { id:number, navigation: NavigationProp<any> }) {
    return (
      <>
        <UserProfile profileId = {id}/>
      </>
    );
  }

  function ToNavigateNewPost({ navigation }: { navigation: NavigationProp<any> }) {
    return (
      <>
        <CreatePost />
      </>
    );
  }

  function NavigateToFeed({ navigation }: { navigation: NavigationProp<any> }) {
    return !isLoading ? (
      <> 
        <View style={styles.buttonContainer}>
          <ButtonNewPost submit={() => navigation.navigate("Share")} title="+" colorUnpressed="#81008a" colorPressed="#a01c9e" />
        </View>
        <Text style={styles.errorText}>{errorText}</Text>
        <FlatList
          data={posts}
          renderItem={({ item }: { item: PostInterface }) =>
            <Post
              UserName={item.username}
              PostDescription={item.content}
              Likes={item.likes.length}
              id={item.id}
              onPostUpdated={fetchPosts}
              navFrom={() => ProfileHanler(item.user_id, navigation)}	
            />}
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
    ) : (
      <ActivityIndicator size="small" color="#81008a" />
      );
  }

  return (
    <>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" options={{headerShown : false}}>
          {props => <NavigateToFeed {...props}  />}
        </Stack.Screen>
        <Stack.Screen name="Share">
          {/* props es un objeto que se pasa a la funcion ToSignUpOrLoginNavigator */}
          {props => <ToNavigateNewPost {...props}  />}
          {/* ...props sirve para pasar las propiedades de la navegacion */}
        </Stack.Screen>
        <Stack.Screen name="UserProfile" options={{headerShown : true}}>
          {props => <ToUserProfile id = {userToView} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
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
  buttonContainer: {
    position: "absolute", // Para que se posicione de manera absoluta
    bottom: 20, // Espacio desde el fondo
    right: 20, // Espacio desde la derecha
    elevation: 5, // Sombra para Android
    zIndex: 1, // Asegurarse de que esté por encima de otros elementos
  },
});
