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
        inactivity_timeout: -1,
        continuous: true,
        model: 'en-US_NarrowbandModel'
    };

    speech_to_text.recognize(params, function(err, result) {
        if (err) {
            return callback(err);
        }

        var results = result.results;
        var transcript = results.map(function (result) {
            return result.alternatives[0].transcript;
        }).join("").trim();

        transcript = transcript.replace('%HESITATION ', '');

        callback(null, transcript);
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

        var annotations = result.annotations;
        var concepts = annotations.map(function (annotation) {
            return annotation.concept.label;
        });

        callback(null, concepts);
    });
};

module.exports = exports;