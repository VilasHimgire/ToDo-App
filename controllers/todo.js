const Todo = require("../models/Todo");
const moment = require("moment");


const homeController = async (req, res, next) => {
    try {

        res.locals.moment = moment;

        const todos = await Todo.find({}).sort({createdAt: -1});
        res.render("index", {title: "Todo List", todos: todos});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

const addTodoFormController = (req, res, next) => {
    try {
        res.render("newTodo", {title: "Add Todo"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

const updateTodoFormController = (req, res, next) => {
    try {
        res.render("updateTodo", {title: "Update Todo"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

const deleteTodoPageController = (req, res, next) => {
    try {
        res.render("deleteTodo", {title: "Delete Todo"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

const addTodoController = async (req, res, next) => {
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
};

module.exports = { 
    homeController, 
    addTodoFormController, 
    updateTodoFormController, 
    deleteTodoPageController, 
    addTodoController 
};