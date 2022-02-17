const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

//get routers
const userRouter = require('./routes/usersRouter');
const dogRouter = require('./routes/dogRouter');
const requestRouter = require('./routes/requestRouter');
const authRouter = require("./routes/authRouter");

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

//use userRouters to create User Schema
app.use('/', userRouter);

//use dogRouters to create Dog Schema
app.use('/', dogRouter);

//use requestRouters to create Request Schema
app.use('/', requestRouter);

app.use("/", authRouter)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB); // MONGO_DB needs to be added in .env file

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
