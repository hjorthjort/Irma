var exports = {};

var db = require('./db');
var customers = db.use('customers');

exports.add = function (params, callback) {
    customers.insert(params, function (err, body) {
        if (err) {
            return callback(err);
        }

        callback(null, body);
    });
};

exports.getByPhoneNumber = function(phnNumber, callback) {
	exports.getAll(function(err, result) {
		if(err) {
			callback(err);
		}
		
		var user = result.rows.reduce(function (list, row) {
			if(row.doc.phone_number == phnNumber) {
				list.push(row.doc);
			}
			return list;
		}, []);
		
		callback(null, user);
	});
};

exports.getAll = function (callback) {
    customers.list({include_docs: true}, function (err, result) {
        if (err) {
            callback(err);
        }

        callback(null, result);
    });
};

module.exports = exports;
