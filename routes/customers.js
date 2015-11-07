var express = require('express');
var router = express.Router();

var customers = require('../modules/customers');

router.get('/', function(req, res, next) {
    customers.getAll(function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.post('/', function(req, res, next) {
    var fb_access_token = req.body.fb_access_token;
    var phone_number = req.body.phone_number;

    var params = {
        fb_access_token: fb_access_token,
        phone_number: phone_number
    };

    customers.add(params, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;
