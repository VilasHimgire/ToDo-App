const mongoose = require("mongoose");

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

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;