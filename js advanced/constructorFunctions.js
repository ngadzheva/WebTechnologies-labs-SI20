// Constructor function
function Student(name, fn, age) {
  this.name = name;
  this.fn = fn;
  this.age = age;

  // On every new created object will be created a new function
  this.info = function() {
      console.log(this.fn + ': ' + this.name + ' ' + this.age());
  };
}

function Age(age) {
  this.age = age;

  this.getAge = function() {
      return this.age;
  };
}

// We create new object using the constructor function Age and the key word new
const age = new Age(22);

// We create new object using the constructor function Student and the key word new
// The third parameter is the age object's method getAge()
// We preserve the context of the object age, using bind()
const ivan = new Student('Ivan', '62999', age.getAge.bind(age));
// The context of this is the context of the object ivan
ivan.info(); // 62999: Ivan 22

// This way we don't create an object
// The context of pesho will be the context of the global scope
const pesho = Student('Pesho', '62998', age.getAge.bind(age));
// This way we can call the Student's method info
// And the context of this will be the context of the global scope
info(); // 62998: Pesho 22

// We add property to the prototype of the Student
// This way on every new created object won't be created a new function
// All instances of Student will have access to this property
Student.prototype.getName = function() {
  return this.name;
}

console.log(ivan.getName()); // Ivan

const student = new Student("Student","62111", age.getAge.bind(age));
student.getName();
