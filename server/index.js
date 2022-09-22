import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import userRoutes from './routes/user.js'
import session from 'express-session';

const session_secret = "newton";

const app = express();

const CONNECTION_URL='mongodb+srv://dhirajpatil:dhirajpatil123@cluster0.2v4mycb.mongodb.net/todo?retryWrites=true&w=majority'

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
app.use(session({
    secret: session_secret
})); // adds session property to the req/res

app.use('/', userRoutes);

app.get('/', (req,res)=> {
    res.send("Hello there")
})

const port = process.env.PORT || 8000
const host = '0.0.0.0';

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(port, host, ()=> console.log(`server running on port ${port}`)))
    .catch((err)=> console.log(err.message))

