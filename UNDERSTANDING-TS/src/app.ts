/*
const names: Array<string> = ['Max', 'Manuel'];
// names[0].split(' ');

// resolveされるdataの型をgenericsで指定
const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then(data => {
  // data.split(' ');
});
*/

// 返り値の型は、2つの引数の交差型であることは推論できているので、その引数に型T, Uを与えるとその2つの交差型T&Uが返り値として認識される
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// fail 返り値はobject&objectなので只のobjectとして認識されてしまう
// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB);
// }
// 返り値の推論が正しくできない時にtype castもできるが面倒
// const mergedObj = merge({ name: 'Max' }, { age: 30 }) as { name: string, age: number };
const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
// genericsの型を推論させるのではなく明示させることもできるが冗長なでの上の引数の方から返り値も推論させるのがbetter
// const mergedObj = merge<{ name: string; hobbies: string[] }, { age: number }>({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

// 引数elementがlength propertyを持つことを確約させるためにinterface Lengthyを作成
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = '値がありません';
  if (element.length > 0) {
    descriptionText = '値は' + element.length + '個です。';
  }
  return [element, descriptionText];
}
console.log(countAndDescribe(['Sports', 'Cooking']));

// keyofを使って存在しないobjectのpropertyにaccessできないように制約を加える
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');