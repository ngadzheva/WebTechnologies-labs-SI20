const fs = require('fs');

function changeFn(fn) {
    return fn.replace(/00/g, '12');
}

let result;

fs.readFile('students.txt', 'utf-8', (error, data) => {
    if(error) {
        console.error('Failed reading file ' + error);
        return;
    }

    result = changeFn(data.toString());

    fs.writeFile('editedStudents.txt', result, (error) => {
        if(error) {
            console.error('Failed writing file ' + error);
            return;
        }

        fs.readFile('editedStudents.txt', (error, data) => {

        });
    });
});


console.log('DONE');

function read(file, callbackError, callbackSuccess) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            }

            resolve(data);
        });
    });
}

function write(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (error) => {
            if(error) {
                reject(error);
            }

            resolve();
        });
    });
}

Promise.all
read('students.txt')
    .then(result => changeFn(result.toString()))
    .then(editedResult => write('promisedStudents.txt', editedResult))
    .then(() => console.log('DONE'))
    .catch(error => console.error(error));
