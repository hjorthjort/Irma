var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log('body', req.body);
    console.log('params', req.params);

    res.json({});
});

module.exports = router;
