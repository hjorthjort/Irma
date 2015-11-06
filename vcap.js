var fs = require('fs');

var VCAP_SERVICES = JSON.parse(fs.readFileSync('./vcap_services.json', {
    encoding: 'utf8'
})).VCAP_SERVICES;
var VCAP_APPLICATION = JSON.parse(fs.readFileSync('./vcap_application.json', {
    encoding: 'utf8'
})).VCAP_APPLICATION;

exports.VCAP_SERVICES = VCAP_SERVICES;
exports.VCAP_APPLICATION = VCAP_APPLICATION;
