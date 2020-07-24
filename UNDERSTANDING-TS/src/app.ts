// decorator factoryによりdecoratorをcustomizeする為に必要な引数を与えることができる
function Logger(logString: string) {
  console.log('LOGGER ファクトリ');
  // decoratorは定義時に実行される、classに対して使用するのでtargetとなるconstructorを第一引数に受け取る
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE ファクトリ');
  // constructorを使用しない時は_
  return function (constructor: any) {
    console.log('テンプレートを表示');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  }
}

// decorator factoryを実行し、中の関数部であるdecoratorが返ってくる
// decorator関数を返すdecorator factoryは普通に上からした、decorator関数自体は下から上へ実行される
@Logger('ログ出力中')
@WithTemplate('<h1>Personオブジェクト</h1>', 'app')
class Person {
  name = 'Max';
  constructor() {
    console.log('Personオブジェクトを作成中...');
  }
}

const pers = new Person();
console.log(pers);