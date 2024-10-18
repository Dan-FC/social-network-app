import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface PostProps {
  UserName: string;
  PostDescription: string;
  Likes: number;
}


const Post = (props : PostProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.postBox}>
        <Text style={styles.userName}>{props.UserName}</Text>

        <View style={styles.imageText}>
          <Image
            style={styles.image}
            source={{
              uri: "https://heronscrossing.vet/wp-content/uploads/Golden-Retriever.jpg",
            }}
          />
          <Text style={styles.postDescription}>
            {props.PostDescription}
          </Text>
        </View>

        <View style={styles.likeGroup}>
          <Text style={styles.like}>❤</Text>
          <Text style={styles.likeCounter}>{props.Likes} likes</Text>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  postBox: {
    width: "95%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Sombra para Android
    elevation: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  postDescription: {
    fontSize: 16,
    paddingLeft: 10,
    flexShrink: 1, // Evita que el texto sobrepase el espacio disponible
  },
  likeGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  like: {
    fontSize: 16,
  },
  likeCounter: {
    fontSize: 16,
    marginLeft: 10,
  },
  imageText: {
    flexDirection: "row",
    alignItems: "center",
  },
});
