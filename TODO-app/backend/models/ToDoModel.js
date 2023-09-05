//Model View Controller Model part
//for the database
const  mongoose  = require("mongoose")

const toDoSchema=new mongoose.Schema({
    text:{
        type:String,
        require:true
    }
})

//export 
module.exports=mongoose.model('ToDo',toDoSchema);