const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecundValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener('click' , function(e) {
    const element = e.target;
    const value = element.value;
    if(!element.matches('button')) return;

    switch(element.value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);
    }
    updateDisplay();
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && waitingForSecundValue){
        operator = nextOperator;
        return;
    }

    if(firstValue === null){
        firstValue = value;
    }else if(operator){
        const result = calculate(firstValue,value,operator);

        displayValue = `${parseFloat(result.toFixed())}`;
        firstValue = result;
    }

    waitingForSecundValue =true;
    operator = nextOperator;

    console.log(displayValue, firstValue,operator,waitingForSecundValue);
}

function calculate(first,secund,operator){
    if(operator === '+'){
        return first + secund;
    }else if(operator === '-'){
        return first - secund;
    }else if(operator === '*'){
        return first * secund;
    }else if(operator === '/'){
        return first / secund;
    }
    return secund;
}


function inputNumber(num){
    if(waitingForSecundValue){
        displayValue = num;
        waitingForSecundValue = false;
    }else{
        displayValue = displayValue === '0' ? num: displayValue + num;
    }
    console.log(displayValue, firstValue,operator,waitingForSecundValue);
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += '.';
    } 
}

function clear(){
    displayValue = '0';
}