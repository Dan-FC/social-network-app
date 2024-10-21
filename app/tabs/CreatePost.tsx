import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useState } from 'react';
import TextInputNewPost from "../components/TextInputNewPost";
import ButtonLoginSignUp from "../components/ButtonLoginSignUp";
import { useLogin } from "../context/LoginProvider"; // Para obtener el token

const CreatePost: React.FC = () => {
  const [postContent, setPostContent] = useState(""); // Estado para el contenido del post
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { userToken } = useLogin(); // Obtenemos el token del contexto de autenticación

  const handleCreatePost = async () => {
    if (!postContent) {
      setErrorMessage("Please enter some content.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("https://social-network-v7j7.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`, // Agregamos el token al encabezado
        },
        body: JSON.stringify({ content: postContent }), // Mandamos el contenido del post
      });

      const data = await response.json();

      if (!response.ok) {
        // Manejo de errores del servidor
        throw new Error(data.error || "An error occurred while creating the post.");
      }

      
      setPostContent(""); // Limpiamos el campo después de hacer el POST

    } catch (error) {
      setErrorMessage((error instanceof Error ? error.message : "An unexpected error occurred."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInputNewPost
        placeholder="Share your thoughts..."
        value={postContent}
        onChangeText={setPostContent} // Actualizamos el estado con el texto ingresado
      />
      <ButtonLoginSignUp
        submit={handleCreatePost} // Llamamos a la función de creación de post
        title={isLoading ? "Posting..." : "Post"}
        colorUnpressed="#81008a"
        colorPressed="#4b004f"
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {isLoading && <ActivityIndicator size="large" color="#81008a" />}
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
