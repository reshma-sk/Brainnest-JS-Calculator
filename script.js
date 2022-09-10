const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operation = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const clearLast = document.querySelector('.backSpace');
let firstVal = '';
let secondVal = '';
let result = null;
let operationType = '';
let containDot = false;
//numbers
numbers.forEach( number => {
  number.addEventListener('click', (e)=>{
    if(e.target.innerText === '.' && !containDot){
      containDot = true;
    } else if(e.target.innerText === '.' && containDot){
      return;
    }
    secondVal += e.target.innerText;
    display.innerText = secondVal;    
  })
})
//operators
operation.forEach( operation => {
  operation.addEventListener('click', (e)=> {
    if (!secondVal) return;
    containDot = false;
    const operationName = e.target.innerText;
    if (firstVal && secondVal && operationType){
      display.innerText = '';
      operate();
    }
    else{
     result = parseFloat(secondVal);
     display.innerText = result;
    }
    clearVar();
    operationType = operationName;
  })
});
function clearVar(){
  firstVal = secondVal;
   // Round to 9 decimal places
  const tenFactor = Math.pow(10, 9);
  display.innerText = Math.round(result*tenFactor)/tenFactor;
  secondVal = '';
}
//operate function
function operate() {
  if (operationType === 'x') {
    result = parseFloat(result) * parseFloat(secondVal);
  } else if (operationType === '+') {
    result = parseFloat(result) + parseFloat(secondVal);  
  } else if (operationType === '-') {
    result = parseFloat(result) - parseFloat(secondVal); 
  } else if (operationType === '/') {
    result = parseFloat(result) / parseFloat(secondVal);  
  }else if( operationType === '%'){
    result = parseFloat(result) % parseFloat(secondVal);
    display.innerText = result;
  }
}
// equal operation
equal.addEventListener('click', ()=> {
  if(!firstVal || !secondVal) return;
  containDot = false;
  operate();
  clearVar();
  //display.innerText = result;
  secondVal = result;
  firstVal = '';
})
//cleear operation
clear.addEventListener('click', ()=>{
 firstVal = '';
 secondVal = '';
 display.innerText ='0';
 result = '';
 containDot = false;
});
//backspace operation
clearLast.addEventListener('click', () => {
  display.innerText = display.innerText.slice(0, -1);
  secondVal = display.innerText;
})
//keyboard suport
window.addEventListener('keydown', (e)=>{
  if(
    e.key === '0' ||
    e.key === '1' || 
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.' 
  ){
    clickButtonEl(e.key);
  }else if(
    e.key === '+' ||
    e.key === '-' ||
    e.key === '/' ||
    e.key === '%' 
  ){
    clickOperation(e.key);
  }
  else if(e.key === '*'){
    clickOperation('x')
  } else if( e.key == "Enter" || e.key === '='){
    clickEqual();
  }
})
function clickButtonEl(key) {
  numbers.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  })
}
function clickOperation(key){
  operation.forEach( operation => {
    if(operation.innerText === key){
      operation.click()
    }
  })
}
function clickEqual(){
  equal.click();
}

