abstract class Department {
  static fiscalYear = 2020;
  // private readonly id: string;
  // name: string;
  protected employees: string[] = [];

  static createEmployee(name: string) {
    // static methodからなのでstatic memberにaccessおｋ
    console.log('createEmployee', this.fiscalYear);
    return { name: name };
  }

  // constructorの引数内でpublicを使用する場合は省略不可
  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
    // staticでない場所、つまりstaticでないmethodやpropertyからstatic memberにはaccessできない。thisはclassではなくinstanceを指し示すものなのでerrorとなる
    // console.log(this.fiscalYear);
    console.log(Department.fiscalYear);
  }
  // thisの型を括弧内で与えることができる
  abstract describe(this: Department): void;
  addEmployee(employee: string) {
    // validation系の処理も追加できるので、下記のaccounting.employees[2]='Anna';のように直接外部からaccessして変更できるような仕様は良くない。employeesをprivateにしてこのmethodを通じてのみ変更できるようにする
    // this.id = 'd2';
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    // superを呼び出す前にthisは使用できないでの注意
    this.admins = admins;
  }
  describe() {
    console.log('IT部門 - ID: ' + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  // staticでないとinitializeする必要が出てくるのでclass固有のstatic instanceで外部からaccess不可のprivateとする
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('レポートが見つかりません。');
  }
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('正しい値を設定して下さい。');
    }
    this.addReport(value)
  }
  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }
  static getInstance() {
    // static method内からのaccessなのでこのthisはclass自体を指し示す
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }
  describe() {
    console.log('会計部門 - ID: ' + this.id);
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['Max']);
it.addEmployee('Max');
it.addEmployee('Manu');

// it.employees[2] = 'Anna';
// it.name = 'NEW NAME';

it.describe();
it.printEmployeeInformation();
console.log(it);
/*
const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopyにname propertyがない時にaccountingCopy.describe()すると、describe methodでthisの型をDepartmentにしているのでerrorが出る
accountingCopy.describe();
*/

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
// AccountingDepartmentはsingletonなのでaccountingとaccounting2は同一instance
console.log('accounting === accounting2 is ', accounting === accounting2);
accounting.mostRecentReport = '通期会計レポート';
accounting.addReport('Something');
console.log(accounting.mostRecentReport);
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();