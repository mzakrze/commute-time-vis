var http = require("http"),
    port = process.argv[2] || 8080;

var handlers = require('./handlers')

http.createServer(function(request, response) {

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