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

// generics class
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    // indexOfで要素が見つからない時
    if (this.data.indexOf(item) === -1) {
      return;
    }
    // indexOfで要素が見つからない時、-1が返ってくるので-1の時最後の要素が削除されてしまう
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Data1');
textStorage.addItem('Data2');
textStorage.removeItem('Data1');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// object型の場合、objectを変数に格納しないと正しく機能しないのでgenerics classに制約を加えobjectが入り込まないようにする
// const objStorage = new DataStorage<object>();
// const obj = { name: 'Max' }
// objStorage.addItem(obj);
// objStorage.addItem({ name: 'Manu' });
// // ...
// objStorage.removeItem(obj);
// console.log(objStorage.getItems());

// generics utility
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  // propertyをoptionalにした型を返す
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;
  // Partial<CourseGoal>ではなく必要なpropertyが全て追加されているのでCourseGoal型にcastしておｋ
  return courseGoal as CourseGoal;
}

// 要素の追加できないようにReadonlyを付与するutilityを使用する
const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu');
// names.pop();
