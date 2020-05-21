// ES6
// 1. var, let, const

// We can use var variables before we declare them for the first time
// But we can't use let or const variables before that
console.log(a); // undefined
// console.log(b); // This will throw an error 'b is not defined'

var a = 5;
let b = 5;
const c = 5;

// c = 6; // this will throw an error

const constObject = {
  prop: 5
};
// Although this is a const object, we still can change the values of it's properties
// This is OK, because we aren't changing the reference
constObject.prop = 6;
console.log(constObject); // Object {prop: 6}

// We can't assign another object to the const object variable nor add new properties to it
// constObject = { <-- This will throw an error
//     newProp: 6
// };
// constObject.newProp = '7'; // This will throw an error

// The same thing stands for the arrays
// Although we have e const array, we still can add or delete elements
// This is OK, because we aren't changing the reference
const constArray = [1];
constArray.push(5);
constArray.pop();
constArray[0] = 2;
console.log(constArray); // [2]

// We only can't assign another array to the const array variable
// constArray = [2, 3, 4]; // This will throw an error

// 2. Frozen objects
// Its properties can't be changed
const frozenObject = Object.freeze({
  prop: 1,
  complexProp: {
    prop: 1
  },
  arr: [1, 0, 3]
});

// When we have a frozen objec't, we can't change its property's values, if 'use strict' is enabled
// frozenObject.prop = 2; // This will throw an error, if 'use strict' is enabled

// But if we have more complex structure, we still can change the values of the deeply nested properties
frozenObject.complexProp.prop = 2; // This still works though! No deep-freeze
console.log(frozenObject.complexProp); // Object {prop: 2}

// 3. Block Scopes
// var - function scope
// let, const - block scope

function scope(variable) {
  if(variable === 'var'){
    var varScope = variable;
  }

  console.log(varScope);

  if(variable === 'let') {
    let letScope = variable;
  }

  // We don't have access to let variable here
  //console.log(letScope);

  if(variable === 'const') {
    const constScope = variable;
  }

  // We don't have access to const variable here neither we can change it
  //console.log(constScope);
}

// This will output 5 5 5 5 5
for(var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

// This will output 0 1 2 3 4
for(let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
