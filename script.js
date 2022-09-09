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
operation.forEach( operation => {
  operation.addEventListener('click', (e)=> {
    if (!secondVal) return;
    containDot = false;
    const operationName = e.target.innerText;
    if (firstVal && secondVal && operationType){
      display.innerText = '';
      operate();
      display.innerText = result;
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
  display.innerText = result;
  secondVal = '';
}
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
  display.innerText = result;
  secondVal = result;
  firstVal = '';
})
//cleear operation
clear.addEventListener('click', ()=>{
 firstVal = '';
 secondVal = '';
 display.innerText ='';
 result = '';
});
//backspace operation
clearLast.addEventListener('click', () => {
  display.innerText = display.innerText.slice(0, -1);
  secondVal = '';
})
