// name is in the global scope
name = "Super Global";
const pesho = {age: 22, name: "Pesho"};
const gosho = {age: 21, name: "Gosho"};
const ivan = {age: 23, name: "Ivan"};

// sayHi is a function
const sayHi = function (a, b, c) {
  return "Hi, I am " + this.name;
};

// We call sayHi() without binding context, so the context of this will be the global scope
console.log(sayHi());                  // Hi, I am Super Global

// We add new property to the object pesho, which value is the function sayHi()
pesho.sayHi = sayHi;
// We call the object's pesho property sayHi, so the context of this will be the object's pesho scope
console.log(pesho.sayHi());            // Hi, I am Pesho

// We use call() to call the function sayHi(), binding object's gosho context to it
console.log(sayHi.call(gosho));        // Hi, I am Gosho (arguments are passed after the new context seperated by commas)
// We use call() to call the object's pesho property sayHi, binding object's gosho context to it
console.log(pesho.sayHi.call(gosho));  // the same

// We use apply() to call the function sayHi(), binding object's ivan context to it
console.log(sayHi.apply(ivan));        // Hi, I am Ivan (arguments are passed after the new context as an array)

// Here this will be in student object's context
const student = {
  name: 'Student',
  fn: '62886',
  info: function() {
    return this.name + ' ' + this.fn;
  }
};
console.log(student.info()); // Student 62886

// Here this will be in global context
const studentInfo = student.info;
console.log(studentInfo()); // Super Global undefined

// We use bind() to call student object's method info with it's own context
const bindedStudentInfo = student.info.bind(student);
console.log(bindedStudentInfo()); // Student 62886

// Switching context
const sayHiStudent = pesho.sayHi.bind(student);
console.log(sayHiStudent()); //Hi, I am Student

// The arrow function preserves its context
const greeting = () => `Hello, ${this.name}`;
ivan.greeting = greeting;
console.log(ivan.greeting()); // Hello, undefined
