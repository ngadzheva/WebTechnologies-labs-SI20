(function() {
    // Get first header element content
    var header = document.getElementsByTagName('header')[0];

    // Get the content of the element with id 'first-name'
    var firstName = document.getElementById('first-name');
    console.log(firstName);

    // Get the content of the first element with class name 'student'
    var studentInfo = document.getElementsByClassName('student')[0];
    console.log(studentInfo);

    // Get the content of the element with id 'header-row' using CSS selector
    var headerRow = document.querySelector('#header-row');

    // Get the content of all the elements with class 'student' using CSS selector
    var student = document.querySelectorAll('.student');

    // Append the text content of the header element
    header.innerHTML += ' Marks';

    // Create new elements and add them to the DOM
    var th = document.createElement('th');
    var text = document.createTextNode('Mark');
    th.append(text);
    headerRow.append(th);

    var td = document.createElement('td');
    td.innerHTML += '6';
    td.setAttribute('id', 'mark');
    var deleteButton = document.getElementById('delete');
    // Insert element before other element
    deleteButton.before(td);

    // Add event listeners on the buttons
    var button = document.querySelector('[name="add"]');
    button.addEventListener('click', addStudent);

    document.getElementsByTagName('button')[0].addEventListener('click', deleteStudent);
}());

// Add new student to the table
function addStudent(event) {
    // Prevent the default behaviour of the form
    // Does not send the form to the server by clicking the button
    event.preventDefault();
    
    var firstName = document.getElementsByName('first-name')[0].value;
    var lastName = document.getElementsByName('last-name')[0].value;
    var fn = document.getElementsByName('fn')[0].value;
    var mark = document.getElementsByName('mark')[0].value;

    var tbody = document.getElementsByTagName('tbody')[0];
    var tr = document.createElement('tr');
    tr.setAttribute('class', 'student');
    var firstNameTd = document.createElement('td');
    firstNameTd.innerHTML += firstName;
    var lastNameTd = document.createElement('td');
    lastNameTd.innerHTML += lastName;
    var fnTd = document.createElement('td');
    fnTd.innerHTML += fn;
    var markTd = document.createElement('td');
    markTd.innerHTML += mark;
    tr.append(firstNameTd, lastNameTd, fnTd, markTd);
    tbody.appendChild(tr);
}

// Delete the row of the selected student from the table
function deleteStudent(event) {
    // Get the row of the selected student
    var studentToRemove = event.target.parentNode.parentNode;
    // Delete the row
    studentToRemove.parentNode.removeChild(studentToRemove);
}