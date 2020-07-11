class Department {
  // private readonly id: string;
  // name: string;
  private employees: string[] = [];

  // constructorの引数内でpublicを使用する場合は省略不可
  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }
  // thisの型を括弧内で与えることができる
  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }
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
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
  }
  addReport(text: string) {
    this.reports.push(text);
  }
  printReports() {
    console.log(this.reports);
  }
}

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

const accounting = new AccountingDepartment('d2', []);
accounting.addReport('Something');
accounting.printReports();