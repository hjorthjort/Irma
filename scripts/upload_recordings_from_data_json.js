var fs = require('fs');
var request = require('request');

fs.readFile('data.json', function (err, data) {
    if (err) {
        return console.log(err);
    }

    var data = JSON.parse(data);
    var calls = data.data;

    calls.forEach(function (call) {
        var id = call.id;
        var recording = id + '-r0.wav';

        request.post('http://localhost:6002/recordings', {
            form: {
                from: call.from,
                created: call.created,
                wav: 'https://api.46elks.com/a1/Recordings/' + recording
            }
        });
    });
});