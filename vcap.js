var fs = require('fs');

var VCAP_SERVICES = JSON.parse(fs.readFileSync('./vcap_services.json', {
    encoding: 'utf8'
}));
var VCAP_APPLICATION = JSON.parse(fs.readFileSync('./vcap_application.json', {
    encoding: 'utf8'
}));
