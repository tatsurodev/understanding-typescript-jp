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

const accounting = new Department('d1', 'Accounting');
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
