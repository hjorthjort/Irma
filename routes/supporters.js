var express = require('express');
var router = express.Router();

var experts = require('../modules/experts');

router.get('/', function(req, res, next) {
    experts.getAll(function (err, result) {
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

    experts.add(params, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;
