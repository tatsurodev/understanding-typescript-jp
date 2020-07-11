const userName = 'Max';
// userName = 'Maximilian';
let age = 30;
age = 29;

// var ,let共に関数外からはaccess不可
/*
function add(a: number, b: number) {
  // var result;
  let result;
  result = a + b;
  return result;
}
// error
// console.log(result);
*/

// arrow function
/*
const add = (a: number, b: number) => {
  return a + b;
}
*/
const add = (a: number, b: number) => a + b;

// allow functionの引数が1つの時、丸括弧は省略できるが引数の型を指定できなくなるので、関数を格納する変数に関数型を指定する
const printOutput: (output: string | number) => void = output => {
  console.log(output);
}
printOutput(add(2, 5));

const button = document.querySelector('button');
if (button) {
  button.addEventListener('click', event => {
    console.log(event);
  });
}

// var vs let
// varはglobal scope or 関数scope
/*
if (age >= 20) {
  // isAdultはglobal変数になる
  var isAdult = true;
}
console.log(isAdult);
*/

// letはblock scope({}内のみ、もしくは{}内の下層の{}からのみaccess可能)
/*
if (age >= 20) {
  // isAdultはblock内のみaccess可
  let isAdult = true;
}
// error
console.log(isAdult);
*/