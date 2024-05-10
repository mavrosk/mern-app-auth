const express = require("express");
const {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout, exportWorkoutCSV} = require('../Controllers/workoutController');

const router = express.Router();

// Get all Workouts Route
router.get("/", getWorkouts);

// GET single workout Route
router.get("/:id", getWorkout);

// POST a new Workout
router.post("/", createWorkout)

// DELETE a new Workout
router.delete("/:id", deleteWorkout);

// UPDATE a new Workout
router.patch("/:id", updateWorkout);

// Generate CSV workouts file
router.post("/exportCsv", exportWorkoutCSV)

module.exports = router;
