/*
- opis api
    https://developers.google.com/maps/documentation/directions/start

- konsola wykorzystania darmowego konta:
    https://console.cloud.google.com/google/maps-apis/overview?onboard=true&project=commute-time-1531037670160&consoleUI=CLOUD&folder&organizationId
    
- to nie wiem co    
    https://github.com/googlemaps/google-maps-services-js
*/

(function() {
    // https://nodejs.org/api/https.html
    const https = require('https');
    var querystring = require("querystring");

    var findRoutes = function(userName, origin, destination) {

        var path = '/maps/api/directions/json' 
            + '?origin=' + querystring.escape(origin) + "+Warszawa"
            + '&destination=' + querystring.escape(destination) 
            + '&departure_time=1531042237'
            + '&mode=transit'
            + '&key=AIzaSyAc3CsjQyaKgi07sSpzBM6oyZWhUkX_p78';

        var options = {
            hostname: 'maps.googleapis.com',
            path: path,
            method: 'GET',
            async: false,
        }

        return new Promise(function(resolve, reject){
            const req = https.request(options, (resp) => {
                var data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                
                resp.on('end', () => {
                    var result = {
                        userName: userName,
                        destination: destination,
                        result: data
                    }
                    resolve(result);
                });
            });
    
            req.on("error", (err) => {
                console.error("Error: " + err.message);
                reject(err);
            });
    
            req.end();
        });
    }

    module.exports.getGoogleApiAdapter = function() {
        return {
            findRoutes: findRoutes
        };
    }

})();