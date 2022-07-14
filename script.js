// starting variables used to set the calculator to the initial state
let firstStoredNumbers = [];
let secondStoredNumbers = [];
let noCommaFirstNumbers = '';
let noCommaSecondNumbers = '';
let operationExecuted = '';
let result = 0;
let a;
let b;
let equalsPressed = '';
let pressedNumber;
let numberRegistered;
let pressedKey;

// operations const to be used on the operate function
const division = (a, b) => a / b;
const multiplication = (a, b) => a * b;
const subtract = (a, b) => a - b;
const add = (a, b) => a + b;

// variables for capturing the buttons
const operatorBtns = Array.from(document.querySelectorAll('.oper-btns'));
const numbers = Array.from(document.querySelectorAll('.number-btns'));
const displayCurrent = document.querySelector('.display-current');
const displayHistory = document.querySelector('.display-history');
const periodBtn = document.querySelector('.period-btn');
const equalsBtn = document.querySelector('.equals-btn');
const clearBtn = document.querySelector('.clear-btn');
const delBtn = document.querySelector('.del-btn');

// buttons being used with their respective events
operatorBtns.forEach(operator => operator.addEventListener('click', operationPressed));
numbers.forEach(number => number.addEventListener('click', storeNumber));
clearBtn.addEventListener('click', clearAllData);
periodBtn.addEventListener('click', disableIf);
equalsBtn.addEventListener('click', equalsTo);
delBtn.addEventListener('click', deleteLast);
window.addEventListener('keydown', keyPressed);


// starting all the functions used on the code. Only functions below this part

function numberPressed(e) {
  if (pressedKey == null && escEnterPressed != 'Enter') {
    numberRegistered = e.target.innerHTML;
  } else if (pressedKey != null) {
    numberRegistered = pressedKey;
  } else if (pressedKey == null && escEnterPressed == 'Enter') {
    numberRegistered = '='
  }
  return numberRegistered;
}

function storeNumber(e) {
  pressedNumber = numberPressed(e);
  
  if (pressedNumber == '.' && noCommaFirstNumbers == '' && noCommaSecondNumbers == '') {
    firstStoredNumbers.push(0, pressedNumber);
    noCommaFirstNumbers = firstStoredNumbers.join('')
    displayCurrent.innerHTML = noCommaFirstNumbers;

  // this runs if the user clicks the dot before any other number otherwise it
  // breaks the number and allow multiple dots.
  // this will also run if the user inputs dot as first character after an operation
  } else if ((pressedNumber == '.' && noCommaFirstNumbers != '' 
  && noCommaSecondNumbers == '' && equalsPressed == '=') || (pressedNumber == '.' && 
  (noCommaSecondNumbers === 0 || noCommaSecondNumbers === '') &&
  operationExecuted != '')) {
    
    secondStoredNumbers.push(0, pressedNumber);
    noCommaSecondNumbers = secondStoredNumbers.join('')
    displayCurrent.innerHTML = noCommaSecondNumbers;
    return noCommaSecondNumbers; 
    
  // this runs as the first input from the user except if it's a dot
  } else if (noCommaSecondNumbers === '') {
    firstStoredNumbers.push(pressedNumber);
    noCommaFirstNumbers = firstStoredNumbers.join('')
    displayCurrent.innerHTML = noCommaFirstNumbers;
    return noCommaFirstNumbers;     

  // this is used if the user starts typing new numbers after the equals button
  // was pressed. It restarts everything just like the clear button
  } else if (noCommaSecondNumbers !== 0 && noCommaSecondNumbers !== '' 
    && equalsPressed === '=' || displayCurrent.innerHTML == "ERROR") {
    clearAllData();
    firstStoredNumbers.push(pressedNumber);
    noCommaFirstNumbers = firstStoredNumbers.join('')
    displayCurrent.innerHTML = noCommaFirstNumbers;
    return noCommaFirstNumbers;   
  
  // this runs if the user has already input a first set of numbers and pressed
  // any operation button
  } else {
    secondStoredNumbers.push(pressedNumber);
    noCommaSecondNumbers = secondStoredNumbers.join('')
    displayCurrent.innerHTML = noCommaSecondNumbers;
    return noCommaSecondNumbers; 
  }
}

function operationPressed(e) {

  // this will be triggered first time any operation is pressed
  if (operationExecuted == '' && result == 0) {
    operationExecuted = numberPressed(e);
    displayHistory.innerHTML = `${noCommaFirstNumbers} ${operationExecuted}`;
    noCommaSecondNumbers = 0;
    return operationExecuted;
  }

  // this will be triggered if a add operation was executed previously and 
  // pressed again
  if (operationExecuted == '+' && equalsPressed == '') {
    operate();
    operationExecuted = numberPressed(e);
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];
  
  // this will be triggered if a subtraction operation was executed previously 
  // and pressed again
  } else if (operationExecuted == '-' && equalsPressed == '') {
    operate();
    operationExecuted = numberPressed(e);
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];

  // this will be triggered if a multiplication operation was executed previously 
  // and pressed again
  } else if (operationExecuted == 'x' && equalsPressed == '') {
    operate();
    operationExecuted = numberPressed(e);
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];
  
  // this will be triggered if a division operation was executed previously 
  // and pressed again
  } else if (operationExecuted == '÷' && equalsPressed == '') {
    operate();
    if (!isFinite(result)) return;
    operationExecuted = numberPressed(e);
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];
  
  } else if (equalsPressed == '=') {
    operationExecuted = numberPressed(e);
    displayHistory.innerHTML = `${result} ${operationExecuted}`;
    noCommaFirstNumbers = result;
    secondStoredNumbers = [];
    equalsPressed = '';
  }
}

