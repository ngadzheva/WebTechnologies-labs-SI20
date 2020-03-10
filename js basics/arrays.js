// Creating an array of Strings
var students = [ 'Ivan', 'Petkan', 'Maria' ];
console.log(students); // [ 'Ivan', 'Petkan', 'Maria' ]

// Delete the last element from the array
students.pop();
console.log(students); // [ 'Ivan', 'Petkan']

// Delete the first element from the array
students.shift();
console.log(students); // [ 'Petkan' ]

// Add an element to the array
students.push('Ivan');
students.push('Maria');
console.log(students); // [ 'Petkan', 'Ivan', 'Maria' ]

// Get some part of the array without changing the array
console.log(students.slice(0, 1)); // [ 'Petkan' ]
console.log(students); // [ 'Petkan', 'Ivan', 'Maria' ]

// Change some elements from the array -> This CHANGES the array
console.log(students.splice(1, 1, 'Dragan')); // [ 'Ivan' ]
console.log(students); // [ 'Petkan', 'Dragan', 'Maria' ]

// Add some elements on some position in the array -> This CHANGES the array
students.splice(2, 0, 'Ivan');
console.log(students); // [ 'Petkan', 'Dragan', 'Ivan', Maria' ]

// Remove some element from some index from the array -> This CHANGES the array
console.log(students.splice(2, 1)); // [ 'Ivan' ]
console.log(students); // [ 'Petkan', 'Dragan', Maria' ]

// Sort the elements of the array
console.log(students.sort()); // [ 'Dragan', 'Maria', 'Petkan' ]

// Create a new array with the results of calling a provided function on every element in the calling array
var SIStudents = students.map(function(student) {
    return student + ' studies Software Engineering';
});
console.log(SIStudents);

// Create a list of students
console.log(students.reduce(function (acc, curr) {
    return acc += curr + ' ';
}, ''));

// Get only students on odd positions
console.log(students.filter(function(student, index) {
    return index % 2 !== 0;
}));

// Loop through the array using forEach
students.forEach(function(student, index) {
    console.log(index + ': ' + student);
});