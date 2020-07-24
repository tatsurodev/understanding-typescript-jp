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

// instance propertyに対して使用される場合、2つの引数は、prototype、propertyName
// static propertyに対して使用される場合、2つの引数は、constructor関数、propertyName
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property デコレータ');
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;

  set price(val: number) {
    if (this._price > 0) {
      this._price = val;
    } else {
      throw new Error('不正な価格です - 0以下は設定できません');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
