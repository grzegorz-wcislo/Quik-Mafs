const DIFFICULTY = 1000;

const randomEquation = () => {
  const num1 = Math.floor(Math.random()*DIFFICULTY) + 1;
  const num2 = Math.floor(Math.random()*DIFFICULTY) + 1;
  const question = `${num1} + ${num2}`;
  const operation = Math.floor(Math.random()*3);

  switch(operation) {
  case 0:
    return add(num1, num2);
  case 1:
    return subtract(num1, num2);
  default:
    return multiply(num1, num2);
  }
};

const add = (a, b) => ({
  question: `${a}+${b}`,
  result: a + b
});

const subtract = (a, b) => ({
  question: `${a}-${b}`,
  result: a - b
});

const multiply = (a, b) => ({
  question: `${a}*${b}`,
  result: a * b
});

export default randomEquation;
