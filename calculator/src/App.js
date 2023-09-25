import { useReducer } from 'react';
import './App.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';


export const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'

}

function reducer(state,{type,payload}){
  switch(type)
  {
    case ACTIONS.ADD_DIGIT:
      //basically overwrites after you perform an operation
      if(state.overwrite)
      {
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false
        }
      }
      //if digit we clicked upon is 0 and there is already one 0 written ,don't make any changes
      if(payload.digit==="0" && state.currentOperand==="0") 
      {
        return state
      }
      if(payload.digit==="." && state.currentOperand==null) 
      {
        return state
      }
      if(payload.digit==="." && state.currentOperand.includes(".")) 
      {
        return state
      }
      return{
        ...state,
        currentOperand:`${state.currentOperand||""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand==null && state.previousOperand==null)
      {
        return state;
      }
      //if you want to hang your opran
      if(state.currentOperand==null)
      {
        return{
          ...state,
          operation:payload.operation
        }
      }
      //you chose an operation for the first time so make your current operand to previous
      if(state.previousOperand==null)
      {
        return{
          ...state,
          operation:payload.operation,
          previousOperand:state.currentOperand,
          currentOperand:null,
        }
      }

      //you chose an operand for 2nd or 3rd etc time
      //so you need to evaluate the expression first
      
      return{
        ...state,
        previousOperand:evaluate(state),
        operation:payload.operation,
        currentOperand:null
      }
    case ACTIONS.CLEAR:
      return{
        /*
        ...state,
        currentOperand:"0",
        previousOperand:null,
        operation:null
        */
      };
    case ACTIONS.DELETE_DIGIT:
      //if you want to overwrite
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currentOperand:null
        }
      }
      //if no current operand
      if(state.currentOperand==null){return state}

      //only one digit
      if(state.currentOperand.length===1)
      {
        return{
          ...state,
          currentOperand:null
        }
      }
      //else if we have more than one digit
      return{
        ...state,
        //removes last digit
        currentOperand:state.currentOperand.slice(0,-1)
      }
    case ACTIONS.EVALUATE:
      //do nothing if there is nothing
      if(state.operation==null ||state.currentOperand==null ||state.previousOperand==null)
      {
        return state;
      }

      return{
        ...state,
        overwrite:true,
        previousOperand:null,
        operation:null,
        currentOperand:evaluate(state)
      }
    default:
  }
}

function evaluate({currentOperand,previousOperand,operation})
{
  const prev=parseFloat(previousOperand)
  const current=parseFloat(currentOperand)
  if(isNaN(prev)||isNaN(current))
  {
    return ""
  }
  let computation=""
  switch(operation)
  {
    case "+":
      computation=prev + current;
      break;
    case "-":
      computation=prev - current;
      break;
    case "x":
      computation=prev * current;
      break;
    case "÷":
      computation=prev / current;
      break;
    default:
      break;
  }
  return computation.toString();
}

//to put commas
const INTEGER_FORMATTER=new Intl.NumberFormat("en-us",{
  //we dont want any fractions here
  maximumFractionDigits:0,
})

function formatOperand(operand){
  //if nothing written
  if(operand==null) return
  //split before and after decimal
  const [integer,decimal]=operand.split(".")
  //if no decimal
  if(decimal==null) return INTEGER_FORMATTER.format(integer)
  //if decimal
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
function App() {
  /*const [state,dispatch]=useReducer(reducer);*/
  const [{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{});
  /*dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit:1}})*/
  /*function reducer(state,action)*/

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)}{operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton dispatch={dispatch} operation="÷"/>
      <DigitButton dispatch={dispatch} digit="1"/>
      <DigitButton dispatch={dispatch} digit="2"/>
      <DigitButton dispatch={dispatch} digit="3"/>
      <OperationButton dispatch={dispatch} operation="x"/>
      <DigitButton dispatch={dispatch} digit="4"/>
      <DigitButton dispatch={dispatch} digit="5"/>
      <DigitButton dispatch={dispatch} digit="6"/>
      <OperationButton dispatch={dispatch} operation="+"/>
      <DigitButton dispatch={dispatch} digit="7"/>
      <DigitButton dispatch={dispatch} digit="8"/>
      <DigitButton dispatch={dispatch} digit="9"/>
      <OperationButton dispatch={dispatch} operation="-"/>
      <DigitButton dispatch={dispatch} digit="."/>
      <DigitButton dispatch={dispatch} digit="0"/>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>  
    </div>
  );
}

export default App;
