"use strict";
var Department = (function () {
    function Department(n) {
        this.employees = [];
        this.name = n;
    }
    Department.prototype.describe = function () {
        console.log('Department: ' + this.name);
    };
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.printEmployeeInformation = function () {
        console.log(this.employees.length);
        console.log(this.employees);
    };
    return Department;
}());
var accounting = new Department('Accounting');
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.name = 'NEW NAME';
accounting.describe();
accounting.printEmployeeInformation();
//# sourceMappingURL=app.js.map