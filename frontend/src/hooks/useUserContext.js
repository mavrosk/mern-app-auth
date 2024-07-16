import { UserContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw Error('UserContext is not inside UserContextProvider')
    }

    return context
}