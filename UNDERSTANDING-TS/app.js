var userInput;
var userName;
userInput = 5;
userInput = 'Max';
// ok: any->string, error: unknown->string
// userName = userInput;
// unknown型は何かをする時に型チェックが必要になるのでanyよりはいい選択肢
// ok: unknownのtypeがstring->string
if (typeof userInput === 'string') {
    userName = userInput;
}
