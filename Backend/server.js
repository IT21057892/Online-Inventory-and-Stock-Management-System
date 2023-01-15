const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const userRoute = require("./Routes/userRoutes.js");
const errorHandler = require("./middleWare/errorMiddleware");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes Middlewaew
app.use("/api/users", userRoute);

//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

//Error Middleware
app.use(errorHandler());

//connect to DB and start server
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URL;
mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection success!!");
});

app.listen(PORT, () => {
    console.log('Server is up and running on port', PORT);
});