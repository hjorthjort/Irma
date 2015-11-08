var exports = {};

var fs = require('fs');
var customers = require('./customers');

var db = require('./db');
var errands = db.use('errands');

exports.add = function (pathToRecording, description, tags, phone_number, timestamp, callback) {
	customers.getByPhoneNumber(phone_number, function(err, result) {
		if(err) {
			return callback(err);
		}
		
		name = '';
		age = '';
		if(result.length > 0) {
			name = result[0].name;
			age = result[0].age;
		} else {
			console.log('No user with phone number '+phone_number);
			return callback('No user with phone number '+phone_number);
		}
		
		errands.insert({
			description: description,
			tags: tags,
			phone_number: phone_number,
			timestamp: timestamp,
			user_name: name,
			user_age: age,
			completed: false
		}, function (err, body) {
			if (err) {
				return callback(err);
			}

			fs.createReadStream(pathToRecording).pipe(
				errands.attachment.insert(body.id, 'recording.wav', null, 'audio/wav', { rev: body.rev })
			).on('end', function () {
				callback(null, body);
			});
		});
	});
};

exports.get = function (id, callback) {
    errands.get(id, function (err, body) {
        if (err) {
            return callback(err);
        }

        callback(null, body);
    });
};

exports.getAll = function (callback) {
    errands.list({include_docs: true}, function (err, result) {
        if (err) {
            return callback(err);
        }

        var filteredResult = result.rows.filter(function (errand) {
            if (errand.doc.completed === true) {
                return false;
            } else {
                return true;
            }
        });

        console.log(filteredResult);

        callback(null, filteredResult);
    });
};

exports.complete = function (id, callback) {
    errands.get(id, function (err, body) {
        if (err) {
            return callback(err);
        }

        body.completed = true;

        errands.insert(body, function (err, body) {
            if (err) {
                return callback(err);
            }

            callback(null, body);
        });
    });
};

exports.getRecording = function(id){
    return errands.attachment.get(id, 'recording.wav');
};

module.exports = exports;
