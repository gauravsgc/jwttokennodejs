require('dotenv').config();
const express = require('express');
require("./db/cone");





const PORT=process.env.PORT||8000;
//this port u have given to load in the server
const cors = require('cors');
const cookieParser=require('cookie-parser');
const app = express();
// app.use(cors({
//     origin: '*'
// }));
// app.use(cors());
const corsOptions ={
    origin:'http://localhost:4200', 
    credentials:true,  //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const STUDENT = require("./models/students")
const studentRouter = require('./routers/student')


//var cors = require('cors')
app.use(express.json());
app.use(cookieParser());
//data in json form recognize
//app.use(cors()) // Use this after the variable declara

app.use(studentRouter);
//app.listen(PORT);
//for running the server:----
const start=async()=>{
try{
    app.listen(PORT);
    console.log("server start");
}
catch(error){
    console.log(error);
}
    
}
start();