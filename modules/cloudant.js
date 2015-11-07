var exports = {};

var Cloudant = require('cloudant');

var DB_URL = "https://490f0a5c-5c8d-435c-a709-5a661c8356f6-bluemix:aa85309d3a2d7b79526b89a1ad37b8f2d32a37d0205fcd0e19c091915993707b@490f0a5c-5c8d-435c-a709-5a661c8356f6-bluemix.cloudant.com";

exports.connect = function (callback) {
    return Cloudant(DB_URL, function (err, cloudant) {
        if (err) {
            return callback(err);
        }

        callback(null, cloudant);
    });
};

module.exports = exports;
