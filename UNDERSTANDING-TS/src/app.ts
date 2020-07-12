// interfaceは具体的な実装を含まない、一方抽象classは具体的な実装と抽象的な実装の両方を含めることができる
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

// type Person = {};

class Person implements Greetable {
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
user1.greet('Hello I am');
console.log(user1);
