function add(n1, n2, showResult, phrase) {
    // typescriptではなく、javascriptで型チェックを行う時はtypeof演算子を使用
    // typeofだとjavascriptの実行時にerrorに気づくことになるが、typescriptだと開発時にエラーを発見できる。また、typescriptが役に立つのは開発時のみ、実行時(runtime)にはcompileされたjavascriptが仕事を行うのでtypescriptは何もしない点に注意
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //   throw new Error('入力値が正しくありません');
    // }
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Result: ';
add(number1, number2, printResult, resultPhrase);
