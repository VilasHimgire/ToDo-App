const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const moment = require("moment");

const PORT = 8000;

// init app
const app = express();

const connectionUrl = "mongodb://0.0.0.0:27017/todoDb";

mongoose.connect(connectionUrl)
.then(() => {
    console.log("Database connection successful.");
})
.catch((error) => {
    console.log(error.message);
});

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true, 
        // maxlength: 30,
        // minlength: 5,
        // trim: true,
    },
    desc: String
}, {
    timestamps: true
});

const Todo = mongoose.model("todo",todoSchema);


// view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname="public")));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res, next) => {
    try {

        res.locals.moment = moment;

        const todos = await Todo.find({}).sort({createdAt: -1});
        res.render("index", {title: "Todo List", todos: todos});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

app.get("/add-todo", (req, res, next) => {
    try {
        res.render("newTodo", {title: "Add Todo"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

app.get("/update-todo", (req, res, next) => {
    try {
        res.render("updateTodo", {title: "Update Todo"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

app.get("/delete-todo", (req, res, next) => {
    try {
        res.render("deleteTodo", {title: "Delete Todo"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

app.post("/add-todo", async (req, res, next) => {
    try {
        const {title, desc} = req.body;

        if(!title){
            return res.status(400).json({message: "Title is required!"});
        }

        const newTodo = new Todo({title, desc});
        await newTodo.save();

        res.redirect("/");
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// listen server
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`);
});