var http = require('http');
module.exports = function redditInfo(options, callback){

  // var getData = querystring.stringify({
  //   'msg' : 'Hello World!'
  // });
  var options = options;
  // {
  //   hostname: 'www.reddit.com',
  //   host: 'www.reddit.com',
  //   port: 80,
  //   path: '/.json',
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     // 'Content-Length': Buffer.byteLength(getData)
  //   }
  // };
  console.log(options);
  var body = '';

   http.request(options, (res) => {

    // console.log(`STATUS: ${res.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      body += chunk;
      callback(body);
      // console.log("body: " + body);
      // console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      try {
        // console.log(JSON.parse(body).data.children[0]);
        const data = JSON.parse(body);
        // return body;
      } catch (er) {
        res.statusCode = 400;
        // return res.end('error: ${er.message}')
      }
      // res.write(data);
      // console.log(JSON.parse(body).data.children[0]);
      // console.log('No more data in response.');

    });
    console.log("my sexy body: " + body)
    // return body;
  }).end();
  //
  // req.on('error', (e) => {
  //
  //   console.log(`problem with request: ${e.message}`);
  // });
  //
  // // write data to request body
  // // console.log(getData)
  // // req.write(getData);
  // // return JSON.parse(body);
  // req.end(() => {
  //
  // });
  // console.log("req" + req);

}
