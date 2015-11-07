var express = require('express');
var router = express.Router();

var errands = require('../modules/errands');

router.get('/', function(req, res, next) {
    errands.getAll(function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.get('/:id/recording.wav', function(req, res, next) {
    errands.getRecording(req.params.id).pipe(res);
});

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
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    errands.get(id, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        var rev = result._rev;
        errands.destroy(id, rev, function (err, result) {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        });
    });
});

module.exports = router;
