const numberButtons = document.querySelectorAll('[number-button]')
const operatorButtons = document.querySelectorAll('[operator-button]')
const allClearButton = document.querySelector('[allClear-button]')
const equalsButton = document.querySelector('[equals-button]')
const deleteButton = document.querySelector('[delete-button]')
const calculatorDisplay = document.querySelector('[current-display]')
const previousDisplay = document.querySelector('[previous-display]')

let operation = undefined
let calculatorDisplayText = '0'
let previousDisplayText = ''
let hasAnswer = false

const clear = () => {
  operation = undefined
  calculatorDisplayText = '0'
  previousDisplayText = ''
  hasAnswer = false
  updateDisplay()
}

const deleteFunction = () => {
  console.log('sd')
  if (calculatorDisplayText === '0' || calculatorDisplayText === '') {
    return
  } else {
    calculatorDisplayText = calculatorDisplayText.substring(
      0,
      calculatorDisplayText.length - 1
    )
  }
  updateDisplay()
}

const addNumber = (number) => {
  console.log(hasAnswer)
  if (number === '.' && calculatorDisplayText.includes('.')) {
    return
  }
  if (hasAnswer) {
    clear()
    hasAnswer = false
  }
  if (calculatorDisplayText === '0') {
    calculatorDisplayText = number
  } else {
    calculatorDisplayText = calculatorDisplay.innerText + number
  }
  updateDisplay()
}

const addOperator = (operator) => {
  if (calculatorDisplayText === '0' || calculatorDisplayText === '') {
    return
  }
  if (previousDisplayText !== '') {
    calculate()
  }
  operation = operator
  previousDisplayText = `${calculatorDisplayText} ${operation}`
  calculatorDisplayText = ''
  hasAnswer = false
  updateDisplay()
  calculate()
}

const getSum = (firstNumber, secondNumber, operator) => {
  let result
  if (operator === '+') {
    result = firstNumber + secondNumber
  } else if (operator === '-') {
    result = firstNumber - secondNumber
  } else if (operator === '*') {
    result = firstNumber * secondNumber
  } else if (operator === '÷') {
    result = firstNumber / secondNumber
  }
  calculatorDisplayText = result
}

const calculate = () => {
  const operatorRegex = /[+'-'*/]/g
  let firstNumber
  let secondNumber
  if (calculatorDisplayText === '' || previousDisplayText === '') {
    return
  } else {
    firstNumber = parseFloat(previousDisplayText.replace(operatorRegex, ''))
    secondNumber = parseFloat(calculatorDisplayText)
    getSum(firstNumber, secondNumber, operation)
    previousDisplayText = ''
    hasAnswer = true
  }
  updateDisplay()
}

const updateDisplay = () => {
  console.log('calculatorDisplayText', calculatorDisplayText)
  calculatorDisplay.innerText = calculatorDisplayText
  previousDisplay.innerText = previousDisplayText
}

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addNumber(button.innerText)
  })
})

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addOperator(button.innerText)
  })
})

equalsButton.addEventListener('click', () => {
  calculate()
})

allClearButton.addEventListener('click', () => {
  clear()
})

deleteButton.addEventListener('click', () => {
  deleteFunction()
})
