var express = require('express');
var router = express.Router();

var request = require('request');
var fs = require('fs');

var errands = require('../modules/errands');
var watson = require('../modules/watson');

var username = 'u1ca6e5211881ab295783eb6e96ed3e0f';
var password = '69FD184896F143C0F95F5B76FE347DDE';

Array.prototype.last = function(){
    return this[this.length - 1];
};

router.post('/', function(req, res, next) {
    // get post parameters
    var from = req.body.from;
    var created = req.body.created;
    var recordingUrl = req.body.wav;

    // build path to save recording to
    var filename = recordingUrl.split('/').last();
    var pathToFile = __dirname + '/../resources/recordings/' + filename;

    // get recording from server and write it to our file system
    var stream = request.get(recordingUrl).auth(username, password, false).pipe(fs.createWriteStream(pathToFile));

    stream.on('finish', function () {
        // transform the audio to text using Watson
        watson.speech_to_text(pathToFile, function (err, transcript) {
            if (err) {
                return res.status(500).json(err);
            }

            // analyze text with Watson to get relevant key words
            watson.concept_insights(transcript, function (err, concepts) {
                if (err) {
                    return res.status(500).json(err);
                }

                // finally, save the errand with all the data
                errands.add({
                    recording: filename,
                    description: transcript,
                    tags: concepts,
                    phone_number: from,
                    timestamp: created
                }, function (err, result) {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.json(result);
                });
            });
        });
    });
});

module.exports = router;
