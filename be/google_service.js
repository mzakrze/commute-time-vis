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

    var findRoutes = function() {

        var options = {
            hostname: 'maps.googleapis.com',
            path: '/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyAc3CsjQyaKgi07sSpzBM6oyZWhUkX_p78',
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
                    res = data
                    resolve(data);
                });
            });
    
            req.on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
            });
    
            req.end();
        })
    }

    module.exports.getGoogleApiAdapter = function() {
        return {
            findRoutes: findRoutes
        };
    }

})();