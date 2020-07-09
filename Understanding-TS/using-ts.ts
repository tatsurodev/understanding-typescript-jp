const button = document.querySelector('button');
// !はnon-null assertion operatorでnullでないことをcompilerに明示, asはtype assertionでtypeをcompilerに明示
const input1 = document.getElementById('num1')! as HTMLInputElement;
const input2 = document.getElementById('num2')! as HTMLInputElement;

function add(num1: number, num2: number) {
  return +num1 + +num2;
}

button.addEventListener('click', function () {
  // input.valueはstringと推定されるので型変換を行ってerror回避
  console.log(add(+input1.value, +input2.value));
});
