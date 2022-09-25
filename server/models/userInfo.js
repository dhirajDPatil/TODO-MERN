import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName : String,
    userID : String,
    password : String,
})

export const User = mongoose.model("User", userSchema);

const todoSchema = mongoose.Schema({
    task : String,
    isCompleted : Boolean,
    creationTime: Date,
    priority: Number,
    uID: mongoose.Schema.Types.ObjectId 
})

export const Todo = mongoose.model("Todo", todoSchema);

