const express=require('express');
const {connectMongoDb} = require('./connections/mongodb');
const Task=require('./models/task');
const User=require('./models/user');
const userRouter=require("./routes/user");
const taskRouter=require("./routes/task");
require("dotenv").config();

var bodyParser = require('body-parser')

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// const dbURI='mongodb://root:root@localhost:27017/TMS?authSource=admin';

console.log(process.env.MONGODB_CONNECTION_URL);
connectMongoDb(process.env.MONGODB_CONNECTION_URL)
.then(()=> app.listen(3000, ()=> console.log('Listening on port 3000')))
.catch((err)=> console.log(err));


app.use("/task",taskRouter);
app.use("/user",userRouter);


