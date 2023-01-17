require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const workoutRoutes = require("./routes/workouts");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts/", workoutRoutes);

const port = process.env.PORT || 3000;
const URI = "mongodb://127.0.0.1:27017/healthApp"

mongoose
  .connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("connected to db & Listening on port", process.env.PORT);
    });
  })
  .catch((e) => console.log(e));
