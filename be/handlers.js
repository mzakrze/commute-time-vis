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


    var dispatchers = [];

    var handleDoFindRoute = function(request, response){
        var url = URL.parse(request.url);
        
        var requestBody = '';
        request.on('data', function (data) {
            requestBody += data;
        });
        request.on('end', function () {
            requestBody = JSON.parse(requestBody);
            
            if(!requestBody.location || !requestBody.users){
                return null;
            }

            var userNames = Object.keys(requestBody.users);

            var result = {};
            var promises = [];
            var promisesToBeDone = 0;
            var isSuccess = true;
            var responseBody = {};

            function allPromisesDoneCallback(){
                if(isSuccess){
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.write(JSON.stringify(responseBody));
                    response.end();
                } else {
                    response.writeHead(500, {"Content-Type": "application/json"});
                    response.write(JSON.stringify({msg: 'Sorry, unexpected error'}));
                    response.end();
                }
            }

            // TODO - przepisać to jakoś sensownie
            for(var i = 0; i < userNames.length; i++){
                var userName = userNames[i]
                var usersDesitinations = requestBody.users[userName];
                
                for(var j = 0; j < usersDesitinations.length; j++){
                    var origin = requestBody.location;
                    var destination = usersDesitinations[j]; 

                    ++promisesToBeDone;
                    googleApi.findRoutes(userName, origin, destination)
                        .then(function(data) {
                            var userName = data.userName;
                            var destination = data.destination;
                            var result = data.result;
                            --promisesToBeDone;
                            if(!responseBody[userName]){
                                responseBody[userName] = {}
                            }
                            responseBody[userName][destination] = data;
                            
                            if(promisesToBeDone == 0){
                                allPromisesDoneCallback()
                            };                                
                        })
                        .catch(function(err){
                            console.error(err)
                            isSuccess = false;
                            --promisesToBeDone;
                            if(promisesToBeDone == 0){
                                allPromisesDoneCallback()
                            };
                        })
                }
            }
        });
    }

    module.exports.getDispatchers = function() {
        return [handleDoFindRoute];
    }
})();
