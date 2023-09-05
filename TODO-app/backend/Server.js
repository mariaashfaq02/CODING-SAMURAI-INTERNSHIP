//Express framework
const express=require('express');

//MongoDB
const mongoose=require('mongoose');

const cors=require('cors');

//Routes
const routes=require("./routes/ToDoRoute");

//Environment Variables
require('dotenv').config();

const app=express();

//creating our localhost port
const PORT=process.env.port || 5000;

app.use(express.json());
app.use(cors());

//connect to mongoDB
mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log(`Connected to MongoDB....`))
    .catch((err)=>console.log(err));

//use route
app.use(routes);


//run the app
app.listen(PORT,()=>console.log(`Listening on: ${PORT}`))