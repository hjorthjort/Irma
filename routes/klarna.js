var express = require('express');
var router = express.Router();

router.post('/customer', function (req, res, next) {
    res.json({
        data: {
            user_token: req.body.userToken
        }
    });
});

module.exports = router;
