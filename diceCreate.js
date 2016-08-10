var qs = require('querystring');

module.exports = function diceCreate(path) {
  var query = qs.stringify(path);
  console.log("query: " + query);
  return {
    hostname: 'service.dice.com',
    host: 'service.dice.com',
    port: 80,
    path: '/api/rest/jobsearch/v1/simple.json?' + query,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Length': Buffer.byteLength(getData)
    }
  };
}
