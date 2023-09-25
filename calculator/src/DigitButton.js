import React from 'react'
import { ACTIONS } from './App'

/*{dispatch,digit} are basically props*/
const DigitButton = ({dispatch,digit}) => {
  return (
    <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>{digit}</button>
  )
}

export default DigitButton