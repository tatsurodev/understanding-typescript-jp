"use strict";
const userName = 'Max';
let age = 30;
age = 29;
const add = (a, b) => a + b;
const printOutput = output => {
    console.log(output);
};
printOutput(add(2, 5));
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', event => {
        console.log(event);
    });
}
//# sourceMappingURL=app.js.map