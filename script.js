// all buttons in variables
const equalsButton = document.querySelector(".equals-btn");
const clearButton = document.querySelector(".clear-btn");
const backspaceButton = document.querySelector(".del-btn");
const periodButton = document.querySelector(".period-btn");
const displayCurrent = document.querySelector(".display-current");
const displayHistory = document.querySelector(".display-history");
const numbersButtons = Array.from(document.querySelectorAll(".number-btns"))
const operationButtons = Array.from(document.querySelectorAll(".oper-btns"))

// event listeners on the buttons
numbersButtons.forEach(button => button.addEventListener("click", computeNumbers));
operationButtons.forEach(button => button.addEventListener("click", handleOperations));
equalsButton.addEventListener("click", equalsTo);
clearButton.addEventListener("click", clearData);
backspaceButton.addEventListener("click", backspace);
periodButton.addEventListener("click", handlePeriod);
window.addEventListener("keydown", handleKeyboard);

// variables to store the first number and second number
let firstNumber = "";
let secondNumber = "";
let historyDisplay = "";
let operatorPressed = false;
let periodPresent = false;
let resultGiven = false;
let operationsCallsEquals = false;
let operation;
let result;
let operatorSymbol;

// handle numbers when clicked
function computeNumbers(e) {
    // if the key was pressed on the keyboard || if the button was clicked
    const pressedButton = e.key || e.target.innerText;

    if (resultGiven) {
        clearData()
    }

    if (operatorPressed === false && firstNumber !== 0) {
        firstNumber += pressedButton;
        addToDisplayCurrent(firstNumber);
    
    } else if ((operatorPressed === true && periodPresent === false && operationsCallsEquals === true) 
                || (firstNumber === secondNumber)
                || (operatorPressed === true && secondNumber === 0)) {

        secondNumber = "";
        secondNumber += pressedButton;
        addToDisplayCurrent(secondNumber);

    } else {
        secondNumber += pressedButton;
        addToDisplayCurrent(secondNumber);
    }
}

function handleOperations(e) {
    operation = e.key || e.target.dataset.key;
    
    switch (operation) {
        case "*":
            operatorSymbol = "x";
            break;
    
        case "/":
            operatorSymbol = "÷";
            break;
        
        case "-":
            operatorSymbol = "-";
            break;

        case "+":
            operatorSymbol = "+"
            break
    
        default:
            break;
    }

    if (operatorPressed === false) {
        
        if (firstNumber === "") {
            firstNumber = 0;
        }
    
        historyDisplay += firstNumber + " " + operatorSymbol;
        addToDisplayHistory(historyDisplay);
        secondNumber = firstNumber;
        operatorPressed = true;
        periodPresent = false;
        resultGiven = false;
    
    } else if ((firstNumber === secondNumber) || secondNumber === "") {
        historyDisplay = historyDisplay.slice(0, -1);
        historyDisplay += operatorSymbol;
        addToDisplayHistory(historyDisplay)

    } else {
        operationsCallsEquals = true;
        equalsTo()
    }
}

// perform the operations based on the operation variable
function operate(operator, number1, number2) {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);

    switch (operator) {
        case '/':
            if (number2 === 0) {
                return "Error: Division by zero";
            }
            return number1 / number2;
        case '*':
            return number1 * number2;
        case '-':
            return number1 - number2;
        case '+':
            return number1 + number2;
        default:
            return number1;
    }
}


function handlePeriod(e) {
    const pressedButton = e.key || e.target.innerText;
    
    if (periodPresent) {
        return;
    } else if (resultGiven === true) {
        clearData()
    }

    if (operatorPressed === false) {
        
        if (firstNumber === "") {
            firstNumber = 0;
        }

        firstNumber += pressedButton;
        addToDisplayCurrent(firstNumber);

    } else if (firstNumber === secondNumber) {
        secondNumber = 0;
        secondNumber += pressedButton;
        addToDisplayCurrent(secondNumber);

    } else {

        if (secondNumber === "") {
            secondNumber = 0;
        }

        secondNumber += pressedButton;
        addToDisplayCurrent(secondNumber);
    }
    periodPresent = true;
}


