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
    var name = req.body.name;
    var phone_number = req.body.phone_number;

    var params = {
        name: name,
        phone_number: phone_number
    };

    experts.add(params, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;
