import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw Error('UserContext is not inside UserContextProvider')
    }

    return context
}