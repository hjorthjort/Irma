var vcap = require('./vcap');

var cloudant;

var dbCredentials = {
    dbName: 'errands'
};

function initDbConnection() {
    var vcapServices;
    if (process.env.VCAP_SERVICES) {
        vcapServices = JSON.parse(process.env.VCAP_SERVICES);
    } else {
        vcapServices = vcap.VCAP_SERVICES;
    }
    var credentials = vcapServices.cloudantNoSQLDB[0].credentials;

    dbCredentials.host = credentials.host;
    dbCredentials.port = credentials.port;
    dbCredentials.user = credentials.username;
    dbCredentials.password = credentials.password;
    dbCredentials.url = credentials.url;

    cloudant = require('cloudant')(dbCredentials.url);

    console.log(cloudant);
}

initDbConnection();
