let currentInput = "0";
let previousInput = "0";
let history = "0";

let currentOperator = "";
let loadedOperator = false;
let evaluated = false;
let equals = false;

let divisionByZero = "Can't Divide by Zero";

function addListeners() {

    //Utility Button Event Listeners
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function (e) {
        clear();
    });

    const backspaceButton = document.getElementById("backspace");
    backspaceButton.addEventListener("click", function (e) {
        backspace();
    });

    //Number Button Event Listeners
    const oneButton = document.getElementById("one");
    oneButton.addEventListener("click", function (e) {
        inputNumber(1);
    });

    const twoButton = document.getElementById("two");
    twoButton.addEventListener("click", function (e) {
        inputNumber(2);
    });

    const threeButton = document.getElementById("three");
    threeButton.addEventListener("click", function (e) {
        inputNumber(3);
    });

    const fourButton = document.getElementById("four");
    fourButton.addEventListener("click", function (e) {
        inputNumber(4);
    });

    const fiveButton = document.getElementById("five");
    fiveButton.addEventListener("click", function (e) {
        inputNumber(5);
    });

    const sixButton = document.getElementById("six");
    sixButton.addEventListener("click", function (e) {
        inputNumber(6);
    });

    const sevenButton = document.getElementById("seven");
    sevenButton.addEventListener("click", function (e) {
        inputNumber(7);
    });

    const eightButton = document.getElementById("eight");
    eightButton.addEventListener("click", function (e) {
        inputNumber(8);
    });

    const nineButton = document.getElementById("nine");
    nineButton.addEventListener("click", function (e) {
        inputNumber(9);
    });

    const zeroButton = document.getElementById("zero");
    zeroButton.addEventListener("click", function (e) {
        inputNumber(0);
    });

    //Operator Button Event Listeners

    const divideButton = document.getElementById("divide");
    divideButton.addEventListener("click", function (e) {
        operate("/");
    });

    const multiplyButton = document.getElementById("multiply");
    multiplyButton.addEventListener("click", function (e) {
        operate("*");
    });

    const plusButton = document.getElementById("plus");
    plusButton.addEventListener("click", function (e) {
        operate("+");
    });

    const minusButton = document.getElementById("minus");
    minusButton.addEventListener("click", function (e) {
        operate("-");
    });

    const equalsButton = document.getElementById("equals");
    equalsButton.addEventListener("click", function (e) {
        operate("=");
    });

    //Keyboard Event Listeners
    const keyListener = document.getElementById("content");
    keyListener.addEventListener("keypress", function (e) {
        let key = e.key;

        if (key === "1") inputNumber(1);
        else if (key === "2") inputNumber(2);
        else if (key === "3") inputNumber(3);
        else if (key === "4") inputNumber(4);
        else if (key === "5") inputNumber(5);
        else if (key === "6") inputNumber(6);
        else if (key === "7") inputNumber(7);
        else if (key === "8") inputNumber(8);
        else if (key === "9") inputNumber(9);
        else if (key === "0") inputNumber(0);

        else if (key === "+") operate("+");
        else if (key === "-") operate("-");
        else if (key === "/") operate("/");
        else if (key === "*") operate("*");

        else if (key === "Enter") operate("=");
        else if (key === "=") operate("=");

    });

    const keyListener2 = document.getElementById("content");
    keyListener2.addEventListener("keydown", function (e) {
        let key = e.key;

        if (key === "Backspace") backspace();

        else if (key === "Escape") clear();

    });

}

function operate(operator) {

    //First operator of the current query has been entered
    if (!loadedOperator) {
        if (operator != "=") {
            loadedOperator = true;
        }

        previousInput = currentInput;
        currentOperator = operator;
        history = currentInput + " " + operator + " ";
        evaluated = true;
    }


    //Subsequent operators are being added to the query
    else {

        //If an operator is placed without another number between,
        //Just change the operator
        if (evaluated && operator != "=") {
            history = history.substr(0, history.length - 2) + operator + " ";
        }

        else {
            history += currentInput + " " + operator + " ";

            switch (currentOperator) {
                case "/":
                    currentInput = (parseFloat(previousInput) / parseFloat(currentInput)).toString();
                    break;

                case "*":
                    currentInput = (parseFloat(previousInput) * parseFloat(currentInput)).toString();
                    break;

                case "+":
                    currentInput = (parseFloat(previousInput) + parseFloat(currentInput)).toString();
                    break;

                case "-":
                    currentInput = (parseFloat(previousInput) - parseFloat(currentInput)).toString();
                    break;

                case "=":
                    break;
            }
        }
        if (operator === "=") { loadedOperator = false; }
        currentOperator = operator;

        if (currentInput === "Infinity" || currentInput === "NaN") {
            history = divisionByZero;
            currentInput = "0";
        }

        previousInput = currentInput;

        evaluated = true;
    }
    updateInput();
    updateHistory();
}

function inputNumber(number) {

    if (currentInput === "0") currentInput = number.toString();

    else if (evaluated) {
        currentInput = number.toString();
        evaluated = false;
    }

    else if (exceedsInputLength()) return;

    else { currentInput += number.toString(); }

    updateInput();
}

function exceedsInputLength() {
    if (currentInput.length >= 20) return true;
    return false;
}

function clear() {
    currentInput = "0";
    previousInput = "0";
    history = "0";

    update();
}

function backspace() {
    if (evaluated) {
        history = "0";
        update();
        currentInput = 0;
        return;
    }

    else if (currentInput.length === 1) { currentInput = "0"; }

    else {
        currentInput = currentInput.substr(0, currentInput.length - 1);
    }
    update();

}

function update() {
    loadedOperator = false;
    currentOperator = "";

    updateInput();
    updateHistory();
}

function updateInput() {
    document.getElementById("current").innerHTML = currentInput;
}

function updateHistory() {
    document.getElementById("history").innerHTML = history;
}

function bootUp() {
    addListeners();
}

bootUp();