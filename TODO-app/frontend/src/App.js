import React , { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo ,updateToDo,deleteToDo} from "./utils/HandleApi";

function App() {

  //to save to do
  const [toDo,setToDo] = useState([]);
  //text to be written in the input field
  const [text,setText] =useState("");
  //update to do
  const [isUpdating,setIsUpdating]=useState(false);
  const [toDoId,setToDoId]=useState("");
  
  //useEffect
  useEffect(()=>{
    getAllToDo(setToDo)
  },[])

  const updateMode=(_id,text)=>{
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  }

  
  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">

          {/*text used in above UseState*/}
          <input 
          type="text" 
          placeholder="Add something you want to remember....." 
          value={text} 
          onChange={(e)=>setText(e.target.value)}
          />

          {/*For adding or updating To Do*/}
          <div className="add" 
          onClick={isUpdating?
          ()=>updateToDo(toDoId,text,setToDo,setText,setIsUpdating)
          :
          ()=>addToDo(text,setText,setToDo)}>
            {isUpdating?"Update":"Add"}
          </div>
          </div>
          {/*For listing all To Do*/}
          <div className="list">
            {/*Dynamically render to to-do's from database*/}
            {toDo.map((item)=><ToDo 
            key={item._id} 
            text={item.text}
            updateMode={()=>updateMode(item._id,item.text)}
            deleteToDo={()=>deleteToDo(item._id,setToDo)}
            />)}
          </div>
      </div>      
    </div>
  );
}

export default App;
