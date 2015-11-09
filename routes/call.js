var express = require('express');
var router = express.Router();

var request = require('request');

var errands = require('../modules/errands');

var username = 'u1ca6e5211881ab295783eb6e96ed3e0f';
var password = '69FD184896F143C0F95F5B76FE347DDE';

router.post('/:number', function(req, res, next) {
    var phoneNumber = req.params.number;

    var param = {
        form: {
            "from": "+46766861042",
            "to": "+46763162240",
            "voice_start": '{ "connect": "' + phoneNumber + '" }'
        }
    };

    console.log('call', param);

    //request.post('https://api.46elks.com/a1/Calls', param, function (err, httpResponse, body) {
    //    if (err) {
    //        console.log(err);
    //    }
    //}).auth(username, password, false);

    res.json({});
});

module.exports = router;
