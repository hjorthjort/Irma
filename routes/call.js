var express = require('express');
var router = express.Router();

var request = require('request');

var errands = require('../modules/errands');

var username = 'u1ca6e5211881ab295783eb6e96ed3e0f';
var password = '69FD184896F143C0F95F5B76FE347DDE';

router.post('/:id/:number', function(req, res, next) {
    var id = req.params.id;
    var phoneNumber = req.params.number;

    errands.setCalled(id, function (err, result) {
        if (err) {
            return console.log(err);
        }
    });

    var param = {
        form: {
            "from": "+46766861042",
            "to": "+46763162240",
            "voice_start": '{ "connect": "' + phoneNumber + '" }'
        }
    };

    //request.post('https://api.46elks.com/a1/Calls', param, function (err, httpResponse, body) {
    //    if (err) {
    //        console.log(err);
    //    }
    //}).auth(username, password, false);

    res.json({});
});

module.exports = router;
