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

function createFolderIfDoesNotExist(folder) {
    try {
        fs.accessSync(folder, fs.F_OK);
    } catch (err) {
        fs.mkdirSync(folder);
    }
}

function cleanup(pathToRecording) {
    // remove sound file from system
    fs.unlink(pathToRecording, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

router.post('/', function(req, res, next) {
    console.log('body', req.body);

    // get post parameters
    var from = req.body.from;
    var created = req.body.created;
    var recordingUrl = req.body.wav;

    // build path to save recording to
    var filename = recordingUrl.split('/').last();
    var tmpFolder = __dirname + '/../tmp/';
    var pathToRecording = tmpFolder + filename;

    createFolderIfDoesNotExist(tmpFolder);

    // get recording from server and write it to our file system
    request.get(recordingUrl).auth(username, password, false)
            .pipe(fs.createWriteStream(pathToRecording))
            .on('finish', function () {

        // transform the audio to text using Watson
        watson.speech_to_text(pathToRecording, function (err, transcript) {
            if (err) {
                cleanup(pathToRecording);
                console.log(err);
                return res.status(500).json(err);
            }

            // analyze text with Watson to get relevant key words
            watson.concept_insights(transcript, function (err, concepts) {
                if (err) {
                    cleanup(pathToRecording);
                    console.log(err);
                    return res.status(500).json(err);
                }

                // finally, save the errand with all the data
                errands.add(pathToRecording, transcript, concepts, from, created, function (err, result) {
                    cleanup(pathToRecording);

                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }

                    res.json(result);
                });
            });
        });
    });
});

module.exports = router;
