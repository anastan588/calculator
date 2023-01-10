class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
if (this.operation === '+/-') {
  this.operation = "";
} else {
  this.operation = operation;
}
   this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  
  compute() {
    let computation;
    let currentComputation;
    const prev = parseFloat(Number(this.previousOperand));
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) /*|| isNaN(current)*/) return;
     switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
          computation = prev / current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "^":
        computation = prev ** current;
        break;
      case "√":
          computation = prev ** (1 / 2);
        break;
      case '+/-':
          computation = prev * -1;
          currentComputation = current * -1;
          break;
      default:
        return;
    }
    if (this.operation === '+/-') {
    this.previousOperand = computation;
    this.currentOperand = currentComputation;
    }

    if (this.operation === "√" && prev < 0) { return this.currentOperand = "Error"};
    if (this.operation === "/" && current === 0) { return this.currentOperand = "Error"};
    if (computation.toString().length>10) {
      console.log(computation.toString().length);
      this.currentOperand = parseFloat(computation.toFixed(10));
    } else {
      this.currentOperand = computation;
    }
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    let integerDisplay;
    if (typeof number === 'string') {
      return integerDisplay = number;
    }
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0}).replace(/[\s,%]/g, '');
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
  

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText  = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals");
const deleteButton = document.querySelector("[data-delete");
const allClearButton = document.querySelector("[data-all-clear");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const negativeNumber = document.querySelector("[data-negative");
const sqrtButton = document.querySelector("[data-sqrt");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});


equalsButton.addEventListener("click", (buttom) => {
  calculator.compute();
  calculator.updateDisplay();
});

negativeNumber.addEventListener("click", (buttom) => {
  calculator.compute();
  calculator.updateDisplay();
});

sqrtButton.addEventListener("click", (buttom) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (buttom) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (buttom) => {
  calculator.delete();
  calculator.updateDisplay();
});
