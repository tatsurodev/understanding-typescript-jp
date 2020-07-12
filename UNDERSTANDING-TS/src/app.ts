// interfaceは具体的な実装を含まない、一方抽象classは具体的な実装と抽象的な実装の両方を含めることができる
interface Named {
  // readonlyで初期化の際一度だけ設定されることを担保できる
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

// type Person = {};

class Person implements Greetable {
  // readonlyは推論されるので不要
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

let user1: Greetable;
user1 = new Person('Max');
// Person classのnameはreadonlyを付けていないがGreetable interfaceの実装によって機能する
// user1.name = 'Manu';
user1.greet('Hello I am');
console.log(user1);
