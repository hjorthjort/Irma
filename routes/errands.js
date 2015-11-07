var Cloudant = require('cloudant');
var express = require('express');
var router = express.Router();

var errands = require('../modules/errands');

router.post('/', function(req, res, next) {
    var recording = req.body.recording;
    var description = req.body.description;
    var tags = req.body.tags;
    var phone_number = req.body.phone_number;
    var timestamp = req.body.timestamp;

    var params = {
        recording: recording,
        description: description,
        tags: tags,
        phone_number: phone_number,
        timestamp: timestamp
    };

    errands.add(params, function (err, result) {
        if (err) {
            return console.log(err);
        }

        res.json(result);
    });
});

module.exports = router;
