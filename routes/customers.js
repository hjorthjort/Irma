var express = require('express');
var router = express.Router();

var customers = require('../modules/customers');
var bcrypt = require('bcrypt');
var validator = require('validator');

/**
 * TODO: Implement actual validation against Klarna
 * @param token
 * @returns {boolean}
 */
function validateKlarnaToken(token){
    return true;
}

router.get('/', function(req, res, next) {
    customers.getAll(function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});


router.post('/', function(req, res, next) {
    var name = req.body.customer_name;
    var age = req.body.customer_age;
    var phone_number = req.body.customer_phone_number;
    var email = req.body.customer_email;
    var klarna_token = req.body.customer_klarna_token;
    var salt = bcrypt.genSaltSync();
    var password = bcrypt.hashSync(req.body.customer_password, salt);

    //TODO: Improve validation
    if(
        !validator.isEmail(email) ||
        !validator.isLength(name, 1) ||
        !validator.isInt(age) ||
        !validator.isMobilePhone(phone_number) ||
        !validateKlarnaToken(klarna_token)
    ){
        return res.status(500).json({
            'error': 'Invalid input',
            'email': validator.isEmail(email),
            'name': validator.isLength(name, 1),
            'age': validator.isInt(age),
            'phone': validator.isMobilePhone(phone_number),
            'klarna_token': validateKlarnaToken(klarna_token)
        });
    }

    var params = {
        name: name,
        email: email,
        age: age,
        klarna_token: klarna_token,
        phone_number: phone_number,
        salt: salt,
        password: password
    };

    customers.add(params, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;
