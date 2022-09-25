import mongoose from 'mongoose';

import {User, Todo} from '../models/userInfo.js';
import bcrypt from 'bcrypt';

// signup

const isNullOrUndefined = (value) => value === null || value === undefined; 
const SALT = 5;


export const signup = async(req,res)=> {
    const {userName, userID, password } = req.body;
    const existingUser = await User.findOne({userName});
    if(isNullOrUndefined(existingUser)){
        const hashedPwd = bcrypt.hashSync(password, SALT);
        const newUser = new User({userName, userID, password: hashedPwd});
        await newUser.save();
        req.session.userid = newUser._id;
        res.status(201).send({success: "Signed up"})
    } else{ // reject singup
        res.status(400).send({err: `user ${userName} already exist please use another user name`});
    }
}

export const login = async(req,res)=> {
    const {userName, password } = req.body;
    const existingUser = await User.findOne({ userName });

    if(isNullOrUndefined(existingUser)){
        res.status(401).send({error: 'User doesnt exist' });
    } else {
        const hashedPwd = existingUser.password;
        if(bcrypt.compareSync(password, hashedPwd)){
            req.session.userid = existingUser._id;
            res.status(200).send({success: 'logged in'});
        } else {
            res.status(401).send({ error: "Password doesnt match"})
        }
    }
}

export const getT = async (req, res) => {
    const alltodos = await Todo.find({uID: req.session.userid})
    res.send(alltodos);
}

export const createT = async (req,res)=> {
    const todo = req.body;
    todo.creationTime = new Date();
    todo.uID = req.session.userid;
    const newTodo = new Todo(todo);
    await newTodo.save();
    res.status(201).send(newTodo);
}

export const updateT = async (req,res) => {
    const {task, priority} = req.body;
    const todoID = req.params.todoID;
    try {
        const todo = await Todo.findOne({_id: todoID, uID: req.session.userid});
        if(isNullOrUndefined(todo)){
            res.sendStatus(404);
        } else {
            todo.task = task;
            todo.priority = priority;
            await todo.save();
            res.send(todo);
        }
    } catch (error) {
        res.sendStatus(404);
    }
}

export const markT = async (req,res) => {
    const todoID = req.params.todoID;
    try {
        const todo = await Todo.findOne({_id: todoID, uID: req.session.userid});
        if(isNullOrUndefined(todo)){
            res.sendStatus(404);
        } else {
            const updatedTodo = await Todo.findByIdAndUpdate(todoID, {isCompleted: !todo.isCompleted}, {new: true});
            res.send(updatedTodo);
        }
    } catch (error) {
        res.sendStatus(404);
    }
}


export const deleteT = async (req,res) => {
    const todoID = req.params.todoID;
    try {
        await Todo.deleteOne({_id: todoID, uID: req.session.userid});
        res.status(200).send({ id : todoID });
    } catch (error) {
        res.sendStatus(404);
    }
}


export const logoutT = async (req, res) => {
    if(!isNullOrUndefined(req.session)){
        req.session.destroy(()=> {
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(200);
    }
}

export const getUserI = async (req, res) => {
    const user = await User.findById(req.session.userid);
    res.send({userName : user.userName, userID: user.userID})
}

export const deleteUser = async (req, res) => {
    const user = req.session.userid;
    try {
        await User.deleteOne({_id: user});
        await Todo.deleteMany({ uID: user});
        res.status(200).json("User Deleted successfully")
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateUser = async (req, res) => {
    const user = req.session.userid;
    const { userName, userID } = req.body
    try {
        const currUser = await User.findById({_id: user});
        currUser.userName = userName
        currUser.userID = userID
        currUser.save();
        res.status(200).json("User Data Updated successfully")
    } catch (error) {
        res.status(500).send(error);
    }
}















/*
//---------------------------------------------------------------------------
// old without authentication


export const createUser = async(req,res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser._id);
    } catch (error) {
        res.status(401).json(error);
    }
}

export const getUser = async (req,res) => {
    const user = req.body;
    const userInfo = await User.findOne({userName : user})
    res.status(201).send("ok");  
}

// Todo Creation/Retrieve/Update/Delete apis
export const getAllTodos = async (req, res) => {
    const allTodos = await Todo.find();
    res.status(201).json(allTodos);
}

export const createTodo = async (req, res) => {
    const todo = req.body;
    const newTodo = new Todo(todo);
    try{
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch(err){
        res.status(401).send("Error while saving within db");
    }
}

export const markCompletedTodo = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id");
    
    const todo = await Todo.findById(id);
    const updatedTodo = await Todo.findByIdAndUpdate(id, {isCompleted: !todo.isCompleted}, {new: true});
    res.status(201).json(updatedTodo);
}

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const {task: updatedTask}  = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id");
    const updatedTodo = await Todo.findByIdAndUpdate(id, {task: updatedTask}, {new: true})
    res.status(201).json(updatedTodo);
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id");
    const deletedTask = await Todo.findByIdAndRemove(id);
    res.status(201).json(deletedTask);
}
*/
