var exports = {};

var dbCredentials = {
    url: "https://490f0a5c-5c8d-435c-a709-5a661c8356f6-bluemix:aa85309d3a2d7b79526b89a1ad37b8f2d32a37d0205fcd0e19c091915993707b@490f0a5c-5c8d-435c-a709-5a661c8356f6-bluemix.cloudant.com"
};

var cloudant = require('cloudant')(dbCredentials.url);

exports.add = function (params, callback) {
    var errands = cloudant.db.use('errands');

    errands.insert(params, function (err, body) {
        if (err) {
            return callback(err);
        }

        callback(null, body);
    });
};

module.exports = exports;
