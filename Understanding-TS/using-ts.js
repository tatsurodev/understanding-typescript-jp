var button = document.querySelector('button');
// !はnon-null assertion operatorでnullでないことをcompilerに明示, asはtype assertionでtypeをcompilerに明示
var input1 = document.getElementById('num1');
var input2 = document.getElementById('num2');
function add(num1, num2) {
    return +num1 + +num2;
}
button.addEventListener('click', function () {
    // input.valueはstringと推定されるので型変換を行ってerror回避
    console.log(add(+input1.value, +input2.value));
});
