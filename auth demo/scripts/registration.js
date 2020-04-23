(function() {
  /**
   * Get the register button
   */
  var register = document.getElementById('register');

  /**
   * Listen for click event on the register button
   */
  register.addEventListener('click', sendForm);
})();

/**
* Handle the click event by sending an asynchronous request to the server
* @param {*} event
*/
function sendForm(event) {
  /**
   * Prevent the default behavior of the clicking the form submit button
   */
  event.preventDefault();

  /**
   * Get the values of the input fields
   */
  var userName = document.getElementById('user-name').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;
  var email = document.getElementById('email').value;

  /**
   * Create an object with the user's data
   */
  var user = {
      userName: userName,
      password: password,
      confirmPassword: confirmPassword,
      email: email
  };

  /**
   * Send POST request with user's data to api.php/registration
   */
  ajax('src/api.php/registration', {method: 'POST', data: `data=${JSON.stringify(user)}`});
}

/**
* Handle the post request
* @param {*} url
* @param {*} settings
*/
function ajax(url, settings) {
  var request = new XMLHttpRequest();

  request.onload = function() {
      if(request.status === 200) {
          /**
           * Parse the received response from the server to an object
           * and call method load(), which handles the received response
           */
          load(JSON.parse(request.responseText));
      } else {
          console.log(request.responseText);
      }
  }

  /**
   * Open the connection to the server
   */
  request.open(settings.method, url, true);
  /**
   * Set Content-type header for sending form data
   */
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  /**
   * Send the data
   */
  request.send(settings.data);
}

/**
* Handle the received response from the server
* If there were no errors found on validation, the login.html is loaded.
* Else the errors are displayed to the user.
* @param {*} response
*/
function load(response) {
  if(response.success) {
      window.location = 'login.html';
  } else {
      var errors = document.getElementById('errors');
      errors.innerHTML = response.data;
  }
}