function equalsTo() {
    
    result = operate(operation, firstNumber, secondNumber)
    
    if (result !== "Error: Invalid operator" && result !== "Error: Division by zero" && !isNaN(result)) {
        
        // to.Fixed and parseFloat again to remove unnecessary 0's to the right
        result = parseFloat(result.toFixed(6));
        addToDisplayCurrent(result);
        
        if (operationsCallsEquals === true) {
            historyDisplay = result + " " + operatorSymbol
            addToDisplayHistory(historyDisplay)
            firstNumber = result;
            secondNumber = result;
            operationsCallsEquals = false;
            
        } else if (secondNumber === "" && historyDisplay === "") {
            historyDisplay += firstNumber + " =";
            addToDisplayHistory(historyDisplay);
            firstNumber = result;
            historyDisplay = "";
            operatorPressed = false;
            periodPresent = false;
            resultGiven = true;

        } else {
            historyDisplay += " " + secondNumber + " =";
            addToDisplayHistory(historyDisplay);
            firstNumber = result;
            secondNumber = result;
            historyDisplay = "";
            operatorPressed = false;
            periodPresent = false;
            resultGiven = true;
        }
    } else if (isNaN(result) && firstNumber === "") {
        historyDisplay += 0 + " ="
        addToDisplayHistory(historyDisplay);
        firstNumber = 0;
        result = 0;
        historyDisplay = "";
        operatorPressed = false;
        periodPresent = false;
        resultGiven = true;

    } else {
        addToDisplayCurrent("Division by zero is not possible")
    }
}


function clearData() {
    firstNumber = "";
    secondNumber = "";
    historyDisplay = "";
    operatorPressed = false;
    periodPresent = false;
    resultGiven = false;
    operationsCallsEquals = false;
    addToDisplayCurrent(0)
    addToDisplayHistory(historyDisplay)
}


function backspace() {
    if (resultGiven === true) {
        secondNumber = "";
        historyDisplay = "";
        operatorPressed = false;
        periodPresent = false;
        resultGiven = false;
        operationsCallsEquals = false;
        addToDisplayHistory(historyDisplay)
    
    } else if (operatorPressed === true) {
        if (!(firstNumber === secondNumber) && secondNumber !== 0) {
            
            secondNumber = secondNumber.slice(0, -1);
            
            if (secondNumber !== "") {
                addToDisplayCurrent(secondNumber)
            } else {
                secondNumber = 0;
                addToDisplayCurrent(secondNumber)
            }
        }
    } else {
        if (firstNumber !== 0) {
            firstNumber = firstNumber.slice(0, -1);
            
            if (firstNumber !== "") {
                addToDisplayCurrent(firstNumber)
            } else {
                firstNumber = 0;
                addToDisplayCurrent(firstNumber)
            }
        }
    }
}


// display firstNumber variable to the .display-current
function addToDisplayCurrent(number) {
    displayCurrent.innerText = number;
}

// display secondNumber variable to the .display-history
function addToDisplayHistory(number) {
    displayHistory.innerText = number;
}

// function to capture the keys pressed on the keyboard
function handleKeyboard(e) {
    const event = e;
    let pressedKey = document.querySelector(`button[data-key="${e.key}"]`)

    let enterKey = e.key;
    
    if (pressedKey !== null) {

        pressedKey = pressedKey.dataset.key

        switch (pressedKey) {
            case "Backspace":
                backspace();
                break;
            
            case ".":
                handlePeriod(event);
                break;

            case "=":
                equalsTo();
                break;

            case "-":
            case "+":
            case "/":
            case "*":
                handleOperations(event);
                break;
            
            case "Escape":
                clearData()
                break;
        
            default:
                computeNumbers(event);
                break;
        }
    } else if (enterKey === "Enter") {
        equalsTo();
    }
    
}