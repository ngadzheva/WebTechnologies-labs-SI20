(function () {
  var submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', sendForm);
})();

function sendForm(event) {
  event.preventDefault();

  var firstName = document.getElementById('first-name').value;
  var lastName = document.getElementById('last-name').value;
  var fn = document.getElementById('fn').value;
  var mark = document.getElementById('mark').value;

  var data = {
    firstName,
    lastName,
    fn,
    mark
  };

  sendRequest('validate.php', 'POST', `data=${JSON.stringify(data)}`);
}

function sendRequest(url, method, data) {
  var request = new XMLHttpRequest();

  request.addEventListener('load', function () {
    var response = JSON.parse(request.responseText);

    if (request.status === 200) {
      addStudentMark(response);
    } else {
      handleErrors(response);
    }
  });

  request.open(method, url, true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(data);
}

function handleErrors(errors) {
  var errorsLabel = document.getElementById('errors');
  errorsLabel.innerHTML = '';
  errorsLabel.style.display = 'block';
  errorsLabel.style.color = 'red';

  errors.forEach(function (error) {
    errorsLabel.innerHTML += error;
  });
}

function addStudentMark(studentData) {
  var studentsTable = document.getElementById('marks');
  var tr = document.createElement('tr');

  Object.values(studentData).forEach(function (data) {
    var td = document.createElement('td');
    td.innerHTML = data;
    tr.appendChild(td);
  });

  studentsTable.appendChild(tr);
}
