var exports = {};

var request = require('request');

exports.get_tags = function (text, callback) {
	var alchemyParams = {
		apikey : '7dfaf16626efdf41ac6ca7d8ac426bd2bf680eca',
		text : encodeURI(text),
		outputMode : 'json'
	};
	
	var url = 'http://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords';
	var alchemyUrl = url+"?"+toGetParams(alchemyParams);
	
	request(alchemyUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
		
			if(data.status == 'OK') {
				tags = data.keywords.map(function(obj){ 
					return obj.text;
				});
				callback(null, tags);
			} else {
				callback('ERROR: '+data.statusInfo);
			}
		} else {
			callback(error);
		}
	});
}

function toGetParams(params, encodeValue) {
    encodeValue = typeof encodeValue !== 'undefined' ? encodeValue : false;
	
	return Object.keys(params).reduce(function (previous, key) {
		var paramValue = encodeValue ? enocdeURI(params[key]) : params[key];
		previous.push(key+"="+paramValue);
		return previous;
	}, []).join('&');
}

module.exports = exports;