// function executed with the equals button only
function equalsTo(e) {
  periodBtn.disabled = false
  if (noCommaSecondNumbers == '') {
    equalsPressed = numberPressed(e);
    operate()
    displayHistory.innerHTML = `${a} ${equalsPressed}`;
    noCommaFirstNumbers = result;
    firstStoredNumbers = [];
    return;
  }
  equalsPressed = numberPressed(e);
  operate()
  displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${equalsPressed}`;
  noCommaFirstNumbers = result;
  secondStoredNumbers = [];
}

function operate() {
  // converts the inputs into numbers in order to execute the operations
  // properly, otherwise it concatenates the numbers as strings.
  a = parseFloat(noCommaFirstNumbers);
  b = parseFloat(noCommaSecondNumbers);

  if (operationExecuted == "+") {
    let resultFloat = add(a, b);
    result = parseFloat(resultFloat.toFixed(6))
    displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${operationExecuted}`;
    displayCurrent.innerHTML = `${result}`;
    return result;  
  
  } else if (operationExecuted == "-") {
    let resultFloat = subtract(a, b);
    result = parseFloat(resultFloat.toFixed(6))
    displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${operationExecuted}`;
    displayCurrent.innerHTML = `${result}`;
    return result;  
  
  } else if (operationExecuted == "x") {
    let resultFloat = multiplication(a, b);
    result = parseFloat(resultFloat.toFixed(6))
    displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${operationExecuted}`;
    displayCurrent.innerHTML = `${result}`;
    return result;  
  
  } else if (operationExecuted == "÷") {
    let resultFloat = division(a, b);
    result = parseFloat(resultFloat.toFixed(6));
    if (!isFinite(result)) {
      displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${operationExecuted}`;
      displayCurrent.innerHTML = `ERROR`;
      alert("You can't divide by 0!")
      return;
    }
    displayHistory.innerHTML = `${a} ${operationExecuted} ${b} ${operationExecuted}`;
    displayCurrent.innerHTML = `${result}`;
    return result;  
  }
}

function clearAllData() {
  firstStoredNumbers = [];
  secondStoredNumbers = [];
  noCommaFirstNumbers = '';
  noCommaSecondNumbers = '';
  operationExecuted = '';
  result = 0;
  a;
  b;
  equalsPressed = '';
  displayHistory.innerHTML = '';
  displayCurrent.innerHTML = 0;
  periodBtn.disabled = false
  escEnterPressed;
}

function deleteLast() {
  if (displayCurrent.innerHTML == noCommaSecondNumbers) {
    secondStoredNumbers.pop();
    noCommaSecondNumbers = secondStoredNumbers.join('')
    displayCurrent.innerHTML = noCommaSecondNumbers;
    if (noCommaSecondNumbers === '') {
      noCommaSecondNumbers = 0;
      displayCurrent.innerHTML = noCommaSecondNumbers;
    }
  } else if (displayCurrent.innerHTML == result) {
    displayHistory.innerHTML = '';

  } else {
    firstStoredNumbers.pop();
    noCommaFirstNumbers = firstStoredNumbers.join('')
    displayCurrent.innerHTML = noCommaFirstNumbers;
  }
}

let periodChecked;

function disableIf() {
  const checkForPeriod = displayCurrent.innerHTML;
  periodChecked = containsDot(checkForPeriod);
  
  if (periodChecked) {
    periodBtn.disabled = true;
  } else {
    periodBtn.disabled = false;
  }
}

// check if it's an integer or a float number. If true = integer
function containsDot(n) {
  if (n.includes('.')) {
    return true;
  } else {
    return false;
  }
}

let escEnterPressed;

function keyPressed(e) {
  pressedKey = document.querySelector(`button[data-key="${e.key}"]`)
  
  // created this variable for enter and esc keys to avoid refactor all code
  escEnterPressed = e.key;
  

  if (pressedKey == null && escEnterPressed != 'Enter' && escEnterPressed != 'Escape') {
    return;

  } else if (pressedKey == null && escEnterPressed == 'Enter' && escEnterPressed != 'Escape') {
    equalsTo(e);

  } else if (pressedKey == null && escEnterPressed != 'Enter' && escEnterPressed == 'Escape') {
    clearAllData();

  } else {
    pressedKey = pressedKey.innerHTML;
    
    if (pressedKey <= 9 && pressedKey >= 0){
      storeNumber(e);
  
    } else if (pressedKey == '-' || pressedKey == '+' || pressedKey == '÷' ||
    pressedKey == 'x') {
      operationPressed(e);
  
    } else if (pressedKey == '=') {
      equalsTo(e);
  
    } else if (pressedKey == 'Backspace') {
      deleteLast();
  
    } else if ((pressedKey == '.' && (noCommaFirstNumbers != '' || noCommaFirstNumbers === 0)
    && noCommaSecondNumbers == '' && equalsPressed == '=') || (pressedKey == '.' && 
    (noCommaSecondNumbers === 0 || noCommaSecondNumbers === '') &&
    operationExecuted != '')) {
      storeNumber(e);
  
    } else if (pressedKey == '.' ) {
      disableIf();
      if (periodChecked == true) {
        return true;
      } else {
        storeNumber(e);
      }
    }
    pressedKey = null;
  }
}
