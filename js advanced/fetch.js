(function() {
  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET'
  })
  .then(data => data.json())
  .then(result => {
    document.getElementById('users').innerHTML = JSON.stringify(result);
  })
  .catch(error => console.error(error));
})();
