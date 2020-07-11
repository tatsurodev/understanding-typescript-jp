// この未使用の変数はnoUnusedLocals: trueでもerrorとならない。この変数はglobalなのでtypescriptには他で使われているかどうか判断できないのでerrorとならない
let appId = 'abc';
const button = document.querySelector('button')!;

// noImplicitReturns: tureで、関数内で分岐があるときreturnし忘れがある場合errorが出る
function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  // 下記のreturnがないとnoImplicitReturnsでerror
  return
}

function clickHandler(message: string) {
  // この未使用のlocal変数は、noUnusedLocals: trueでerror
  // let userName = 'Max';
  console.log('Clicked! ' + message);
}

// a comment
// const buttonで、non - null assertion operatorを使用しない時は、ifでbuttonのnull checkを行うことでerror回避できる
if (button) {
  // callbackのclickHandlerに引数を持たせるにはbindを使う,第一引数がthisに当たるもの、第二以降の引数がcallbackの引数
  // callとapplyは関数を今すぐcallする、bindは関数の写像が返ってくるので後でcallできる。callとapplyの違いは第二引数がapplyは配列、callの第二引数以降は関数の引数
  button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}