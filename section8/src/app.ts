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
  // classに追加されるdecoratorはconstructorを返すことができる。これによって定義時ではなく、instance化の時にdecoratorを実行できる
  // classに制約を加えるには{}で指定し、new keywordでconstructor関数であることを伝える
  return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
    // 元のclassのconstructorを継承できる
    return class extends originalConstructor {
      constructor(..._: any[]) {
        // 元のclassのconstructorを呼び出し
        super();
        // 追加のlogic
        console.log('テンプレートを表示');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
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

// accessor decorator, 引数はprototype or constructor, accessorName, descriptor(setter, getter等)
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor デコレータ');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// method decorator, 引数はprototype or constructor, methodName, descriptor(value, writable等)
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method デコレータ');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// parameter decorator, 引数はprototype, methodName, positionNumber
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter デコレータ');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
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

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// decoratorはclassをinstanceした時に実行されるのではなく、定義時に実行
const p1 = new Product('Book', 100);
const p2 = new Product('Book2', 200);

// mehtod decoratorで調整済みのdescriptorを返すことで、対象methodを修正できる
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // 元のmethodをdescriptor.valueで取得し格納
  const originalMethod = descriptor.value;
  // adjはadjustment, ここで新たなdescriptorを作成している
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // 元のmethodに正しいthisをbind
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = 'クリックしました！';
  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
// Autobind decoratorを使用しない時、p.showMessageのthisはbutton elementを指し示すこととなり、this.messageはundefinedになってしまうので、thisをAutobind descriptorで正しくbindする
button.addEventListener('click', p.showMessage);

interface ValidatorConfig {
  [prop: string]: {
    [validatableProp: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
  // target.constructor.nameでclassの名前にaccess、registeredValidators[target.constructor.name]でValidatorConfigのkeyとなるprop部をセット
  registeredValidators[target.constructor.name] = {
    // spread operatorで元からある設定に追加
    ...registeredValidators[target.constructor.name],
    // ValidatorConfigの[validatableProp: string]: string[]の部分
    [propertyName]: [
      ...(
        // registeredValidators[target.constructor.name][propertyName]がnullなら[]で初期化
        registeredValidators[target.constructor.name]?.[propertyName] ??
        []
      ),
      'required'
    ]
  }
}

function PositiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(
        registeredValidators[target.constructor.name]?.[propertyName] ??
        []
      ),
      'positive'
    ]
  }
}

function validate(obj: any) {
  // 右辺は、registeredValidators['Course']等になり、各validatorのconfigが取得できる
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  // for loopでobjValidatorConfigが空だった時値が返されないのでdefaultでtrueとする
  let isValid = true;
  // for inでobjectのkeyをloop
  for (const prop in objValidatorConfig) {
    console.log(prop);
    // for ofでiterableをloop
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          // logical operator
          // exp1 && exp2: exp1がfalseならexp1, trueならexp2
          // exp1 || exp2: exp1がtrueならexp1, falseならexp2
          // falseならisValidつまりfalseのまま, tureならvalidation結果のobj[prop]をboolean化して格納
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  @PositiveNumber
  @PositiveNumber
  title: string;
  @PositiveNumber
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

console.log('registeredValidators', registeredValidators);

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  // validationが通らなければalert
  if (!validate(createdCourse)) {
    alert('正しく入力して下さい！');
    return;
  }
  console.log(createdCourse);
});
