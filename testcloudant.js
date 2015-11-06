var fs = require('fs');

var VCAP_SERVICES = fs.readFileSync('./vcap_services.json', {
    encoding: 'utf8'
});
var VCAP_APPLICATION = fs.readFileSync('./vcap_application.json', {
    encoding: 'utf8'
});
console.log(VCAP_SERVICES);
console.log(VCAP_APPLICATION);
