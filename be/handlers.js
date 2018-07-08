/*
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
(all spaces in the "" line should be ignored — they are purely for formatting)
*/

(function() {
    var URL = require("url");

    var GoogleService = require('./google_service');

    var googleApi = GoogleService.getGoogleApiAdapter();

    /*
    konwencja pseudo frameworka:
    - dispatcher zwraca handlera - funkcję(req, resp), która obsłuży żądanie - albo null 
    */
    var dispatchers = [];

    var handleNameToCoordsRequest = function(request, response){
        var url = URL.parse(request.url);

        var requestOk = true;
        // TODO sprawdx żadanie -> parsuj url, request body itp

        if(requestOk == false){
            return null;
        }

        return function(){
            var routes = googleApi.findRoutes()
            .then(function(data){
                console.log('routes resolved')
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(data);
                response.end();
            })
            .catch(function(err){
                console.log('routes rejected')
                response.writeHead(500, {"Content-Type": "application/json"});
                response.write(JSON.stringify({msg: "sory Dolores"}));
                response.end();
            });;
        }

        
    }

    var handleDoFindRoute = function(request, response){

        
    }

    module.exports.getDispatchers = function() {
        return [handleDoFindRoute, handleNameToCoordsRequest];
    }
})();
