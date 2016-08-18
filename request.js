var http = require('http');
module.exports = function redditInfo(options, callback){

  var options = options;
  var body = '';

   http.request(options, (res) => {

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      try {
        const data = JSON.parse(body);
        callback(data);
      } catch (er) {
        res.statusCode = 400;
      }
    });
  }).end();
}
