import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import userRoutes from './routes/user.js'
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();
const session_secret = "newton";
const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.set('trust proxy', 1);
app.use(cors({
    credentials: true,
    origin: "https://personaltasksapp.netlify.app" //"http://localhost:3000"
}));
app.use(session({
    secret: session_secret,
    cookie: { 
        maxAge: 1*60*60*1000,
        secure: true,
        sameSite: 'none'
    }
})); // adds session property to the req/res

app.use('/', userRoutes);

app.get('/', (req,res)=> {
    res.send("Hello there")
})

const port = process.env.PORT || 8000
const host = '0.0.0.0';

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(port, host, ()=> console.log(`server running on port ${port}`)))
    .catch((err)=> console.log(err.message))

