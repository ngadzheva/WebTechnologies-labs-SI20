// 1. Destructuring

// Objects destructuring
const ivan = {
  name: 'Ivan',
  age: 22,
  fn: 66299
};

// Get the properties of object ivan
const { name, age, fn } = ivan;
console.log(`${name} ${age} ${fn}`); // Ivan 22 66299

// Get only the name property of object ivan and give a default value for mark, if missing
const {
  name: newPropName,
  mark = 5 // default value, if property is missing;
} = ivan;
console.log(`${newPropName} ${mark}`); // Ivan 5

// Arrays destructuring
const numbers = [1, 2, 3];

// Get all the elements of the array
const [one, two, three] = numbers;
console.log(one + two + three); // 6

// Get only the last element of the array
const [, , last] = numbers;
console.log(last); // 3

// Swap the values of an array
let swapA = 1;
let swapB = 2;

let [swapC, swapD] = [swapA, swapB];
console.log(swapC, swapD); // 1 2

[swapB, swapA] = [swapA, swapB]; // Swap the values
console.log(swapA, swapB); // 2 1

// 2. Spread operator

// Spread arrays
const array = [1, 2, 3, 4];
console.log(array); // Array(4) [1, 2, 3, 4]
// Get the elements of the array
console.log(...array); // 1 2 3 4

function spread(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
}
// We can call the function with an array, using the spread operator
spread(...[1, 2, 3]); // 1 2 3

// Spread objects
const object1 = {
  a: 1,
  b: 2,
  c: 0
};

const object2 = {
  c: 3
};

// We can create new object with the properties of object1 and object2 using the spread operator
console.log({
...object1,
...object2
}); // Object {a: 1, b: 2, c: 3}

// We can delete object's properties, using spread opetator
// We can use also delete object1.a; --> Remove a property from object. This is slow operation => avoid it
const deleteObject = {
  toDeleteProp: 0,
  a: 1,
  b: 2,
  c: 3
}
const { toDeleteProp, ...others } = deleteObject; // Faster way to remove a prop
console.log(toDeleteProp); // 0
console.log(others); // Object {a: 1, b: 2, c: 3}

const complexObject = {
  prop1: {
      a1: 10,
      b1: 2,
  },
  prop2: {
      a2: 10,
      b2: 2
  },
  prop3: {
      prop: {
          a3: 10
      }
  }
}

// Get the A's
const {
  prop1: { a1 },
  prop2: { a2 },
  prop3: { prop: { a3 } }
} = complexObject;
console.log(a1, a2, a3); // 10 10 10
