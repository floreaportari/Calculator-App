const numButtons = document.querySelectorAll(".num");
const operandButtons = document.querySelectorAll(".operand");
const screenContainer = document.querySelector(".screen-container");
const resultOutputEl = document.querySelector(".result-output");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const allClearBtn = document.querySelector(".all-clear");

resultOutputEl.textContent = 0;

let currentNum = "";
let clickedOperator = undefined;
let previousNum = "";
let result = "";

function add(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
  return parseFloat(num1) / parseFloat(num2);
}

function operate(fistNumber, secondNumber, operand) {
  let result = 0;

  switch (operand) {
    case "+":
      result = add(fistNumber, secondNumber);
      break;
    case "-":
      result = subtract(fistNumber, secondNumber);
      break;
    case "*":
      result = multiply(fistNumber, secondNumber);
      break;
    case "/":
      if (secondNumber === 0) {
        return;
      } else {
        result = divide(fistNumber, secondNumber);
      }
      break;
  }

  return result;
}

numButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (currentNum.length <= 10) {
      if (btn.textContent === "." && currentNum.includes(".")) return;
      currentNum === "0" ? (currentNum = "") : "";

      currentNum += e.target.textContent;
      resultOutputEl.textContent = currentNum;
    }
  });
});

operandButtons.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    if (
      (!previousNum && !currentNum) ||
      (previousNum === "" && currentNum === "")
    )
      return;
    if (previousNum && currentNum) {
      calculate();
    }

    previousNum = currentNum;
    currentNum = "";

    clickedOperator = operatorBtn.textContent;
    resultOutputEl.textContent = currentNum + clickedOperator;
  });
});

function calculate() {
  result = operate(
    parseFloat(previousNum).toFixed(8),
    parseFloat(currentNum).toFixed(8),
    clickedOperator
  );

  currentNum = result;
  clickedOperator = undefined;
  previousNum = "";
}

equalsBtn.addEventListener("click", (e) => {
  if (!currentNum || currentNum === "") return;
  calculate();
  resultOutputEl.textContent = result.toFixed(2);
});

clearBtn.addEventListener("click", () => {
  if (currentNum === 0 || currentNum === "") return;
  currentNum = currentNum.slice(0, -1);
  resultOutputEl.textContent = currentNum;
});

allClearBtn.addEventListener("click", () => {
  resultOutputEl.textContent = 0;
  result = "";
  previousNum = "";
  currentNum = "";
  clickedOperator = undefined;
});
