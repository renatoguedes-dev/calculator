const numbers = Array.from(document.querySelectorAll('.number-btns'));
const displayCurrent = document.querySelector('.display-current');
const displayHistory = document.querySelector('.display-history');
const clearBtn = document.querySelector('.clear-btn');
const operatorBtns = Array.from(document.querySelectorAll('.oper-btns'));
const periodBtn = document.querySelector('.period-btn');
const equalsBtn = document.querySelector('.equals-btn');


numbers.forEach(number => number.addEventListener('click', storeNumber));
operatorBtns.forEach(operator => operator.addEventListener('click', operationPressed));
equalsBtn.addEventListener('click', equalsTo);

function numberPressed(e) {
  let numberRegistered = e.target.innerHTML;
  return numberRegistered;
}

let firstStoredNumbers = [];
let secondStoredNumbers = [];
let noCommaFirstNumbers = '';
let noCommaSecondNumbers = '';
let operationExecuted = '';
let result = 0;

function storeNumber(e) {
  if (noCommaSecondNumbers === '') {
    let pressedNumber = numberPressed(e);
    firstStoredNumbers.push(pressedNumber);
    noCommaFirstNumbers = firstStoredNumbers.join('')
    displayCurrent.innerHTML = noCommaFirstNumbers;
    return noCommaFirstNumbers;     
  } else {
    let pressedNumber = numberPressed(e);
    secondStoredNumbers.push(pressedNumber);
    noCommaSecondNumbers = secondStoredNumbers.join('')
    displayCurrent.innerHTML = noCommaSecondNumbers;
    return noCommaSecondNumbers;  
  }

}

function operationPressed(e) {

  // this will be triggered first time any operation is pressed
  if (operationExecuted == '' && result == 0) {
    operationExecuted = e.target.innerHTML;
    displayHistory.innerHTML = `${noCommaFirstNumbers} ${operationExecuted}`;
    noCommaSecondNumbers = 0;
    return operationExecuted;
  }

  // this will be triggered if a add operation was executed previously and 
  // pressed again
  if (operationExecuted == '+') {
    operate();
    operationExecuted = e.target.innerHTML;
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];
  
  // this will be triggered if a subtraction operation was executed previously 
  // and pressed again
  } else if (operationExecuted == '-') {
    operate();
    operationExecuted = e.target.innerHTML;
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];

  // this will be triggered if a multiplication operation was executed previously 
  // and pressed again
  } else if (operationExecuted == 'x') {
    operate();
    operationExecuted = e.target.innerHTML;
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];
  
  // this will be triggered if a division operation was executed previously 
  // and pressed again
  } else if (operationExecuted == '÷') {
    operate();
    operationExecuted = e.target.innerHTML;
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];
  } else if (equalsPressed == '=') {
    operationExecuted = e.target.innerHTML;
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];
    equalsPressed = '';
  }
}


function equalsTo(e) {
  equalsPressed = e.target.innerHTML;
  operate()
  displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${equalsPressed}`;
  noCommaFirstNumbers = result;
  secondStoredNumbers = [];
}

let a;
let b;
let equalsPressed = '';

function operate() {
  // let equalsToResult = equalsTo(e);
  a = parseInt(noCommaFirstNumbers);
  b = parseInt(noCommaSecondNumbers);

  if (operationExecuted == "+") {
    result = add(a, b);
    displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${operationExecuted}`;
    displayCurrent.innerHTML = `${result}`;
    return result;  
  
  } else if (operationExecuted == "-") {
    result = subtract(a, b);
    displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${operationExecuted}`;
    displayCurrent.innerHTML = `${result}`;
    return result;  
  
  } else if (operationExecuted == "x") {
    result = multiply(a, b);
    displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${operationExecuted}`;
    displayCurrent.innerHTML = `${result}`;
    return result;  
  
  } else if (operationExecuted == "÷") {
    result = division(a, b);
    displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${operationExecuted}`;
    displayCurrent.innerHTML = `${result}`;
    return result;  
  }

}

const division = function(a, b) {
  return a / b;
}

const multiply = function(a, b) {
  return a * b;
};

const subtract = function(a, b) {
  return a - b;
};

const add = function(a, b) {
  return a + b;
};

