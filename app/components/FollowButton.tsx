import { StyleSheet } from "react-native";

import ButtonLoginSignUp from "./ButtonLoginSignUp";



interface FollowButtonProps {
    isFollowing: boolean;
    userToFollow: number;
    colorFollowed: string;
    colorNotFollowed: string;
}

const FollowButton = (props : FollowButtonProps) => {
  return (
    <ButtonLoginSignUp
        title="Follow"
        submit={() => console.log("Follow")}
        colorUnpressed={props.isFollowing ? props.colorFollowed : props.colorNotFollowed}
        colorPressed="#3f2640"
    />
  );
};

export default FollowButton;

