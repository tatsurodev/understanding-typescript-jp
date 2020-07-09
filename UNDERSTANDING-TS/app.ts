// 型を明示
// const person: {
//   name: string;
//   age: number;
// } = {
//   name: 'yota',
//   age: 30,
// };

// 型推論
const person = {
  name: 'yota',
  age: 30,
  hobbies: ['Sports', 'Cooking']
};

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  // console.log(hobby.map());
}