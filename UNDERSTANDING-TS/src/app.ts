// decorator factoryによりdecoratorをcustomizeする為に必要な引数を与えることができる
function Logger(logString: string) {
  // decoratorは定義時に実行される、classに対して使用するのでtargetとなるconstructorを第一引数に受け取る
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

// decorator factoryを実行し、中の関数部であるdecoratorが返ってくる
@Logger('ログ出力中 - PERSON')
class Person {
  name = 'Max';
  constructor() {
    console.log('Personオブジェクトを作成中...');
  }
}

const pers = new Person();
console.log(pers);