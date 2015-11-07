var express = require('express');
var router = express.Router();

var alchemy = require('../modules/alchemy');

router.get('/', function(req, res, next) {
	var text = 'I need help to identify and fix problems with wired (Ethernet) and wireless (Wi-Fi) network connections in Windows. I also need help to cover network connection problems related to specific programs.';
	alchemy.get_tags(text, function(err, result) {
		if(err) {
			return res.status(500).json(err);
		}
		
		res.status(200).json(result);
	});
});

module.exports = router;
