// 型を明示
// const person: {
//   name: string;
//   age: number;
// } = {
//   name: 'yota',
//   age: 30,
// };

// 型推論
// roleの型をtupleにしたい時、role: [2, 'author'];だとtupleと推論されないのでobject全体のpropertyの型を明示させる必要あり
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: 'yota',
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author'],
// };

// ok
// tupleは、値をpushで追加できてしまうので注意。下記はerrorが発生しない
// person.role.push('admin');

// error
// role: [number, string];と型を指定しているのでerror
// person.role[1] = 10;
// 空の配列の代入はerror
// person.role = [];
// 3つ目の要素があるのでerror
// person.role = [0, 'admin', 'user'];

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

// enumで人間が理解しやすい定数に数値を割り当てられる。文字列も可
enum Role {
  ADMIN = 'ADMIN',
  READ_ONLY = 100,
  AUTHOR = 200,
}

const person = {
  name: 'yota',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN,
};

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  // console.log(hobby.map());
}

if (person.role === Role.ADMIN) {
  console.log('管理者ユーザ');
}