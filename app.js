const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectMongodb = require("./init/mongodb");
const todoRoute = require("./routes/todo");
const Todo = require("./models/Todo");
const dotenv = require("dotenv");

dotenv.config();
// console.log(`Project Created by ${process.env.NAME}`);

// init app
const app = express();

// DB connection
connectMongodb();


// view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname="public")));
app.use(bodyParser.urlencoded({extended: true}));
// app routes
app.use("/", todoRoute);

module.exports = app;
