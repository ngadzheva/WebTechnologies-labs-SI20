// Constructor function
function Person(name, age){
  this.name = name;
  this.age = age;

  this.info = function() {
    return this.name + ' ' + this.age;
  }
}

// Student will inherit Person
function Student(name, age, fn){
  // We can think about this like calling super(name, age) in other languages or when using ES6 classes
  // (we will talk about them later in the course). In this example Person has some specific logic happening
  // every time an object is constructed so we need to call the Person function with the current context otherwise
  // it won't be inheritance
  Person.call(this, name, age); // call the Person function with the newly created context (this)

  this.fn = fn;

  // This will be a "private constiable" due to the closures using it
  let mark;

  this.studentInfo = function() {
    // We use Person's method info() using this
    return this.info() + ' ' + this.fn;
  }

  // Method using "private constiables" can not be added to the prototype
  this.getMark = function() {
    return mark;
  }

  //  Method using "private constiables" can not be added to the prototype
  this.setMark = function(newMark) {
    mark = newMark;
  }
}

// We need to show the prototype connection between the objects that we will be creating
Student.prototype = Person.prototype;

// The function sayHi() will be in both Student's and Person's prototypes
// Every instance of Student and Person will have access to it
Student.prototype.sayHi = function() {
  return `Hello, ${this.name}`;
};

// We create instance of Student
const ivan = new Student('Ivan', 22, 61999);
console.log(ivan.studentInfo()); // Ivan 22 61999

// We don't have direct access to constiables in Student, which are not binded to it's context
//ivan.mark = 5; // Error
ivan.setMark(5);
console.log(ivan.getMark());

// The instance of Student has access to it's protorype's method sayHi
console.log(ivan.sayHi()); // Hello, Ivan

// We create instance of Person
const maria = new Person('Maria', 21);
// The instance of Person has access to Student's protorype's method sayHi
console.log(maria.sayHi()); // Hello, Maria


// Better way

// Constructor function
function Person(name, age){
  this.name = name;
  this.age = age;
}

// We add function info to Person's prototype
// This way with every new instance of Person won't be created new instance of info()
Person.prototype.info = function() {
  return this.name + ' ' + this.age;
}

Person.prototype.sayHi = function() {
  return 'Hello, ' + this.name;
}

function Student(name, age, fn){
  // Call the Person function with the newly created context (this)
  Person.call(this, name, age);
  this.fn = fn;
}

// We need to show the prototype connection between the objects that we will be creating
// It's important to use Object.create and not link prototypes directly!
// Otherwise when adding properties to the Student.prototype we will be messing up the Person's prototype too because
// they will be pointing to the same object!
Student.prototype = Object.create(Person.prototype);
// Student.prototype = Person.prototype;

Student.prototype.info = function() {
  return Person.prototype.info.call(this) + ' ' + this.fn;
}

// Create instance of Student
const ivan = new Student('Ivan', 22, 61999);
// Hiding the Person's prototype's method info()
// On calling a prototype's property from the instance of the constructor function,
// it's own properties are checked first. If the called property is found, it is executed.
// If it is not found, we continue searching to the prototype tree until it's found
console.log(ivan.info()); // Ivan 22 61999
console.log(ivan.sayHi()); // Hello, Ivan

// Create instance of Person
const maria = new Person('Maria', 21);
// The Person's prototype's method info() is called
console.log(maria.info()); // Maria 21

// Create instance of Student
const pesho = new Student('Pesho', 20, 61998);
// Predefine Student's prototype's method info()
pesho.info = function() {
  return this.fn;
}
console.log(pesho.info()); // 61998
console.log(ivan.info()); // Ivan 22 61999
