const button = document.querySelector('button')!;

function clickHandler(message: string) {
  console.log('Clicked! ' + message);
}

// a comment
// const buttonで、non - null assertion operatorを使用しない時は、ifでbuttonのnull checkを行うことでerror回避できる
if (button) {
  // callbackのclickHandlerに引数を持たせるにはbindを使う,第一引数がthisに当たるもの、第二以降の引数がcallbackの引数
  // callとapplyは関数を今すぐcallする、bindは関数の写像が返ってくるので後でcallできる。callとapplyの違いは第二引数がapplyは配列、callの第二引数以降は関数の引数
  button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}