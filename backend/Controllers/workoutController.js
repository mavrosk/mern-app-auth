
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const fs = require('fs');
const transporter = require('nodemailer').createTransport


// Get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1});

  res.status(200).json(workouts)
}


// Get a single Workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  // check if id is valid mongodb valid id type
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such workout with this id!'})
  }

  const workout = await Workout.findById(id)

  if (!workout){
    res.status(400).json({error:'No such workout exists in the database!'})
  }

  res.status(200).json(workout)

}


// Create Workout
const createWorkout = async (req, res) =>{
  const {title, repetitions, load} = req.body;
  try {
    const workout = await Workout.create({title,repetitions,load});
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

// Deelete a  Workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

   // check if id is valid mongodb valid id type
   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such workout with this id!'})
  }

  const workout = await Workout.findOneAndDelete({_id : id})

  if (!workout){
    res.status(400).json({error:'No such workout exists in the database!'})
  }

  return res.status(200).json(workout);

}

// Update a  Workout
const updateWorkout = async (req , res) => {

  const { id } = req.params;

   // check if id is valid mongodb valid id type
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such workout with this id!'})
  }

  const workout = await Workout.findOneAndUpdate({_id : id},{...req.body})

  if (!workout){
    res.status(400).json({error:'No such workout exists in the database!'})
  }

  return res.status(200).json(workout);
}


const exportWorkoutCSV = async (req, res) => {
  try {
    const workoutsData = await Workout.find();

    const generateCsvFile = (workouts) => {
      const csvData = workouts.map(workout => {
        return `${workout.title},${workout.load}kg,${workout.repetitions},${workout.createdAt}`;
      }).join('\n');

      const filePath = 'workouts.csv';

      try {
        fs.writeFileSync(filePath, csvData);
        res.json({ success: true }); // Send success response once CSV file is generated
      } catch (error) {
        console.error('Error writing CSV file:', error);
        res.status(500).json({ error: 'Failed to generate CSV file' });
      }
    };

    generateCsvFile(workoutsData); // Call generateCsvFile

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  exportWorkoutCSV
}