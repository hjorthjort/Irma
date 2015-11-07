var exports = {};

var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
    username: 'e6f6d1ba-04e9-475c-ae97-bda8828e4250',
    password: 'BjmdwtwRBPPm',
    version: 'v1'
});

var concept_insights = watson.concept_insights({
    username: '7d143c29-a8af-4b24-989e-592a44a34067',
    password: 'FdbFkUZRQfRE',
    version: 'v2'
});

exports.speech_to_text = function (filename, callback) {
    var params = {
        audio: fs.createReadStream(filename),
        content_type: 'audio/wav',
        inactivity_timeout: -1
    };

    speech_to_text.recognize(params, function(err, result) {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
};

exports.concept_insights = function (text, callback) {
    var params = {
        graph: '/graphs/wikipedia/en-latest',
        text: text
    };

    concept_insights.graphs.annotateText(params, function(err, result) {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
};

module.exports = exports;