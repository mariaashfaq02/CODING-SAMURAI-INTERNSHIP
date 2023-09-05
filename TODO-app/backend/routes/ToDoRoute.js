const {Router}=require("express");
const {getToDo, saveToDo, updateToDo, deleteToDo} =require("../controllers/ToDoController")
const router=Router();

//to handle requests

router.get('/',getToDo);
/*
router.get('/',(req,res)=>{
    //what is going to be shown on screen
    res.json({message:"Hi there..."});
});
*/

//saving to-do's
router.post('/save',saveToDo); 

//updating to-do's
router.post('/update',updateToDo); 

//deleting to-do's
router.post('/delete',deleteToDo); 

//export the route
module.exports=router;