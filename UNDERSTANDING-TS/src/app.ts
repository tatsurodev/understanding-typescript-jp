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
