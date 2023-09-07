import React from 'react'
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";

const ToDo = ({text,updateMode,deleteToDo}) => {
  return (
    <div className="todo">
        <div className="text">{text}</div>
        {/*React Icons*/}
        <div className="icons">
            <BiEdit className='icon' onClick={updateMode}/>{/*Update Icon*/}
            <AiFillDelete className='icon'  onClick={deleteToDo}/>{/*Delete Icon*/}
        </div>
    </div>
  )
}

export default ToDo