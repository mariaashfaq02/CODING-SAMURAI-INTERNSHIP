//for handling our api
//basically connecting our frontend and backend

import axios from 'axios';

const baseUrl ="http://localhost:5000";

const getAllToDo = (setToDo)=>{
    axios
    .get(baseUrl)
    .then(({data})=>{
        console.log("data--->",data);
        setToDo(data);
    })
}

const addToDo =(text,setText,setToDo)=>{
    //remember how we saved our todo data in baseURl/save page in backend?
    axios.post(`${baseUrl}/save`,{text})
    .then((data)=>{
        //log on data to console
        console.log(data);

        //text that is written in put to be erased
        setText("");

        //re-render the page and show all the to-do's
        //including the one you just wrote
        getAllToDo(setToDo);
    })
    .catch((err)=>{
        console.log(err);
    })
}

const updateToDo =(toDoId,text,setToDo,setText,setIsUpdating)=>{
    //remember how we saved our todo data in baseURl/save page in backend?
    axios
    .post(`${baseUrl}/update`,{_id: toDoId,text})
    .then((data)=>{
        //set the text to nothing
        setText("");
        //since you have updated,set it back to false
        setIsUpdating(false);
        //re-render the page and show all the to-do's
        //including the one you just wrote
        getAllToDo(setToDo);
    })
    .catch((err)=>{
        console.log(err);
    })
    
}
export {getAllToDo,addToDo,updateToDo};