const displayOperation = document.querySelector('.displayOperation');
const mainDisplay = document.querySelector('.mainDisplay');
const tempResult = document.querySelector('.tempResult');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clearAllValues = document.querySelector('.clear');
const negativeSign = document.querySelector('.negativeSign');
const cancel = document.querySelector('.cancel');

let firstDisplay = '';
let secondDisplay = '';
let result = null;
let lastOperation = '';
let isPresenceDot = false;

numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    inputValue(number.innerText)
  })
})

function inputValue(number) {
  if (number === '.' && !isPresenceDot) {
    isPresenceDot = true;
  } else if (number === '.' && isPresenceDot) {
    return;
  } else if (secondDisplay === '0') {
    number = '';
  }
  
  secondDisplay += number;
  mainDisplay.innerText = secondDisplay;
}

operations.forEach((operation) => {
  operation.addEventListener('click', (e) => {
    if (!secondDisplay) return;
    isPresenceDot = false;
    
    const operationName = e.target.innerText;
    
    if (firstDisplay && secondDisplay && lastOperation) {
      calculate();
    } else {
      result = parseFloat(secondDisplay);
    }
    
    clearVar(operationName);
    lastOperation = operationName;
    console.log(operationName)
  });
});

function clearVar(name = '') {
  firstDisplay += `${secondDisplay} ${name} `;
  displayOperation.innerText = firstDisplay;
  mainDisplay.innerText = '';
  secondDisplay = '';
  tempResult.innerText = result;
}

function calculate() {
  switch (lastOperation) {
    case 'x':
      result = parseFloat(result) * parseFloat(secondDisplay);
      break;
    case '+':
      result = parseFloat(result) + parseFloat(secondDisplay);
      break;
    case '-':
      result = parseFloat(result) - parseFloat(secondDisplay);
      break;
    case '/':
      result = parseFloat(result) / parseFloat(secondDisplay);
  }
}

equal.addEventListener('click', () => {
  if (!secondDisplay || !firstDisplay) return;
  
  calculate();
  clearVar();
  
  tempResult.innerText = '';
  firstDisplay = '';
  
  if (!Number.isInteger(result)) {
    result = result.toFixed(8).replace(/0*$/, "");
  }
  
  secondDisplay = '';
  mainDisplay.innerText = result;
});

negativeSign.addEventListener('click', () => {
  if (Number(mainDisplay.innerText) === 0) {
    return;
  }
  
  mainDisplay.innerText = Number(mainDisplay.innerText) * (-1);
  secondDisplay = mainDisplay.innerText;
});

cancel.addEventListener('click', cancelValue);

function cancelValue() {
  if (mainDisplay.innerText) {
    mainDisplay.innerText = mainDisplay.innerText.slice(0, -1);
    secondDisplay = ''
  }
}

clearAllValues.addEventListener('click', clearAll);

function clearAll() {
  firstDisplay = '';
  secondDisplay = '';
  result = '';
  displayOperation.innerText = '';
  mainDisplay.innerText = '';
  tempResult.innerText = '';
  isPresenceDot = false;
}

