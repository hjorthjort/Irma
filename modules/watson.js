var exports = {};

var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
    username: 'e6f6d1ba-04e9-475c-ae97-bda8828e4250',
    password: 'BjmdwtwRBPPm',
    version: 'v1'
});

exports.speech_to_text = function (file, callback) {
    var params = {
        audio: fs.createReadStream(file),
        content_type: 'audio/wav',
        inactivity_timeout: -1
    };

    speech_to_text.recognize(params, function(err, transcript) {
        if (err) {
            return callback(err);
        }

        callback(null, transcript);
    });
};

module.exports = exports;