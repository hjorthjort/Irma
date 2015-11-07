var express = require('express');
var router = express.Router();

var watson = require('../modules/watson');

router.get('/speech-to-text', function(req, res, next) {
    watson.speech_to_text(__dirname + '/../resources/file2.wav', function (err, transcript) {
        if (err) {
            return console.log(err)
        }

        res.json(transcript);
    });
});

router.get('/concept-insights/:text', function(req, res, next) {
    var text = req.params.text;

    watson.concept_insights(text, function (err, result) {
        if (err) {
            return console.log(err)
        }

        res.json(result);
    });
});

module.exports = router;
