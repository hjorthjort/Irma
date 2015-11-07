var express = require('express');
var router = express.Router();

var supporters = require('../modules/supporters');

router.get('/', function(req, res, next) {
    supporters.getAll(function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.post('/', function(req, res, next) {
    var fb_access_token = req.body.fb_access_token;

    var params = {
        fb_access_token: fb_access_token
    };

    supporters.add(params, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;
