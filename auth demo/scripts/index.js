(function(){
    /**
     * Send GET request to api.php/dashboard to get user's data
     */
    ajax('src/api.php/dashboard', {method: 'GET'});

    /**
     * Get the logout button
     */
    var logoutBtn = document.getElementById('logout');
    /**
     * Listen for click event on the logout button
     */
    logoutBtn.addEventListener('click', logout);
})();

/**
 * Handle the get request
 * @param {*} url
 * @param {*} settings
 */
function ajax(url, settings, isLogout) {
    var request = new XMLHttpRequest();

    request.onload = function() {
        if(request.status === 200) {
            /**
             * If the request was for logging out we load index.html
             * Else we handle the received response from the server
             */
            if(isLogout){
                window.location = 'index.html';
            } else {
                load(JSON.parse(request.responseText));
            }
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
 * If there were no errors, the user's info is displayed.
 * Else the errors are printed to the console and we are redirected to login page.
 * @param {*} response
 */
function load(response) {
    var userInfo = document.getElementById('user');

    if(response.success) {
        userInfo.innerHTML = `User: ${response.data}`;
    } else {
        console.log(response.data);
        window.location = 'login.html';
    }
}

/**
 * Handle the click event by sending an asynchronous request to the server
 * @param {*} event
 */
function logout(event) {
    /**
     * Prevent the default behavior of the clicking the form submit button
     */
    event.preventDefault();

    /**
     * Send GET request to api.php/logout to logout the user
     */
    ajax('src/api.php/logout', {method: 'GET'}, true);

    /**
     * Redirect to home page
     */
    window.location = 'index.html';
}
