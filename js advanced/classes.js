// ES6 Classes
// Classes are syntactic sugar! Underneath the inheritance is done exactly the same way we did it in the previous exercise!
// We can have ONLY ONE CONSTRUCTOR because underneath this is only a CONSTRUCTOR FUNCTION

class Person {
  constructor(name, age) {
      this.name = name;
      this.age = age;
  }

  info () {
      return `${this.name} ${this.age}`;
  }
}

// Create instance of class Person
const ivan = new Person('Ivan', 21);
console.log(ivan.info()); // Ivan 21

// Using extends keyword is syntactic sugar for Student.prototype = Object.create(Person.prototype);
class Student extends Person{
  constructor(name, age, fn) {
      // super is syntactic sugar for Person.call(this, name, age)
      super(name, age);

      this.fn = fn;

      // This is a 'private' property
      let _mark;

      // We use a closure to access the 'private' property mark
      // This is NOT A GETTER! getMark is a key, added to the current context (not to its prototype) that will hold a reference to a function!
      this.getMark = () => {
          return _mark;
      };

      // This is NOT A SETTER
      this.setMark = (newMark) => {
          _mark = newMark;
      };
  }

  studentInfo() {
      return `${super.info()} ${this.fn}`;
  }
}

// Create an instance of class Student
const maria = new Student('Maria', 22, 62999);
// Assign a value to the private property mark of the Student's instance maria
maria.setMark(6);
// Get the value of the private property mark of the Student's instance maria
console.log(maria.getMark()); // 6
console.log(maria.studentInfo()); // Maria 22 62999
