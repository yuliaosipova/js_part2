const http = require('http');
const static = require('node-static');

const file = new static.Server('.');

http.createServer((req, res) => {
  file.serve(req, res);
  console.log('server started');
}).listen(3000);