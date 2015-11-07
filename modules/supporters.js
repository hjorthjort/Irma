var exports = {};

var db = require('./db');
var supporters = db.use('supporters');

exports.add = function (params, callback) {
    supporters.insert(params, function (err, body) {
        if (err) {
            return callback(err);
        }

        callback(null, body);
    });
};

exports.getAll = function (callback) {
    supporters.list({include_docs: true}, function (err, result) {
        if (err) {
            callback(err);
        }

        callback(null, result);
    });
};

module.exports = exports;
