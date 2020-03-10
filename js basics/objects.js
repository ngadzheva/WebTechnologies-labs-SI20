// Create an object
var student = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    age: 21,
    facultyNumber: 66666   
};

console.log(student); // Object {firstName: "Ivan", lastName: "Ivanov", age: 21, facultyNumber: 66666}

console.log(student.firstName); // Ivan
console.log(student['lastName']); // Ivanov

// for in loop
var studentInfo = '';
for(var key in student) {
    studentInfo += student[key] + ' ';
}
console.log(studentInfo); // Ivan Ivanov 21 66666

// forEach loop through object keys
studentInfo = '';
Object.keys(student).forEach(function(key) {
    studentInfo += student[key] + ' ';
});
console.log(studentInfo); // Ivan Ivanov 21 66666

// forEach loop through object values
studentInfo = '';
Object.values(student).forEach(function(value) {
    studentInfo += value + ' ';
});
console.log(studentInfo); // Ivan Ivanov 21 66666

// forEach loop through object entries
studentInfo = '';
Object.entries(student).forEach(function([ key, value ]) {
    studentInfo += key + ': ' + value + ' ';
});
console.log(studentInfo); // firstName: Ivan lastName: Ivanov age: 21 facultyNumber: 66666

// More complex objects 
var students = {
    student1: {
        firstName: 'Petkan',
        lastName: 'Petkanov',
        age: 23,
        facultyNumber: 66999
    }, 
    student2: {
        firstName: 'Dragan',
        lastName: 'Draganov',
        age: 21,
        facultyNumber: 66998
    }
};

// JSON
var jsonStudent = `{
    "firstName": "Maria",
    "lastName": "Georigieva",
    "age": 20,
    "faultyNumber": 67000
}`;
console.log(jsonStudent);

// Convert JSON to object
var jsonToObject = JSON.parse(jsonStudent);
console.log(jsonToObject); // Object {firstName: "Maria", lastName: "Georigieva", age: 20, faultyNumber: 67000}

// Convert object to JSON 
var objectToJson = JSON.stringify(student);
console.log(objectToJson); // {"firstName":"Ivan","lastName":"Ivanov","age":21,"facultyNumber":66666}