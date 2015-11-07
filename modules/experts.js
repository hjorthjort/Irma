var exports = {};

var db = require('./db');
var experts = db.use('experts');

exports.add = function (params, callback) {
    experts.insert(params, function (err, body) {
        if (err) {
            return callback(err);
        }

        callback(null, body);
    });
};

exports.getAll = function (callback) {
    experts.list({include_docs: true}, function (err, result) {
        if (err) {
            callback(err);
        }

        callback(null, result);
    });
};

module.exports = exports;
