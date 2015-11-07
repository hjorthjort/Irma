var exports = {};

var fs = require('fs');

var db = require('./db');
var errands = db.use('errands');

exports.add = function (pathToRecording, description, tags, phone_number, timestamp, callback) {
    errands.insert({
        description: description,
        tags: tags,
        phone_number: phone_number,
        timestamp: timestamp
    }, function (err, body) {
        if (err) {
            return callback(err);
        }

        fs.createReadStream(pathToRecording).pipe(
            errands.attachment.insert(body.id, 'recording', null, 'audio/wav')
        );

        callback(null, body);
    });
};

exports.getAll = function (callback) {
    errands.list({include_docs: true}, function (err, result) {
        if (err) {
            callback(err);
        }

        callback(null, result);
    });
};

module.exports = exports;
