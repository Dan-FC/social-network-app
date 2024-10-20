import UserProfile from "../components/UserProfile";

import { useLogin } from "../context/LoginProvider";

const Profile = () => {
  const { userID } = useLogin() || { console: "error" };

  return (
    <>
      <UserProfile profileId={userID} />
    </>
  );
};

export default Profile;