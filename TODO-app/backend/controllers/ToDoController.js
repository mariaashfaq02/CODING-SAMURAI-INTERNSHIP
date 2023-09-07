//Model View Controller Controller part
//To define how data is going to be stored on the database
const ToDoModel=require("../models/ToDoModel");

//get all toDos
module.exports.getToDo=async(req,res)=>{
    //givs us all to-do's from database
    const toDos=await ToDoModel.find();
    res.send(toDos);
}

//save a toDo
module.exports.saveToDo=async(req,res)=>{
    const {text} = req.body;
    
    ToDoModel
    .create({text})
    .then((data)=>{
        console.log("Added Successfully....");
        console.log(data);
        res.send(data);  
    });
}

//Update ToDo
module.exports.updateToDo=async(req,res)=>{
    //take the id and body of text of the toDo
    const {_id,text}=req.body;
    ToDoModel
    .findByIdAndUpdate(_id,{text})
    .then(()=>res.send("Updated Successfully...."))
    .catch((err)=>console.log(err))
}

//Delete ToDo
module.exports.deleteToDo=async(req,res)=>{
    //take the id and body of text of the toDo
    const {_id}=req.body;
    ToDoModel
    .findByIdAndDelete(_id)
    .then(()=>res.send("Deleted Successfully...."))
    .catch((err)=>console.log(err))
}