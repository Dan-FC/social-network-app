import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert, TextInput } from "react-native";

import LikeButton from "./LikeButtom";

import { useLogin } from "../context/LoginProvider"; // Importamos el contexto de Login

interface PostProps {
  id: number; // ID del post
  UserName: string;
  PostDescription: string;
  Likes: number;
  onPostUpdated?: () => void; // Prop para manejar la actualización del post
  navFrom?: () => void; // Prop para navegar a otra pantalla
  onLike?: () => void; // Prop para manejar el evento de "me gusta"
  isLiked?: boolean; // Prop para indicar si el post ha sido marcado como "me gusta"
}

const Post = (props: PostProps) => {
  const { userToken, userName } = useLogin(); // Obtenemos el token y el nombre de usuario del contexto
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos en modo edición
  const [editContent, setEditContent] = useState(props.PostDescription); // Contenido editable

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`https://social-network-v7j7.onrender.com/api/posts/${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`, // Agregamos el token al encabezado
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred while deleting the post.");
      }
      if (props.onPostUpdated) {
        props.onPostUpdated(); // Actualizamos el contenido del post en el componente padre
      }

      Alert.alert("Success", data.message);
      // Aquí podrías actualizar el estado en el componente padre para eliminar el post de la vista.

    } catch (error) {
      Alert.alert("Error", (error instanceof Error ? error.message : "An unexpected error occurred."));
    }
  };

  const handleEditPost = async () => {
    console.log("Editing post with ID:", props.id);
    try {
      const response = await fetch(`https://social-network-v7j7.onrender.com/api/posts/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`, // Agregamos el token al encabezado
        },
        body: JSON.stringify({ content: editContent }), // Mandamos el contenido actualizado
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred while updating the post.");
      }

      if (props.onPostUpdated) {
        props.onPostUpdated(); // Actualizamos el contenido del post en el componente padre
      }

      Alert.alert("Success", "Post updated successfully!");
      setIsEditing(false); // Salimos del modo edición

      // Aquí podrías actualizar el estado en el componente padre para reflejar el contenido actualizado.

    } catch (error) {
      Alert.alert("Error", (error instanceof Error ? error.message : "An unexpected error occurred."));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.postBox}>
        {props.navFrom ? 
        <>
        <Pressable style={({ pressed }) => ({
          borderRadius: 8,
          height: 26,
          width: props.UserName.length * 12,
          backgroundColor: pressed ? 'rgb(213, 232, 255)' : '#eddaf8'
          })} onPress={props.navFrom}>
          <Text style={styles.userName}>{props.UserName}</Text>
        </Pressable>
        </> : <Text style={styles.userName}>{props.UserName}</Text> }
        <View style={styles.imageText}>
        
          <Image
            style={styles.image}
            source={{
              uri: "https://heronscrossing.vet/wp-content/uploads/Golden-Retriever.jpg",
            }}
          />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editContent}
              onChangeText={setEditContent} // Actualiza el contenido editable
            />
          ) : (
            <Text style={styles.postDescription}>{props.PostDescription}</Text>
          )}
        </View>

        <View style={styles.likeGroup}>
          {/* le iba a cambiar las funcionalidades de like dependiendo si era tu post o no, pero nah */}
          <LikeButton 
            postId={props.id} 
            likes={props.Likes} 
            isLiked={props.isLiked} 
            onLike={props.onLike}
          />
          
          {userName === props.UserName ? (
            <>
              <Pressable onPress={handleDeletePost}>
                <Text style={styles.delete}>🗑️</Text>
              </Pressable>
              <Pressable onPress={() => setIsEditing(!isEditing)}>
                <Text style={styles.edit}>{isEditing ? "✔️" : "✏️"}</Text>
              </Pressable>
              {isEditing && (
                <Pressable onPress={handleEditPost}>
                  <Text style={styles.submit}>Submit</Text>
                </Pressable>
              )}
            </>
          ) : null}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
    flexShrink: 1,
  },
  input: {
    fontSize: 16,
    paddingLeft: 10,
    flexShrink: 1,
    borderColor: '#828282',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    width: '100%',
  },
  likeGroup: {
    flexDirection: "row",
    justifyContent: "space-between", // Espacio entre los elementos
    marginTop: 10,
    alignItems: "center", // Alinea verticalmente
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
  actionGroup: {
    flexDirection: "row", // Para alinear los botones de acción en fila
    alignItems: "center", // Alinea verticalmente los iconos
    marginLeft: 'auto', // Mueve el grupo de acciones a la derecha
  },
  delete: { fontSize: 16, marginLeft: 10 },
  edit: { fontSize: 16, marginLeft: 10 },
  submit: { fontSize: 16, marginLeft: 10, color: 'green' }, // Estilo para el botón de enviar
});
