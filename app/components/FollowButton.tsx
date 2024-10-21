import ButtonLoginSignUp from "./ButtonLoginSignUp";

import { useLogin } from "../context/LoginProvider";

interface FollowButtonProps {
    isFollowing: boolean;
    userToFollow: number;
    colorFollowed: string;
    colorNotFollowed: string;
    onFollow?: () => void; //codigo robado del dan digo deborado
}

const FollowButton = (props : FollowButtonProps) => {

    const { userToken } = useLogin() || { console: "error" };

    const FollowHandler = async () =>{
        try {
            const response = await fetch(`https://social-network-v7j7.onrender.com/api/users/${props.userToFollow}/follow`, {
                method: props.isFollowing ? "DELETE" : "PUT",  
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || `An error occurred while ${props.isFollowing ? "unfollowing" : "following"} the user.`);
            }
            if (props.onFollow) {
                props.onFollow();
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unexpected error occurred.");
            }
        }
    }
    return (
    <ButtonLoginSignUp
        title={props.isFollowing ? "Unfollow" : "Follow"}   
        submit={() => 
            FollowHandler()
        }
        colorUnpressed={!props.isFollowing ? props.colorFollowed : props.colorNotFollowed} //me dio flojera asi que invertido
        colorPressed="#3f2640"
    />
  );
};

export default FollowButton;

