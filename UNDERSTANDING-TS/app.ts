let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

// ok: any->string, error: unknown->string
// userName = userInput;

// unknown型は何かをする時に型チェックが必要になるのでanyよりはいい選択肢
// ok: unknownのtypeがstring->string
if (typeof userInput === 'string') {
  userName = userInput;
}

// neverは何も返さない、voidと違いundefinedを返すことすらない。途中でscriptがcrash、もしくは無限ループする
function generateError(message: string, code: number): void {
  throw { message: message, errorCode: code };
  // while (true) { }
}

const result = generateError('エラーが発生しました', 500);
// 上で処理が終わるので下のconsole.logは実行されない
console.log(result);
