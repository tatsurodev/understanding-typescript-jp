class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  // thisの型を括弧内で与えることができる
  describe(this: Department) {
    console.log('Department: ' + this.name);
  }
}

const accounting = new Department('Accounting');
accounting.describe();

const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopyにname propertyがない時にaccountingCopy.describe()すると、describe methodでthisの型をDepartmentにしているのでerrorが出る
accountingCopy.describe();