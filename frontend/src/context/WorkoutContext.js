import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const workoutsreducer = (state,action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                workouts:action.payload
            }
        case "CREATE_WORKOUTS":
            return {
                workouts: [...state.workouts, action.payload]
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload._id)
            }
    }
}

export const WorkoutContextProvider = ({children})=> {
    const [state, dispatch] = useReducer(workoutsreducer, {
        workouts:null
    })
    return (
        <WorkoutContext.Provider value={{...state,dispatch}}>
            {children} 
        </WorkoutContext.Provider>
    )
}
