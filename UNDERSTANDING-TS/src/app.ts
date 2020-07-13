// object型(interface, type alias)の交差: それぞれのobjectが結合されたもの
// type aliasで交差型
type Admin = {
  name: string;
  privileges: string[];
}

type Employee = {
  name: string;
  startDate: Date;
}

// 交差型、2つの型を結合
type ElevatedEmployee = Admin & Employee;

// interfaceで交差型
/*
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

interface ElevatedEmployee extends Admin, Employee { }
*/

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
}

// union型の交差: 共通の部分
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

// type guard
function add(a: Combinable, b: Combinable) {
  // typeof演算子でtype guard
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(emp.name);
  // typeof empとしてもobjectとしかならないのでtype guardにならない。in演算子でobjectの中にあるpropertyがあるかどうかでtype guardを行う
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }

  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInformation({ name: 'Manu', startDate: new Date() });

class Car {
  drive() {
    console.log('運転中...');
  }
}

class Truck {
  drive() {
    console.log('トラックを運転中...');
  }
  loadCargo(amount: number) {
    console.log('荷物を載せています...' + amount);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // classの場合、instanceofをtype guardに使用できる。interfaceで実装したobjectはinterface自体がjavascriptにcompileされないためinstanceofをtype guardに使用できない
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// descriminated unions, 判別可能なunion型。共通のpropertyの値によって場合分ける
interface Bird {
  // 共通のpropertyをセットする
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('移動速度: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// 前からtype cast, reactのjsxと衝突する可能性あり
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// 後ろからtype cast
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = 'こんにちは';
// non-null assertion operatorを使用しないversion
/*
const userInputElement = document.getElementById('user-input');
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'こんにちは';
}
*/
