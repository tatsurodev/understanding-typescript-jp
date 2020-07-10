function add(n1: number, n2: number) {
  return n1 + n2;
}

// 関数の返り値、voidとundefinedの違い
// 返り値がvoidの時undefinedを返すが、returnは不要
function printResult(num: number): void {
  console.log('Result: ' + num);
}
// console.log(printResult(add(5, 12)));

// 返り値にundefinedを指定すると、returnが必須。通常、関数の返り値にundefinedは避けるべき
// function printResult(num: number): undefined {
//   console.log('Result: ' + num);
//   return;
// }

printResult(add(5, 12));