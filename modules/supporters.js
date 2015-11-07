var exports = {};

var cloudant = require('./cloudant').connect(function (err, cloudant) {
    if (err) {
        return console.log(err);
    }
});
var supporters = cloudant.db.use('supporters');

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
