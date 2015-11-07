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
    var name = req.body.name;
    var age = req.body.age;
    var phone_number = req.body.phone_number;

    var params = {
        name: name,
        age: age,
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
