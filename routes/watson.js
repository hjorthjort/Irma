var express = require('express');
var router = express.Router();

var watson = require('../modules/watson');

router.get('/', function(req, res, next) {
    watson.speech_to_text(__dirname + '/../resources/file.wav', function (err, transcript) {
        if (err) {
            return console.log(err)
        }

        res.json(transcript);
    });
});

module.exports = router;
