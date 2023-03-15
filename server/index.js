import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import postRouters from './routes/posts.js';
//We can remove const wala thing see index.js type
const app=express();
app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors());
app.use('/posts',postRouters);
const CONNECTIONURL="mongodb+srv://sushmit_admin:123456sushmit@cluster0.n3z1o3c.mongodb.net/?retryWrites=true&w=majority";
const PORT= process.env.PORT || 5000;
mongoose.connect(CONNECTIONURL)
    .then(()=>app.listen(PORT,()=>console.log('Server running on :'+ PORT)))
    .catch((error)=> console.log(error.message));
// mongoose.set('useFindAndModify',false);this is deprecated in mongo 6.0