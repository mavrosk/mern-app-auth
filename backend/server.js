require("dotenv").config();

const express = require("express");
const routes = require("./routes/workouts");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("hello from mongoose database!!");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes, parent of all routes
app.use("/api/workouts", routes);


