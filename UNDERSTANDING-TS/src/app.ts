/*
const userName = 'Max';
// userName = 'Maximilian';
let age = 30;
age = 29;
*/

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
const add = (a: number, b: number = 1) => a + b;

// allow functionの引数が1つの時、丸括弧は省略できるが引数の型を指定できなくなるので、関数を格納する変数に関数型を指定する
const printOutput: (output: string | number) => void = output => {
  console.log(output);
}
printOutput(add(2));
*/

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

// spread operator
// 配列での使用
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking', ...hobbies];
// 配列は参照型なので、配列が定数でも要素を追加できる
// activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies);
// objectでの使用
const person = {
  firstName: 'Max',
  age: 30,
}
// 参照ではなく実際のcopyを作成したい時
const copiedPerson = {
  ...person,
};

// rest parameter
const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};
// rest parameterをtupleにして引数の長さを制限
// const add = (...numbers: [number, number, number]) => { }

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

// destructuring, 分割代入
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2)

// nameはdom librayの予約語なのでkeyにnameを使用するのは避けたほうがbetter
// 代入先の変数名を変更できる、:以下はtypescriptの型ではなくjavascriptの分割代入のsyntax
const { firstName: userName, age } = person;
console.log(userName, age, person);
