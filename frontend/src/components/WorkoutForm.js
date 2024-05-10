import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';

function WorkoutForm() {

    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [repetitions, setRepetitions] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault();

        const workout = {title, load, repetitions}

        const response = await fetch('/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-type':'application/json'
            }
        })

        const json = await response.json()  

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setRepetitions('')
            setError(null)
            dispatch({type:"CREATE_WORKOUTS",payload:json})
        }

    }

    const handleCsvButton = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/workouts/exportCsv');
            console.log(response);
            if (response.status === 200 && response.data.success) {
                const workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils.json_to_sheet(response.data.workoutsData);
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Workouts');
                XLSX.writeFile(workbook, 'workouts.xlsx');
                toast.success('CSV file generated successfully!');
            } else {
                toast.error('Failed to generate CSV file');
            }
        } catch (error) {
            toast.error('Failed to generate CSV file. Please try again later.');
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>create new Workout</h3>
            <label>Exercise title:</label>
            <input
                type='text'
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
            />
            <label>Exercise load:</label>
            <input
                type='text'
                onChange={(e)=> setLoad(e.target.value)}
                value={load}
            />
            <label>Exercise repetitions:</label>
            <input
                type='text'
                onChange={(e)=> setRepetitions(e.target.value)}
                value={repetitions}
            />
            <div className='buttons'>
                <button>Add Workout</button>
                <button onClick={handleCsvButton}>Print Csv</button>
            </div>
            {error && <div className='error'>{error}</div>}
        </form>
        
    )
}

export default WorkoutForm
