import { Pressable, Text, StyleSheet } from "react-native";

import { useLogin } from "../context/LoginProvider";

interface LikeButtonProps {
  isLiked?: boolean | null;
  postId: number;
  likes: number;
  onLike?: () => void;
}

const LikeButton = (props: LikeButtonProps) => {
    const { userToken } = useLogin() || { console: "error" };
    
    const LikeHandler = async () => {
        try {
        const response = await fetch(
            `https://social-network-v7j7.onrender.com/api/posts/${props.postId}/like`,
            {
            method: props.isLiked ? "DELETE" : "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(
            data.error ||
                `An error occurred while ${
                props.isLiked ? "unliking" : "liking"
                } the post.`
            );
        }
        if (props.onLike) {
            props.onLike();
        }
        } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unexpected error occurred.");
        }
        }
    };
    return (
        <>
            <Pressable onPress={() => LikeHandler()} 
            style={( {pressed} ) => [
                {
                    backgroundColor: pressed
                    ? "#a7a7a7"
                    : "#81008a",
                },    
                {
                    backgroundColor: props.isLiked
                    ? "#81008a"
                    : "#eddaf8",
                }, {
                    borderRadius: 10,
                }
            ]}
            > 
                <Text style={styles.like}>❤</Text>
            </Pressable>
            <Text style={styles.likeCounter}>{props.likes} likes</Text>
        </>
    );
}

export default LikeButton;

const styles = StyleSheet.create({
    like: {
        fontSize: 16,
      },
      likeCounter: {
        fontSize: 16,
        marginLeft: 10,
      },
});