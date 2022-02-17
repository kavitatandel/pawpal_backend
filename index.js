const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
//use cors to communicate between front-end and back-end
const cors = require("cors");
app.use(cors());

//it will convert response to json
app.use(express.json());

//used while we PUT or POST
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Test Server is working
app.get("/", (req, res) => {
  res.send("Hello World !!!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB); // MONGO_DB needs to be added in .env file

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
