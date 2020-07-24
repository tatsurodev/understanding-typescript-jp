// decoratorは定義時に実行される、classに対して使用するのでtargetとなるconstructorを第一引数に受け取る
function Logger(constructor: Function) {
  console.log('ログ出力中...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Max';
  constructor() {
    console.log('Personオブジェクトを作成中...');
  }
}

const pers = new Person();
console.log(pers);