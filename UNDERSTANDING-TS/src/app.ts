// type AddFn = (a: number, b: number) => number;
// 関数型のinterface, objectの型の中に無名methodがある感じ
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
}

// interfaceは具体的な実装を含まない、一方抽象classは具体的な実装と抽象的な実装の両方を含めることができる
interface Named {
  // readonlyで初期化の際一度だけ設定されることを担保できる
  readonly name?: string;
  outputNmae?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

// type Person = {};

class Person implements Greetable {
  // readonlyは推論されるので不要
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi!');
    }
  }
}

let user1: Greetable;
user1 = new Person();
// Person classのnameはreadonlyを付けていないがGreetable interfaceの実装によって機能する
// user1.name = 'Manu';
user1.greet('Hello I am');
console.log(user1);
