import express from "express";
// import { getAllTodos, createTodo, createUser, getUser, updateTodo, markCompletedTodo, deleteTodo, login } from "../controllers/user.js";
import { User } from "../models/userInfo.js";
import bcrypt from 'bcrypt';
import { createT, deleteT, getT, login, markT, signup, updateT } from "../controllers/user.js";

const router = express.Router();

// Auth MIddleware
// const API_KEY = "abcd"

const isNullOrUndefined = (value) => value === null || value === undefined; 


// Authentication and registration
// router.post('/signup', createUser);
// router.get('/login', getUser);  //post




// Todo Apis
// router.get('/home/alltodos', authMiddleWare, getAllTodos);
// router.post('/home/newtodo', createTodo);
// router.patch('/home/alltodos/:id/markcomplete', markCompletedTodo);
// router.patch('/home/alltodos/:id/updatetodo', updateTodo);
// router.delete('/home/alltodos/:id/deletetodo', deleteTodo);



// apis after 

const authMiddleWare = async (req,res, next) => {
    const userName = req.headers['x-username'];
    const password = req.headers['x-password'];
    if(isNullOrUndefined(userName) || isNullOrUndefined(password)) {
        res.status(401).send({error: "User Name/Password is wrong"});
    } else {
        // const hashedPwd = bcrypt.hashSync(password, SALT);
        const existingUser = await User.findOne({ userName });
        
        if(isNullOrUndefined(existingUser)){
                res.status(401).send({error: 'User does not exist' });
        } else { // reject singup
            const hashedPwd = existingUser.password;
            if(bcrypt.compareSync(password, hashedPwd)){
                req.user = existingUser;
                next();
            } else {
                res.status(401).send({err: "Password is incorrect"});
            }
        }
    }
}

router.post('/signup', signup);  //post
router.post('/login', login);  //post

router.get('/home/alltodos', authMiddleWare, getT);
router.post('/home/newtodo', authMiddleWare, createT);

router.patch('/home/alltodos/:todoID/markcomplete',authMiddleWare, markT);
router.patch('/home/alltodos/:todoID/updatetodo', authMiddleWare, updateT);
router.delete('/home/alltodos/:todoID/deletetodo',authMiddleWare, deleteT);

export default router;