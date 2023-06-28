const screenDisplay = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");



let calculation = [];
let accumulativeCalculation;



function calculate(button) {
  const value = button.textContent;

  if (value === 'CLEAR') {
    calculation = [];
    screenDisplay.textContent = "0";
  } else if (value === '=') {
    // Replace 'x' with '*' and '÷' with '/'
    accumulativeCalculation = accumulativeCalculation.replace(/x/g, '*').replace(/÷/g, '/');
    console.log(accumulativeCalculation);
    
    screenDisplay.textContent = eval(accumulativeCalculation);
    screenDisplay.textContent = formatDisplayNumber(result);
    calculation = [];
  } else if (value === '%') {
    if(calculation.length > 0) {
      // Getting the last operation
      const lastOperation = calculation.join('').split(/[\+\-\x\÷]/g).slice(-2)[0];
      // Getting the last number
      const lastNumber = calculation.join('').split(/[\+\-\x\÷]/g).slice(-1)[0];
      const percentageValue = eval(`${lastNumber}*${lastOperation}/100`);
      // Removing the digits related to the last number
      calculation = calculation.slice(0, calculation.length - lastNumber.length);
      calculation.push(percentageValue.toString());
      screenDisplay.textContent = calculation.join('');
    }
  } else if (value === '2√x') {
    if(calculation.length > 0) {
      const lastNumber = calculation.join('');
      const sqrtValue = Math.sqrt(parseFloat(lastNumber));
      calculation = [sqrtValue.toString()];
      screenDisplay.textContent = sqrtValue;
    }
  } else if (value === 'x2') {
    const lastNumber = parseFloat(calculation.join(''));
    const squaredValue = Math.pow(lastNumber, 2);
    calculation = [squaredValue.toString()];
    screenDisplay.textContent = squaredValue;
  }  else {
      calculation.push(value);
      accumulativeCalculation = calculation.join('');
      screenDisplay.textContent = accumulativeCalculation;
    
  }
}

function formatDisplayNumber(number) {
  const formattedNumber = Number.parseFloat(number).toLocaleString(undefined, { maximumFractionDigits: 10 });
  return formattedNumber.replace(/,/g, '');
}

buttons.forEach(button => 
  button.addEventListener('click', () => 
  calculate(button)
  ));



  
    
