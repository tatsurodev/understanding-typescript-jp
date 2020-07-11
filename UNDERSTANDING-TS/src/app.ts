const userName = 'Max';
// userName = 'Maximilian';
let age = 30;
age = 29;

// var ,let共に関数外からはaccess不可
function add(a: number, b: number) {
  // var result;
  let result;
  result = a + b;
  return result;
}
// error
// console.log(result);

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