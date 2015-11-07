var express = require('express');
var bcrypt = require('bcrypt');
var validator = require('validator');
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
    var name = req.body.expert_name;
    var email = req.body.expert_email;
    var salt = bcrypt.genSaltSync();
    var password = bcrypt.hashSync(req.body.expert_password, salt);

    if(!validator.isEmail(email) || !validator.isLength(name, 1)){
        return res.status(500).json({
            'error' : 'Invalid input',
            'email': validator.isEmail(email),
            'name': validator.isLength(name, 1)
        });
    }

    var params = {
        name: name,
        email: email,
        password: password,
        salt: salt
    };

    experts.add(params, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;
