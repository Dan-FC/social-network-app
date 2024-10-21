//importamos el contexto
import { useLogin } from "../context/LoginProvider";

import Navigation from "./Navigation";
import UserNavigation from "./UserNavigation";


const MainNavigation = () => {
    const { loggedIn } = useLogin() || { console: "error" };
    return (
     loggedIn ? <Navigation /> : <UserNavigation />
    );
}

export default MainNavigation;