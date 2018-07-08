var http = require("http"),
    port = process.argv[2] || 8080;

const url = require('url');
const fs = require('fs');
const path = require('path');

var handlers = require('./handlers')

http.createServer(function(request, response) {
  let pathname = path.join(__dirname, '/src/fe/bundle.js');
  // maps file extention to MIME types
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }
    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }
    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });

  var handled = false;
  var dispatchers = handlers.getDispatchers();
  for(var i = 0; i < dispatchers.length; i++){
    var dispatcher = dispatchers[i];
    handled = dispatcher.apply(null, [request, response]);
    if(handled){
        break;
    }
  }

  if(handled == false){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found\n");
    response.end();
  }
}).listen(parseInt(port, 10));

console.log("Http server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");