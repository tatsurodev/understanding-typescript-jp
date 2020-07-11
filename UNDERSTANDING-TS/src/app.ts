class Department {
  name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }
  // thisの型を括弧内で与えることができる
  describe(this: Department) {
    console.log('Department: ' + this.name);
  }
  addEmployee(employee: string) {
    // validation系の処理も追加できるので、下記のaccounting.employees[2]='Anna';のように直接外部からaccessして変更できるような仕様は良くない。employeesをprivateにしてこのmethodを通じてのみ変更できるようにする
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('Accounting');
accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.employees[2] = 'Anna';
accounting.name = 'NEW NAME';

accounting.describe();
accounting.printEmployeeInformation();

/*
const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopyにname propertyがない時にaccountingCopy.describe()すると、describe methodでthisの型をDepartmentにしているのでerrorが出る
accountingCopy.describe();
*/
