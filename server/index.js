import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRouters from './routes/posts.js';
import userRouters from './routes/users.js';
import dotenv from 'dotenv';
//We can remove const wala thing see index.js type
const app=express();
dotenv.config();
app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors());
app.use('/posts',postRouters);
app.use('/user',userRouters);
// const CONNECTIONURL="mongodb://0.0.0.0:27017/memories_db";
mongoose.set("strictQuery",false);
const PORT= process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT,()=>console.log('Server running on :'+ PORT)))
    .catch((error)=> console.log(error.message));
// mongoose.set('useFindAndModify',false);this is deprecated in mongo 6.0