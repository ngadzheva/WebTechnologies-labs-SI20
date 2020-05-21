// We create a lib using hashes
const config = {
  host: 'localhost',
  port: 8080,
  connect: function() { console.log('Connecting...'); }
};

console.log(config.host); // localhost
config.connect(); // Connecting...

// We create a lib using immediately invoked function expression as well
// All functions, objects and variables in this lib are behaving
// as they are in private scope
const basketModule = (function () {
  let basket = [];

  // We return an object with everything we want to access outside
  // the immediately invoked function expression scope
  return {
      addItem: function (item) { basket.push(item); },
      getItemCount: function() { return basket.length; },
      getItems: function() { return basket; }
  };
})();

// We don't have direct access to the method getItemCount()
// getItemCount(); // Error

// We can call the method addItem() as it is a property of lib
basketModule.addItem('sads');
