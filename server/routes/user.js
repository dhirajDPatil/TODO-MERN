import express from "express";
import { createT, deleteT, deleteUser, getT, getUserI, login, logoutT, markT, signup, updateT, updateUser } from "../controllers/user.js";

const router = express.Router();

const isNullOrUndefined = (value) => value === null || value === undefined; 

// apis after 

const authMiddleWare = async (req, res, next) => {
    console.log("session", req.session)
    if(isNullOrUndefined(req.session) || isNullOrUndefined(req.session.userid)) {
        res.status(401).send({error: "Not logged in.."});
    } else {
        next();
    }
}

router.post('/signup', signup);  //post
router.post('/login', login);  //post
router.get('/logout', logoutT);  //post

router.get('/userinfo', authMiddleWare, getUserI);
router.get('/home/alltodos', authMiddleWare, getT);
router.post('/home/newtodo', authMiddleWare, createT);

router.patch('/home/alltodos/:todoID/markcomplete',authMiddleWare, markT);
router.patch('/home/alltodos/:todoID/updatetodo', authMiddleWare, updateT);
router.delete('/home/alltodos/:todoID/deletetodo',authMiddleWare, deleteT);
router.delete('/home/deleteuser',authMiddleWare, deleteUser);
router.patch('/home/updateuser',authMiddleWare, updateUser);

export default router;

