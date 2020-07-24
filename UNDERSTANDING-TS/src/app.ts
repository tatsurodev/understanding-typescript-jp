// decorator factoryによりdecoratorをcustomizeする為に必要な引数を与えることができる
function Logger(logString: string) {
  // decoratorは定義時に実行される、classに対して使用するのでtargetとなるconstructorを第一引数に受け取る
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string) {
  // constructorを使用しない時は_
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  }
}

// decorator factoryを実行し、中の関数部であるdecoratorが返ってくる
@WithTemplate('<h1>Personオブジェクト</h1>', 'app')
class Person {
  name = 'Max';
  constructor() {
    console.log('Personオブジェクトを作成中...');
  }
}

const pers = new Person();
console.log(pers);