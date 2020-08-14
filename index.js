const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(passport.initialize());

app.use("/api", require("./routes/api"));

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to Mongo DB!")
);

app.listen(PORT, () => console.log(`Listening Server on PORT:${PORT} ...`));
