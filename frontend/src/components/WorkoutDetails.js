import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

function WorkoutDetails({workout}) {

    const {dispatch} = useWorkoutsContext();

    const handleDeleteWorkout = async () => {

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type:"DELETE_WORKOUT", payload:json})
        }
    }

    return (
        <div className='workout-details'>
            <h4>{workout.title}</h4>
            <p>Load in (kg) : {workout.load}kg</p>
            <p>Repetions : {workout.repetitions}</p>
            <p>{workout.createdAt}</p>
            <button onClick={handleDeleteWorkout}>X</button>
        </div>
    )
}

export default WorkoutDetails
