function add(n1, n2, showResult, phrase) {
    // typescriptではなく、javascriptで型チェックを行う時はtypeof演算子を使用
    // typeofだとjavascriptの実行時にerrorに気づくことになるが、typescriptだと開発時にエラーを発見できる。また、typescriptが役に立つのは開発時のみ、実行時(runtime)にはcompileされたjavascriptが仕事を行うのでtypescriptは何もしない点に注意
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //   throw new Error('入力値が正しくありません');
    // }
    // type inference, 型推論
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
// 明示的に型を指定すると冗長になるので省略して型推論を使用するほうがよい
// let number1: number = 5;
// 変数を初期化しない場合はany型となるので、明示的に型を指定するほうがbetter
var number1;
number1 = 5;
var number2 = 2.8;
var printResult = true;
// 型推論でstring型となる
var resultPhrase = 'Result: ';
// resultPhrase = 0;
add(number1, number2, printResult, resultPhrase);
