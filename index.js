const express = require("express");
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')
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

app.get('/', (req, res) => {
    res.send("Hello World !!!");
})

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));

