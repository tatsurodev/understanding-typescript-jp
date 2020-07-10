function add(n1: number, n2: number) {
  return n1 + n2;
}

// 関数の返り値、voidとundefinedの違い
// 返り値がvoidの時undefinedを返すが、returnは不要
function printResult(num: number): void {
  console.log('Result: ' + num);
}
// console.log(printResult(add(5, 12)));

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
  // 返り値にvoidが指定されている時でもreturnしてもerrorは発生しない
  return result;
})

// 返り値にundefinedを指定すると、returnが必須。通常、関数の返り値にundefinedは避けるべき
// function printResult(num: number): undefined {
//   console.log('Result: ' + num);
//   return;
// }

// functionを代入する変数にfunction型を与え、代入できる関数を制限する
let combineValues: (a: number, b: number) => number;
combineValues = add;
// combineValues = 5;
// combineValues = printResult;
console.log(combineValues(8, 8));

printResult(add(5, 12));